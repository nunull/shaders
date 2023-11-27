const { createApp } = Vue

createApp({
  data () {
    return {
      groups: [{
        name: 'a',
        params: [{
          name: 'speed',
          current: 1,
          target: 1,
          time: 1,
          isChanging: false,
          editedField: ''
        }, {
          name: 'chaos',
          current: 1,
          target: 1,
          time: 1,
          isChanging: false,
          editedField: ''
        }]
      }, {
        name: 'b',
        params: [{
          name: 'speed',
          current: 1,
          target: 1,
          time: 1,
          isChanging: false,
          editedField: ''
        }]
      }]
    }
  },

  methods: {
    formatFloat (v) {
      return v.toFixed(2)
    },

    editParam (param) {
      console.log(param)
      param.editedField = 'target'
    }
  }
}).mount('#app')