precision mediump float;

uniform vec2 resolution;
uniform float time;

//uniform float chaos;
uniform float dist;
uniform float height;

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	//float chaosFactor = float(floor(sin(time*.5+uv.x)*2.)) * chaos;
	//float chaosFactor = chaos;

	float d = floor(dist*100.) + .5;
	float d2 = floor(d);
	float h = 30.*(1.-height);

	float c = 0.;
	//if (mod(gl_FragCoord.x, 6.5) == floor(sin(uv.y - .125 + cos(time*.5+uv.x)*.2)*3.)*(5.+floor(sin(time*.5+uv.x)*2.))) c = 1.;
	if (mod(gl_FragCoord.x, d) == floor(sin(uv.y - .125 + cos(time*.5+uv.x)*.2)*h)*(d2)) c = 1.;

	gl_FragColor = vec4(vec3(c), 1.);
}