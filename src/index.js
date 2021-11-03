import ElSuggestSelect from './lib.vue'

const components = [ElSuggestSelect]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install
export { ElSuggestSelect }
