precision mediump float;

uniform vec2 resolution;
uniform float time;

float sphere(vec3 p) {
  return length(p)-1.;
}

float scene(vec3 p) {
  return sphere(p);
}

float rayMarching() {}

void main() {
  gl_FragColor = vec4(0.5, 0., 0., 1.);
}
