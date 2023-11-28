precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = sin(uv.x*sin(time*.01+uv.x*.2)*100. + uv.y*(3.+sin(time*.3)*5.) + time*.3) + cos(uv.x * 20. - uv.y*(sin(time*.35)*.1) + time*.4);
	gl_FragColor = vec4(vec3(c), 1.);
}