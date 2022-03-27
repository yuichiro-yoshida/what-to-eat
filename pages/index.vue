<template>
  <div>
    <div class="conditionList">
      <div class="condition">
        <h3 class="condition_heading">食材名 / 成分名</h3>
        <AtomsInputText
          v-model:defaultValue="inputText"
          placeholder="例）ブロッコリー、葉酸、など"
        />
      </div>
      <div class="condition">
        <h3 class="condition_heading">成分</h3>
        <ul class="condition_checkboxList">
          <li
            class="condition_checkboxWrapper"
            v-for="option in ingredientsMaster"
          >
            <AtomsCheckbox
              :id="`ingredient-${option.code}`"
              name="ingredient"
              :value="option.code"
              v-model:checkedValues="checkedIngredients"
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
        <h3 class="condition_heading">時期</h3>
        <ul class="condition_checkboxList">
          <li
            class="condition_checkboxWrapper"
            v-for="option in TIMING_CHECKBOXES"
          >
            <AtomsCheckbox
              :id="`timing-${option.timing}`"
              name="timing"
              :value="option.timing"
              v-model:checkedValues="checkedTimings"
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
    <div class="tabs">
      <MoleculesTabMenu
        :tabs="TABS"
        v-model:activeTabIndex="activeTabIndex"
      />
    </div>
    <div class="table">
      <OrganismsFoodsTable :foods="filteredFoods" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AtomsInputText from '../components/atoms/InputText.vue'
import AtomsCheckbox from '../components/atoms/Checkbox.vue'
import MoleculesTabMenu from '../components/molecules/TabMenu.vue'
import OrganismsFoodsTable from '../components/organisms/FoodsTable.vue'
import TABS from '../constants/ui/tabs'
import TIMING_CHECKBOXES from '../constants/ui/timingCheckboxes'
import ingredients from '../data/ingredients'
import TimingCheckbox from '../types/ui/timingCheckbox'
import Tab from '../types/ui/tab'
import Ingredient from '../types/ingredient'
import useFilteredFoods from '../composables/use-filtered-foods'

ref<Tab[]>(TABS)
ref<TimingCheckbox[]>(TIMING_CHECKBOXES)

const ingredientsMaster = ref<Ingredient[]>(Object.values(ingredients))

const {
  inputText,
  checkedIngredients,
  checkedTimings,
  activeTabIndex,
  filteredFoods
} = useFilteredFoods()
</script>

<style lang="scss" scoped>
.conditionList {
  border: 1px solid $color-red-like-gray-darker;
  border-radius: 8px;
  padding: 20px 80px 20px 20px;
  display: flex;
  // max-width: fit-content;
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
.tabs {
  margin: 20px 0 12px;
}
</style>
