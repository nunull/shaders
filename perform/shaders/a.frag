precision mediump float;

uniform vec2 resolution;
uniform float time;

uniform float opacity;
uniform float speed;

float texture(vec2 uv, vec2 p, float c, float t) {
  if (c == 0.) return 0.;
  if (mod(gl_FragCoord.x + length(p)*.0001 + floor(sin(t*.1+sin(uv.y*20.)*cos(uv.x)*10.)*3.)*5. + sin((uv.y-.5+sin(t*.5+uv.x)*.3*cos(uv.y+t*.2+p.x))*.05+cos(t*.1+uv.x*20.)*.01)*.002, 6.5) == 0.) return 1.;
  return 0.;
}

void main() {
  vec2 uv = gl_FragCoord.xy/resolution.xy;

  float t = time*speed;

  vec2 p = abs(uv - .5 + sin(t*.1*uv.x)*.2);
  float c = step(length(p), .2);
  c = texture(uv, p, c, t);
  gl_FragColor = vec4(vec3(c*opacity), opacity);
}