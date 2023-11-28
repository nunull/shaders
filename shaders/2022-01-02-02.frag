precision mediump float;

uniform vec2 resolution;
uniform float time;

// bool c(float f, float f2) {
//   float d = 12.; //64.;
//   return mod(gl_FragCoord.y+sin(gl_FragCoord.x*f + time*f2)*10., d) < (d/2.);
// }

bool c(vec2 uv, float f1, float f2) {
  return uv.x+(uv.y*f2) > 0.5 ||uv.x+(uv.y*f1) < 0.3;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.x;
  
  // float v1 = ;
  float v = 1.-float(c(uv, 0.2+sin(time)*0.01, 0.3+sin(time*1.2)*0.01) && c(uv, 0.5, 0.9));
  // float b = step(length(vec2(0.5, 0.3) - uv), 0.2);
  float b = 1.;
  gl_FragColor = vec4(vec3(v)*b, 1.);
}