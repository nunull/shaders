precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

float circle(vec2 p, float r, float w) {
  float c = step(length(p), r);
  c -= step(length(p), r-w);
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float c = 0.;
  for (float i = 0.; i < 3.; i++) {
    float o = length(uv)*uv.y*i*.02+abs(tan(time+i*.05+uv.y+uv.x*.5)*.001);
    c += circle(mod(uv - vec2(.5) - o, vec2(.1)) - o*7., .1+i*.4*uv.x*sin(time), .005);
  }

  gl_FragColor = vec4(vec3(c), 1.);
}