precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

float random (vec2 st) {
  return fract(tan(dot(st.xy, vec2(100000.)))*100000.);
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;
  if (st.y > .5) st.x += .1 + sin(time)*.1;

  float rndb = random(st*1.2+fract(sin(time*.0001)*.1));

  if (st.x > .5) st.y = .5;
  else st.x += .1;

  float rnd = random(floor(st*3. + cos(time*st.x+st.y*.01)*15. + tan(time*.01)*300.));

  gl_FragColor = vec4(vec3(floor(rnd+.2)),1.0);
}