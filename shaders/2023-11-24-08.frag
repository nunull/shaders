precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	//float c = 0.;
	//if (mod(gl_FragCoord.x, 10.5) == 0.) c = 1.;

	float c = (1. - floor(mod(gl_FragCoord.x, 200.))*.5 + uv.y) + sin(time*.5+uv.y*.2+uv.x*.5)*30.;

	gl_FragColor = vec4(vec3(c), 1.);
}