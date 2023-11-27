precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = 0.;
	if (mod(gl_FragCoord.x + floor(sin(time*.1+sin(uv.y*20.)*cos(uv.x)*10.)*3.)*5. + sin((uv.y-.5+sin(time*.5+uv.x)*.3*cos(uv.y+time*.2))*.05+cos(time*.1+uv.x*20.)*.01)*.002, 6.5) == 0.) c = 1.;

	gl_FragColor = vec4(vec3(c), 1.);
}