precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = 0.;
	for (float i = 1.; i < 4.; i++) {
		c += smoothstep(.499, .501, sin(uv.x+i/50. + sin(time*i/3.)*.2) + cos(uv.y*uv.x+i+time)*(.1*i));
	}
	for (float i = 1.; i < 4.; i++) {
		c -= smoothstep(.499-i/3., .501+i/3., sin(uv.x + sin(time*i/3.)*.2) + cos(uv.y*uv.x+i+time)*(.1*i));
	}
	gl_FragColor = vec4(vec3(c), 1.);
}