initViewer()

function initViewer () {
  if (!window.groups) return

  // const shaders = ['a.frag', 'b.frag', 'c.frag', 'd.frag']

  // shaders.map(shader => {
  window.groups.map(group => {
    const sketch = sketch => {
      let s

      sketch.preload = () => {
        // s = sketch.loadShader('default.vert', shader)
        s = sketch.loadShader('default.vert', `${group.name}.frag`)
      }

      sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL)
      }

      sketch.draw = () => {
        s.setUniform('resolution', [sketch.float(sketch.width), sketch.float(sketch.height)])
        s.setUniform('time', sketch.millis() / 1000)

        for (let param of group.params) {
          s.setUniform(param.name, param.current)
        }

        sketch.shader(s)
        sketch.rect(0, 0, sketch.width, sketch.height)
      }
    }

    new p5(sketch)
  })
}