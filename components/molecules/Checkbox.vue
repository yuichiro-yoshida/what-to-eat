<template>
  <Checkbox
    v-bind="$attrs"
    :value="value"
    v-model="innerValues"
  />
</template>

<script lang="ts">
export default defineComponent({
  name: 'MoleculesCheckbox'
})
</script>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import Checkbox from 'primevue/checkbox'

const props = defineProps({
  value: null,
  checkedValues: {
    type: Array
  }
})

const innerValues = ref<any>(props.checkedValues)

const emit = defineEmits(['update:checkedValues'])

watchEffect(() => emit('update:checkedValues', innerValues.value))

watchEffect(() => innerValues.value = props.checkedValues)
</script>

<style lang="scss">
.p-checkbox {
  &:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
    border-color: $color-quiet-red-darker;
    background: $color-quiet-red-darker;
  }

  .p-checkbox-box.p-highlight {
    background: $color-quiet-red;
    border-color: $color-quiet-red;
  }

  &:not(.p-checkbox-disabled) .p-checkbox-box {
    &:hover {
      border-color: $color-quiet-red-darker;
    }

    &.p-focus {
      box-shadow: 0 0 0 0.1rem $color-quiet-red-darker;
      border-color: $color-quiet-red-darker;
    }
  }
}
</style>
