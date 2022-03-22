<template>
  <div>
    <div>
      <h2>食材名 / 栄養素名で絞り込み:</h2>
      <InputText type="text" v-model="inputText" />
    </div>
    <div>
      <h2>時期で絞り込み:</h2>
      <div v-for="choice in timingCheckboxes">
        <Checkbox :id="`timing-${choice.timing}`" name="timing" :value="choice.timing" v-model="checkedTiming" />
        <label :for="`timing-${choice.timing}`">{{ choice.name }}</label>
      </div>
    </div>
    <div>
      <TabMenu
        :model="tabs"
        :active-index="activeTabIndex"
        @tab-change="event => activeTabIndex = event.index"
      />
    </div>
    <ul>
      <li v-for="food in filteredFoods" style="border-bottom: 1px solid gray">
        <dl>
          <dt>食材名</dt>
          <dd>{{ food.name }}</dd>
          <div v-for="ingredient in food.ingredients">
            <dt>栄養素名</dt>
            <dd>{{ ingredient.ingredient.name }}</dd>
            <dt>摂取区分</dt>
            <dd>{{ ingredient.ingredient.desirability === DESIRABILITY.betterEat ? '食べた方が良い' : '避けた方が良い' }}</dd>
          </div>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import InputText from 'primevue/inputtext/InputText.vue'
import Checkbox from 'primevue/checkbox/Checkbox.vue'
import TabMenu from 'primevue/tabmenu/TabMenu.vue'
import DESIRABILITY from '../constants/desirability'
import TIMING from '../constants/timing'
import Tab from '../types/ui/tab'
import useFilteredFoods from '../composables/use-filtered-foods'

export default defineComponent({
  components: {
    InputText,
    Checkbox,
    TabMenu
  }
})
</script>

<script setup lang="ts">
reactive<Object>(DESIRABILITY)

const timingCheckboxes = [
  { timing: TIMING.early, name: '妊娠初期' },
  { timing: TIMING.middle, name: '妊娠中期' },
  { timing: TIMING.late, name: '妊娠後期' },
  { timing: TIMING.milk, name: '授乳期' }
]

const tabs: Tab[] = [
  { label: 'すべて', desirability: DESIRABILITY.all },
  { label: '食べた方が良いもの', desirability: DESIRABILITY.betterEat },
  { label: '食べない方が良いもの', desirability: DESIRABILITY.bestAvoided }
]

const { inputText, checkedTiming, activeTabIndex, filteredFoods } = useFilteredFoods(tabs)
</script>

<style lang="scss" scoped>
// FIXME 仮
dt {
  color: gray;
}
// UIライブラリPrimeVUEの、タブのCSSが初期表示時に一瞬崩れるのを修正する
::v-deep(.p-tabmenu .p-tabmenu-nav) {
  display: flex;
}
::v-deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link) {
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
