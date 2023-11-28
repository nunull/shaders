precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

float circle(vec2 uv, float f4) {
	float f3 = step(sin(time), .8 + f4) * cos(time * 0.5) + .2;
	float f2 = length(uv - .5 + vec2(sin(time) * .1 * uv.y, uv.x * f3 * mod(uv.y * 20., .2)));
	float f = step(f2, .14) - step(f2, .1);
	return f;
}

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	float f = circle(uv, .1) + circle(uv + vec2(.4, 0.), time * 0.01)  + circle(uv + vec2(-.4, 0.), .8);

	gl_FragColor = vec4(vec3(f), 1.);
}