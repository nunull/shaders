precision mediump float;

uniform vec2 resolution;
uniform float time;

const float PI = 3.14159;

float rect(vec2 p, vec2 b) {
	vec2 d = abs(p)-b;
	return length(max(d, 0.)) + min(max(d.x, d.y), 0.);
}

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	uv.x = mod(uv.x, .1);
	uv.y = mod(uv.y+sin(uv.x)*sin(time*.01), .05+tan(time+(uv.y / 10.))*.0008);

	float d = rect(uv+fract(sin(time*.1))*.01, vec2(.3, .01));

	float c = 0.;
	if (d <= 0.) c = 1.;

	gl_FragColor = vec4(vec3(c), 1.);
}