precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.;
const float MAX_DIST = 100.;
const float EPSILON = 0.0001;

vec3 pos1(float i) {
  return vec3(
    (sin(time + i*2.)*i*3. + cos(time - i/2.)*cos(time*i*2.)*i) * .1,
    -.4 + sin(i),
    sin(time + i));
}

float sphere(vec3 p, float r) {
  return length(p) - r;
}

// from https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h); }

float scene(vec3 p) {
  float d = MAX_DIST;
  for (float i = 0.; i < 5.; i++) {
    vec3 p1 = pos1(i);

    d = opSmoothUnion(d, sphere(p+p1, .3), .8);
  }

  return d;
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

void main() {
  vec3 dir = rayDirection(45.0, resolution.xy, gl_FragCoord.xy);
  vec3 eye = vec3(0., 0., 5.0);
  float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);

  if (dist > MAX_DIST - EPSILON) {
      gl_FragColor = vec4(0.);
      return;
  }

  float c = 0.;
  if (dist < 4.3) {
    c = .9;
  } else if (dist < 4.9) {
    c = .2;
  }

  gl_FragColor = vec4(vec3(c), 1.);
}