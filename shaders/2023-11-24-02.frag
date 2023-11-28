precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float a = cos((uv.x + uv.x*(.1 + cos(time*.018)*uv.x + sin(time*.015)*(1.-uv.x)) + time*.05) * PI*8.)*.1;
	float c = smoothstep(.5, -.9, sin((uv.x + a) * PI*10.-PI/2.));
	gl_FragColor = vec4(vec3(c), 1.);
}