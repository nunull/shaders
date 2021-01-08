precision mediump float;

uniform vec2 resolution;
uniform float time;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

float sphere(vec3 p) {
  return length(p)-1.;
}

float scene(vec3 p) {
  return sphere(p);
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
  vec3 eye = vec3(0., 0., 5.);
  float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);

  if (dist > MAX_DIST - EPSILON) {
    // did not hit anything
    gl_FragColor = vec4(0., 0., 0., 1.);
    return;
  }

  gl_FragColor = vec4(1., 0., 0., 1.);
}
