<template>
  <InputText
    type="text"
    v-model="innerValue"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
export default defineComponent({
  name: 'AtomsInputText'
})
</script>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  defaultValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const innerValue = ref<string>('')

innerValue.value = props.defaultValue

const emit = defineEmits(['update:defaultValue'])

watchEffect(() => emit('update:defaultValue', innerValue.value))
</script>

<style lang="scss" scoped>
.p-inputtext {
  &:enabled {
    &:focus {
      border-color: $color-quiet-red-darker;
      box-shadow: 0 0 0 0.2rem $color-quiet-red;
    }
    &:hover {
      border-color: $color-quiet-red-darker;
    }
  }
  &::placeholder {
    font-size: 12px;
    color: $color-placeholder-gray;
  }
}
</style>
