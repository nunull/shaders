const { createApp, nextTick } = Vue

const app = createApp({
  data () {
    return {
      groups: [{
        name: 'a',
        params: [{
          name: 'opacity',
          current: 0,
          target: 1,
          time: 1,
          isChanging: false,
          changeStart: null,
          editedField: '',
          editedChar: 0
        }, {
          name: 'speed',
          current: 0.5,
          target: 1,
          time: 1,
          isChanging: false,
          changeStart: null,
          editedField: '',
          editedChar: 0
        }, {
          name: 'chaos',
          current: 1,
          target: 1,
          time: 1,
          isChanging: false,
          changeStart: null,
          editedField: '',
          editedChar: 0
        }]
      }, {
        name: 'b',
        params: [{
          name: 'opacity',
          current: 1,
          target: 1,
          time: 1,
          isChanging: false,
          changeStart: null,
          editedField: '',
          editedChar: 0
        }, {
          name: 'speed',
          current: 0.5,
          target: 0,
          time: 1,
          isChanging: false,
          changeStart: null,
          editedField: '',
          editedChar: 0
        }, {
          name: 'dist',
          current: 0.1,
          target: 1,
          time: 1,
          isChanging: false,
          changeStart: null,
          editedField: '',
          editedChar: 0
        }, {
          name: 'height',
          current: 0.1,
          target: 1,
          time: 1,
          isChanging: false,
          changeStart: null,
          editedField: '',
          editedChar: 0
        }]
      }]
    }
  },

  created () {
    document.querySelectorAll('iframe').forEach(iframeElement => {
      iframeElement.contentWindow.groups = this.groups
      iframeElement.contentWindow.addEventListener('load', () => {
        iframeElement.contentWindow.initViewer()
      })
    })

    window.addEventListener('keydown', event => {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        let param = this.getEditedParam()
        if (!param) return

        let value = this.formatParamValue(param, param.editedField, true)

        let valueNew = ''
        for (let i = 0; i < value.length; i++) {
          let c = value[i]
          if (c === '.') valueNew += '.'
          else if (i === param.editedChar) valueNew += event.key
          else valueNew += c
        }

        param[param.editedField] = param.editedField === 'time' ? parseInt(valueNew) : Math.max(0, Math.min(1, parseFloat(valueNew)))

        console.log(param[param.editedField])

        let nextEditedChar = -1
        for (let i = 0; i < value.length; i++) {
          let c = value[i]
          if (c === '.') continue
          if (i > param.editedChar) {
            nextEditedChar = i
            break
          }
        }

        console.log(param[param.editedField], nextEditedChar)

        if (nextEditedChar === -1) {
          this.advanceEditedField()
          return
        }

        console.log(param[param.editedField])

        param.editedChar = nextEditedChar
      } else if (event.key === 'Enter') {
        this.advanceEditedField()
      } else if (event.key === 'Escape') {
        let param = this.getEditedParam()
        if (!param) return

        param.editedField = ''
        param.editedChar = 0
      }
    })
  },

  methods: {
    advanceEditedField () {
      let param = this.getEditedParam()
      if (!param) return

      if (param.editedField === 'target') {
        param.editedField = 'time'
        param.editedChar = 0
      } else {
        param.editedField = ''
        param.editedChar = 0

        this.startChange(param)
      }
    },

    getEditedParam () {
      let editedParam = null

      for (let group of this.groups) {
        for (let param of group.params) {
          if (param.editedField) {
            editedParam = param
            break
          }
        }
      }

      return editedParam
    },

    startChange (param) {
      const duration = param.time*1000

      param.changeStart = new Date()
      param.changeEnd = new Date(param.changeStart.getTime() + duration)

      param.isChanging = true

      const interval = 30
      const diff = param.target - param.current
      const tickCount = duration/interval
      const increment = diff/tickCount

      const intervalRef = setInterval(() => {
        const currentTime = new Date()
        if (currentTime >= param.changeEnd) {
          clearInterval(intervalRef)
          param.current = param.target
          param.isChanging = false
          param.time = 1
          return
        }

        param.current += increment
        param.time = (param.changeEnd.getTime() - new Date().getTime()) / 1000
      }, interval)
    },

    formatParamValue (param, name, plainOutput = false) {
      let s = param[name].toFixed(2)
      if (name === 'time') {
        s = parseInt(param[name]).toString()

        if (param[name] < 10) s = `0${s}`
        if (param[name] < 100) s = `0${s}`
      }

      if (param.editedField === name && !plainOutput) {
        let s2 = ''
        for (let i = 0; i < s.length; i++) {
          let c = s[i]
          if (c === '.') s2 += '.'
          else if (i === param.editedChar) s2 += `<span class="current-char">${c}</span>`
          else s2 += c
        }

        return s2
      }

      return s
    },

    async editParam (param) {
      // console.log(param)
      param.editedField = 'target'
      param.editedChar = 0

      // await nextTick()
      // console.log(this.$refs)
      // this.$refs.valueInput[0].focus()
    },

    openViewer () {
      const w = window.open(window.location.href + '/view.html')
      w.groups = this.groups
    }
  }
}).mount('#app')

// app.component('Param', {
//   data () {
//     return {

//     }
//   }
// })