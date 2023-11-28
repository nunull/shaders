precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

float circle(vec2 p, float r) {
	return step(length(p), r);
}

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	float f = circle(mod(uv - vec2(time*0.01, 0.), .03 + .05 * abs(cos(time*0.2))) - .01 * sin(time * uv.y + uv.x), 0.05);

	gl_FragColor = vec4(vec3(f), 1.);
}