precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = sin(uv.x*6.+time*.4+uv.y*2.) - cos(uv.x*6.*sin(time*.1)+time*.3) - sin(uv.y+uv.x*3.);
	gl_FragColor = vec4(vec3(c), 1.);
}