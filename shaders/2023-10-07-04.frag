precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	//time = time*.1;

	float c = sin(uv.x);
	gl_FragColor = vec4(vec3(c), 1.);
}