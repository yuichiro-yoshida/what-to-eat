<template>
    <div class="conditionList">
      <div class="condition">
        <h3 class="condition_heading">食材名 / 成分名</h3>
        <AtomsInputText
          v-model:defaultValue="innerInputText"
          placeholder="例）ブロッコリー、葉酸、など"
        />
      </div>
      <div class="condition">
        <h3 class="condition_heading">成分やリスク</h3>
        <ul class="condition_checkboxList">
          <li
            class="condition_checkboxWrapper"
            v-for="option in ingredientsMaster"
          >
            <AtomsCheckbox
              :id="`ingredient-${option.code}`"
              name="ingredient"
              :value="option.code"
              v-model:checkedValues="innerCheckedIngredients"
            />
            <label
              class="condition_checkboxLabel"
              :for="`ingredient-${option.code}`"
            >
              {{ option.name }}
            </label>
          </li>
        </ul>
      </div>
      <div class="condition">
        <h3 class="condition_heading">意識する時期</h3>
        <ul class="condition_checkboxList">
          <li
            class="condition_checkboxWrapper"
            v-for="option in TIMING_CHECKBOXES"
          >
            <AtomsCheckbox
              :id="`timing-${option.timing}`"
              name="timing"
              :value="option.timing"
              v-model:checkedValues="innerCheckedTimings"
            />
            <label
              class="condition_checkboxLabel"
              :for="`timing-${option.timing}`"
            >
              {{ option.label }}
            </label>
          </li>
        </ul>
      </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'OrganismsConditionList'
})
</script>

<script lang="ts" setup>
import { ref, watchEffect, PropType } from 'vue'
import AtomsInputText from '../../components/atoms/InputText.vue'
import AtomsCheckbox from '../../components/atoms/Checkbox.vue'
import TIMING_CHECKBOXES from '../../constants/ui/timingCheckboxes'
import ingredients from '../../data/ingredients'
import Ingredient from '../../types/ingredient'
import Timing from '../../types/timing'

const props = defineProps({
  inputText: String,
  checkedIngredients: Object as PropType<Ingredient['code'][]>,
  checkedTimings: Object as PropType<Timing[]>
})

const ingredientsMaster = ref<Ingredient[]>(Object.values(ingredients))

const emit = defineEmits([
  'update:inputText',
  'update:checkedIngredients',
  'update:checkedTimings'
])

const innerInputText = ref<string>('')
watchEffect(() => emit('update:inputText', innerInputText.value))

const innerCheckedIngredients = ref<Ingredient['code'][]>(props.checkedIngredients)
watchEffect(() => emit('update:checkedIngredients', innerCheckedIngredients.value))

const innerCheckedTimings = ref<Timing[]>(props.checkedTimings)
watchEffect(() => emit('update:checkedTimings', innerCheckedTimings.value))
</script>

<style lang="scss">
.conditionList {
  border: 1px solid $color-red-like-gray-darker;
  border-radius: 8px;
  padding: 20px 80px 20px 20px;
  display: flex;
  max-height: 192px;
}
.condition {
  & + & {
    margin: 0 0 0 40px;
  }
  &_heading {
    margin: 0 0 8px;
    font-weight: bold;
  }
  &_checkboxList {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(4, auto);
  }
  &_checkboxWrapper {
    margin: 0 0 8px;
    &:nth-child(n + 5) {
      margin-left: 20px;
    }
  }
  &_checkboxLabel {
    @include link-effect;
    cursor: pointer;
    margin: 0 0 0 4px;
    font-size: 13px;
  }
}
</style>
