ElSuggestAutocomplete
<template>
  <div class="_el__suggest-sel">
    <el-select v-model="valt" :placeholder="placeholder" clearable :popper-append-to-body="popperAppendToBody" :multiple="multiple" :disabled="disabled" :collapse-tags="collapseTags" :filterable="filterable" :automatic-dropdown="automaticDropdown" @change="_sl7">
      <el-option-group
        v-for="group in sult"
        :key="group.label"
        :label="group.label">
          <el-option
            :value="item.value"
            v-for="item in group.options"
            :key="item.value">
            <el-tooltip :disabled="!item['tips']" placement="top">
              <template #content>
                <div class="_el__suggest-sel-tp" v-html="item['tips']"></div>
              </template>
              <span>{{item.label}}</span>
            </el-tooltip>
          </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>

import { debounce, cloneDeep } from 'lodash'

export default {
  name: 'ElSuggestSelect',
  props: {
    value: {
      type: [String, Number, Array]
    },
    suggestions: {
      type: Array,
      default: () => Array.prototype.constructor()
    },
    options: {
      type: Array,
      default: () => Array.prototype.constructor()
    },
    placeholder: {
      type: String,
      default: () => 'click to select'
    },
    suggestionsTitle: {
      type: String,
      default: () => 'group name'
    },
    optionsTitle: {
      type: String,
      default: () => 'all options'
    },
    keyKey: {
      type: String,
      default: () => 'label'
    },
    valueKey: {
      type: String,
      default: () => 'value'
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    collapseTags: {
      type: Boolean,
      default: () => false
    },
    filterable: {
      type: Boolean,
      default: () => false
    },
    automaticDropdown: {
      type: Boolean,
      default: () => false
    },
    hideEmpty: {
      type: Boolean,
      default: () => true
    },
    popperAppendToBody: {
      type: Boolean,
      default: () => false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      valt: void 0,
      sult: void 0
    }
  },
  mounted () {
    this._i1()
  },
  methods: {
    _i1 () {
      this.value && this._i0(this.value)
      if (this.suggestions || this.options) {
        this._uo4(this.suggestions, this.options)
      }
    },
    _i0 (v, d) {
      this.valt = d ? ['_unlock', cloneDeep(v)] : cloneDeep(v)
      this._cl2(this.valt)
    },
    _uo4 (v1, v2) {
      let rs = Array.prototype.constructor()
      if (this._arb(v1, this.hideEmpty)) {
        rs.push({
          label: this.suggestionsTitle,
          options: v1.map(i => ({ label: i[this.keyKey], value: i[this.valueKey], tips: i['tips'] || void 0 }))
        })
      }
      if (this._arb(v2)) {
        rs.push({
          label: this.optionsTitle,
          options: v2.map(i => ({ label: i[this.keyKey], value: i[this.valueKey], tips: i['tips'] || void 0 }))
        })
      }
      this.sult = rs
    },
    _arb (v, l = true) {
      return v && Object.prototype.toString.call(v) === '[object Array]' && (l ? v.length > 0 : true)
    },
    _sl7 (v) {
      this._i0(v, true)
    },
    _cl2 (v) {
      if (this._arb(v) && v[0] === '_unlock') {
        this.$emit('change', cloneDeep(v[1]))
      }
    }
  },
  watch: {
    value (v) {
      this._i0(v)
    },
    suggestions (v) {
      this._uo4(v, this.options)
    },
    options (v) {
      this._uo4(this.suggestions, v)
    }
  }
}

</script>

<style lang="scss">
@import './style/style.scss';
</style>
