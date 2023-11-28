precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

float circle(vec2 p, float r, float w) {
  float c = step(r+10., length(p));
  c -= smoothstep(length(p), r-w, r-(w*1.4));
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  vec3 c = vec3(0.);

  for (float i = 0.; i < 8.; i++) {
    vec2 p = gl_FragCoord.xy - (resolution.xy/vec2(2.)) + sin(uv.x*time+i)*10. + cos(uv.y*time)*30.;
    c += vec3(
      circle(p, 297., 3. + sin(uv.x*10.0+uv.y*time+time*.001)*13.)*.33,
      circle(p, 300., 3. + sin(uv.x*10.2+uv.y*time+time*.001)*13.)*.31,
      circle(p, 300., 3. + sin(uv.x*10.5+uv.y*time+time*.001)*13.)*.32);
  }

  gl_FragColor = vec4(c, 1.);
}