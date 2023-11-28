precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = -tan(time*.4+uv.y+uv.x*.2) - tan(time*.3+uv.y+uv.x*.2) + sin(uv.x+time);
	gl_FragColor = vec4(vec3(c), 1.);
}