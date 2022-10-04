/* { "osc": 4000 } */

precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D osc_pos1;
uniform sampler2D osc_pos2;
uniform sampler2D osc_chaos;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

vec2 pos1() {
  return vec2(texture2D(osc_pos1, vec2(0.)).x/2., texture2D(osc_pos1, vec2(1.)).x/2.);
}

vec2 pos2() {
  return vec2(texture2D(osc_pos2, vec2(0.)).x/2., texture2D(osc_pos2, vec2(1.)).x/2.);
}

float chaos() {
  return max(0., texture2D(osc_chaos, vec2(1.)).x);
}

float sphere(vec3 p) {
  return length(p) - 0.3;
}

float sdBox( vec3 p, vec3 b ) {
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

// from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h); }


vec3 opTwist(vec3 p)
{
    float k = sin(time)/6.; // or some other amount
    float c = cos(k*p.y);
    float s = sin(k*p.y);
    mat2  m = mat2(c,-s,s,c);
    vec3  q = vec3(m*p.xz,p.y);
    return q;
}

float scene(vec3 p) {
  float posx = sin(time)+cos(time)*cos(time);
  float posx2 = cos(time)+cos(time)*cos(time);

  vec2 pos1 = pos1();
  vec2 pos2 = pos2();

  float chaos = chaos();
  float s = chaos*sin(time)+0.3; // 0.35;
  vec3 p1 = vec3(pos1.x+posx*.1, pos1.y, s);
  vec3 p2 = vec3(pos2.x+posx2*.1, pos2.y, s);

  if (chaos > 0.6) {
    for (int i=0; i<3; i++) {
      // p.x *= 1.5;
      // p.y *= 1.2;
      p = opTwist(p);
    }

    p1 = opTwist(p1);
    p2 = opTwist(p2);
  }

  vec3 c = vec3(4.+abs(p.x)*.5, 6.+p.y*4., 20.);
  vec3 p22 = mod(p+0.5*c-mod(p.y, 0.5)/2.,c)-0.5*c;
  p22 = p*(1.-chaos)+p22*chaos;

  float f = (sin(p.x*sin(time))+1.);
  vec3 q = opTwist(p22);
  float d1 = opSmoothUnion(
    sphere(q+p1),
    sdBox(p+p2, vec3(s)),
    1.0) * (1. - chaos + f*chaos);

  float d2 = p.y*.2;

  return d1 + d2;

  // return min(d1, d2);
}

float shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
  float depth = start;
  for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    float dist = scene(eye + depth * marchingDirection);
    if (dist < EPSILON) {
	    return depth;
    }
    depth += dist;
    if (depth >= end) {
      return end;
    }
  }
  return end;
}

vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
  vec2 xy = fragCoord - size / 2.0;
  float z = size.y / tan(radians(fieldOfView) / 2.0);
  return normalize(vec3(xy, -z));
}


// from https://www.shadertoy.com/view/lt33z7

vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        scene(vec3(p.x + EPSILON, p.y, p.z)) - scene(vec3(p.x - EPSILON, p.y, p.z)),
        scene(vec3(p.x, p.y + EPSILON, p.z)) - scene(vec3(p.x, p.y - EPSILON, p.z)),
        scene(vec3(p.x, p.y, p.z  + EPSILON)) - scene(vec3(p.x, p.y, p.z - EPSILON))
    ));
}

vec3 phongContribForLight(vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye,
                          vec3 lightPos, vec3 lightIntensity) {
    vec3 N = estimateNormal(p);
    vec3 L = normalize(lightPos - p);
    vec3 V = normalize(eye - p);
    vec3 R = normalize(reflect(-L, N));

    float dotLN = dot(L, N);
    float dotRV = dot(R, V);

    if (dotLN < 0.0) {
        // Light not visible from this point on the surface
        return vec3(0.0, 0.0, 0.0);
    }

    if (dotRV < 0.0) {
        // Light reflection in opposite direction as viewer, apply only diffuse
        // component
        return lightIntensity * (k_d * dotLN);
    }
    return lightIntensity * (k_d * dotLN + k_s * pow(dotRV, alpha));
}

/**
 * Lighting via Phong illumination.
 *
 * The vec3 returned is the RGB color of that point after lighting is applied.
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye) {
    const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = ambientLight * k_a;

    vec3 light1Pos = vec3(4.0 * sin(0.1*time),
                          2.0,
                          4.0 * cos(0.08*time));
    vec3 light1Intensity = vec3(0.4, 0.4, 0.4);

    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light1Pos,
                                  light1Intensity);

    vec3 light2Pos = vec3(2.0 * sin(0.37 * time),
                          2.0 * cos(0.37 * time),
                          2.0);
    vec3 light2Intensity = vec3(0.4, 0.4, 0.4);

    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light2Pos,
                                  light2Intensity);
    return color;
}

void main() {
  vec3 dir = rayDirection(45.0, resolution.xy, gl_FragCoord.xy);
  vec3 eye = vec3(0.0, 0.0, 5.0);
  float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);

  // vec3 color = vec3(sin(time));

  if (dist > MAX_DIST - EPSILON) {
      // Didn't hit anything
      gl_FragColor = vec4(.02);

      // float x = texture2D(osc_bla, gl_FragCoord.xy / resolution.xy).x;
      // // float x = texture2D(midi, vec2(144. / 256., 0)).x * 200.;
      // gl_FragColor = vec4(x);
	    return;
  }

  // The closest point on the surface to the eyepoint along the view ray
  vec3 p = eye + dist * dir;

  vec3 K_a = vec3(cos(time)/8.);
  // vec3 K_d = vec3(0.7, 0.2, 0.2);
  vec3 K_d = vec3(abs(sin(gl_FragCoord.x / resolution.x + time))/3.);
  vec3 K_s = vec3(.0, 1.0, 1.0);
  float shininess = 10.0;

  vec3 color = phongIllumination(K_a, K_d, K_s, shininess, p, eye);

  // hacky, how does cel shading work correctly?
  // https://en.wikipedia.org/wiki/Cel_shading
  if (color.y > .5) color = vec3(1.);
  else if (color.y > .4) color += vec3(.4);
  else if (color.y > .2) color += vec3(.2);
  else if (color.y > .1) color += vec3(.13);
  else color += vec3(.04);

  gl_FragColor = vec4(color, 1.);
}
