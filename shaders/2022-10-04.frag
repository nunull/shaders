precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float c = 0.;

  for (float i = 0.; i < 9.; i++) {
    float r = .2 + sin(time)*cos(time*1.7+i*.1)*.1;
    r += sin(cos(time)+tan(time)*.02)*.1+i*.1;
    r += tan(time*.01)*.1;

    vec2 o = vec2(sin(time * length(uv) * (i+1.) + i))*.1;

    float c1 = step(length(uv - vec2(0.5, 0.5) + o), r);
    float c2 = step(length(uv - vec2(0.5, 0.5) + o), r + .01);
    c += c2 - c1;
  }

  gl_FragColor = vec4(vec3(c), 1.);
}