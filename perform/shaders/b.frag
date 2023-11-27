precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	float c = 0.;
	if (mod(gl_FragCoord.x, 6.5) == floor(sin(uv.y - .125 + cos(time*.5+uv.x)*.2)*3.)*(5.+floor(sin(time*.5+uv.x)*2.))) c = 1.;

	gl_FragColor = vec4(vec3(c), 1.);
}