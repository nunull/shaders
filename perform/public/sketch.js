const shaders = ['a.frag', 'b.frag', 'c.frag', 'd.frag']

shaders.map(shader => {
  const sketch = sketch => {
    let s

    sketch.preload = () => {
      s = sketch.loadShader('default.vert', shader)
    }

    sketch.setup = () => {
      sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL)
    }

    sketch.draw = () => {
      s.setUniform('resolution', [sketch.float(sketch.width), sketch.float(sketch.height)])
      s.setUniform('time', sketch.millis() / 1000)
      sketch.shader(s)
      sketch.rect(0, 0, sketch.width, sketch.height)
    }
  }

  new p5(sketch)
})
