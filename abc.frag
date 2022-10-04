precision mediump float;

uniform vec2 resolution;
uniform float time;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

float sphere(vec3 p, float r) {
  // p.y -= clamp(p.y, -1., 1.);
  return length(p) - r;
}

vec2 scene(vec3 p) {
  p.x = abs(p.x);
  vec3 c = vec3(
    sin(time)*mod(p.x,0.1)*0.01+cos(time)*p.y*0.1+5.,
    sin(time/2.)*p.y*0.01+cos(time/2.2)*p.z*0.1+4.,
    sin(time/4.)*p.z*0.1+cos(time/4.1)*p.z*0.1+10.);
  vec3 q = mod(p+0.5*c,c)-0.5*c;
  float d = sphere(q-vec3(cos(time/8.)*1.8, sin(time/10.), 0.), 1.2);
  return vec2(d, 1.-p.x/12.-p.z/800.);
}

vec3 ray(float fieldOfView, vec2 size, vec2 p) {
  vec2 xy = p - size / 2.0;
  float z = size.y / tan(radians(fieldOfView) / 2.0);
  return normalize(vec3(xy, -z));
}

vec2 dist(vec3 camera, vec3 dir) {
  float depth = 10.;
  // 256 vs 56
  for (int i = 0; i < 26; i++) {
    vec2 dc = scene(camera + depth * dir);
    if (dc.x < 0.0001) {
      return vec2(depth, dc.y);
    }
    depth += dc.x;
    if (depth >= 100.) {
      return vec2(100., 0.);
    }
  }
  return vec2(100., 0.);
}

vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        scene(vec3(p.x + EPSILON, p.y, p.z)).x - scene(vec3(p.x - EPSILON, p.y, p.z)).x,
        scene(vec3(p.x, p.y + EPSILON, p.z)).x - scene(vec3(p.x, p.y - EPSILON, p.z)).x,
        scene(vec3(p.x, p.y, p.z  + EPSILON)).x - scene(vec3(p.x, p.y, p.z - EPSILON)).x
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

vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye) {
    const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = ambientLight * k_a;

    vec3 light1Pos = vec3(6. + 4.0 * sin(time),
                          2.0,
                          4.0 * cos(0.08*time));
    vec3 light1Intensity = vec3(0.4, 0.4, 0.4);

    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light1Pos,
                                  light1Intensity);

    vec3 light2Pos = vec3(-6. + 2.0 * sin(0.37 * time),
                          8.0 * cos(0.37 * time),
                          2.0);
    vec3 light2Intensity = vec3(0.4, 0.4, 0.4);

    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light2Pos,
                                  light2Intensity);
    return color;
}

void main() {
  vec3 dir = ray(45., resolution.xy, gl_FragCoord.xy/1.1);
  vec3 camera = vec3(sin(time/20.)*0.8, 0.4+cos(time/8.)*0.5, sin(time/30.)*0.2+5.);
  vec2 dc = dist(camera, dir);

  if (dc.x > 100. - 0.0001) {
    gl_FragColor = vec4(0.);
    return;
  }

  // gl_FragColor = vec4(dc.y);

  vec3 p = camera + dc.x * dir;

  vec3 K_a = vec3(0.);
  vec3 K_d = vec3(0.2, 0.2, 0.25);
  vec3 K_s = vec3(0.8, 1.0, 1.0);
  float shininess = 4.0;

  vec3 color = phongIllumination(K_a, K_d, K_s, shininess, p, camera);

  if (color.y > .75) color = vec3(0., 0., 0.);
  else if (color.y > .4) color += vec3(.4);
  else if (color.y > .2) color += vec3(.2);
  else if (color.y > .1) color += vec3(.13);
  else color += vec3(.04);

  gl_FragColor = vec4(color, 1.);
}