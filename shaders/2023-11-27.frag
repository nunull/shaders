precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = step((sin(uv.x * PI * 20. + time*uv.x*uv.y) + sin(uv.y * PI * 20. + time*uv.x)) / 2., sin(time+uv.x));
	gl_FragColor = vec4(vec3(c), 1.);
}