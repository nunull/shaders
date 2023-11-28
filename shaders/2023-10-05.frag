precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	float c = step(sin(uv.x*13. * uv.y*10. + sin(time*0.1)*10.) + tan(uv.y*4. + time) - tan(uv.x*8.*sin(time*0.1)*sin(time*0.5)*0.4), 0.);
	gl_FragColor = vec4(vec3(c), 1.);
}