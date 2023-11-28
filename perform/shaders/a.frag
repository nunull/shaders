precision mediump float;

uniform vec2 resolution;
uniform float time;

float texture(vec2 uv, vec2 p, float c) {
  if (c == 0.) return 0.;
  if (mod(gl_FragCoord.x + length(p)*.0001 + floor(sin(time*.1+sin(uv.y*20.)*cos(uv.x)*10.)*3.)*5. + sin((uv.y-.5+sin(time*.5+uv.x)*.3*cos(uv.y+time*.2+p.x))*.05+cos(time*.1+uv.x*20.)*.01)*.002, 6.5) == 0.) return 1.;
  return 0.;
}

void main() {
  vec2 uv = gl_FragCoord.xy/resolution.xy;

  vec2 p = abs(uv - .5 + sin(time*.1*uv.x)*.2);
  float c = step(length(p), .2);
  c = texture(uv, p, c);
  gl_FragColor = vec4(vec3(c), 1.);
}