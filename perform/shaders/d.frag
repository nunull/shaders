precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	vec2 p = abs(uv - .5 + sin(time*uv.x)*.2);
	float c = step(length(p), .2);
	gl_FragColor = vec4(vec3(c), 1.);
}