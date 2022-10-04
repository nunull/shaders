precision mediump float;

uniform vec2 resolution;
uniform float time;

bool c(float f, float f2) {
  float d = 12.; //64.;
  return mod(gl_FragCoord.y+sin(gl_FragCoord.x*f + time*f2)*10., d) < (d/2.);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.x;
  
  float b = step(length(vec2(0.5, 0.3) - uv), 0.1);
  gl_FragColor = vec4(vec3(
    c(0.001, 1.),
    c(0.0023, 0.9),
    c(0.0012, 0.8)
  )*b, 1.);
}
