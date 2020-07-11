/* { "server": 3000 } */

precision mediump float;

uniform vec2 resolution;
uniform float time;

void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    float t1 = smoothstep(0.3, 0.7, abs(sin(time+uv.x)));
    float t2 = smoothstep(0.3, 0.7, abs(sin(time+uv.x+0.4)));
    float c1 = step(abs(sin(uv.x)) * 0.008, mod(uv.y+sin(uv.x+(time+time*uv.x*0.1)/20.0)*0.5, 0.05));
    float c2 = step(abs(sin(uv.x)) * 0.007, mod(uv.y+sin(uv.x+10.0), 0.06));

    // vec3 col = vec3(max(t1, c), max(t2, c), max(t2, c));
    vec3 col = vec3(max(c1, c2), max(c1, c2), max(t2, c1));

    gl_FragColor = vec4(col, 1.0);
}
