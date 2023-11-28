precision mediump float;

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution.xy;

	//float c = step(sin(time*uv.x*2. + tan(time*0.1)*.01 + cos(time*.1+uv.y)*1.4) - cos(uv.y+time), cos(time*.05*uv.x+uv.y*4.)*.3) + sin(time*uv.x+tan(uv.y))*.5;
	float c = sin(time*uv.y*2.+uv.x*time*uv.y + tan(time*0.01)*.01 + cos(time*.1+uv.y+uv.x)*2.) - cos(uv.x+time) + cos(time*.05*uv.x+uv.y*4.)*.3 + sin(time*uv.y+tan(uv.y))*.5;
	gl_FragColor = vec4(vec3(c), 1.);
}