precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	float o = sin(abs(sin(time*.025))*50.*tan(length(uv)*uv.y))*.1;

	float c = step(length(uv - vec2(.5) + o), .1);
	c -= step(length(uv - vec2(.5) + o), .095);

	gl_FragColor = vec4(vec3(c), 1.);
}