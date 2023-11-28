precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

float random (vec2 st) {
	return fract(tan(dot(st.xy, vec2(100000.)))*100000.);
}

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	if (uv.x > .5) uv.y = 1. - uv.y;

	float c = 1.-length(uv - vec2(.125) + vec2(tan(uv.x*uv.y+time*.001*uv.y)));

	float n = 8.;
	float x = gl_FragCoord.y;
	if (mod(time, 20.) > 10.) x = gl_FragCoord.x;
	float f = mod(x+uv.x*time, n - (c*n * tan(uv.x+time*.001)));
	c = 1.-f;

	gl_FragColor = vec4(vec3(c), 1.);
}