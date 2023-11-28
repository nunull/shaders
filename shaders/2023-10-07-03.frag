precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;
	float x = uv.x;
	float y = uv.y;
	float t = time*.5;

	float c = .1*cos(t+x*y*sin(t*.1)*10.+x*cos(t*.12)*2.)*x*cos(x*y+sin(t*.1))*20.;
	gl_FragColor = vec4(vec3(c), 1.);
}