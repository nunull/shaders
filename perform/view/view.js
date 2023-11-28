let isInitialized = false

initViewer()

function initViewer () {
  if (!window.groups) return
  if (isInitialized) return

  isInitialized = true

  window.groups.map(group => {
    console.log('initializing sketch for group', group)

    const sketch = sketch => {
      let s
      let canvas
      let time = 0

      sketch.preload = () => {
        s = sketch.loadShader('../assets/default.vert', `../shaders/${group.name}.frag`)
      }

      sketch.setup = () => {
        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL)
      }

      sketch.draw = () => {
        s.setUniform('resolution', [sketch.float(sketch.width), sketch.float(sketch.height)])
        s.setUniform('time', time)

        let speed = 1

        for (let param of group.params) {
          if (param.name === 'opacity') {
            canvas.elt.style.opacity = param.current
          } else if (param.name === 'speed') {
            // for the speed parameter, 0.5 is neutral
            speed = param.current * 2
          } else {
            s.setUniform(param.name, param.current)
          }
        }

        sketch.shader(s)
        sketch.rect(0, 0, sketch.width, sketch.height)

        time += (1 / sketch.frameRate()) * speed
      }
    }

    new p5(sketch)
  })
}