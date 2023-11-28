precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = smoothstep(
		sin(time+uv.x)-.6,
		sin(time+uv.x)+.6,
		sin(uv.x * PI * 10. + sin(.1*time*uv.x*uv.y*uv.y)*100.) + sin(uv.y * PI * 10. + time*uv.x));
	gl_FragColor = vec4(vec3(c), 1.);
}