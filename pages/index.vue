<template>
  <div>
    <OrganismsConditionList
      v-model:inputText="inputText"
      v-model:checkedIngredients="checkedIngredients"
      v-model:checkedTimings="checkedTimings"
    />
    <MoleculesTabMenu
      class="tabs"
      :tabs="TABS"
      v-model:activeTabIndex="activeTabIndex"
    />
    <OrganismsFoodsTable :foods="filteredFoods" />
    <p class="disclaimer">※食材データは手動で随時追加していくため、まだ不十分な点はご了承ください。</p>
  </div>
</template>

<script setup lang="ts">
import MoleculesTabMenu from '../components/molecules/TabMenu.vue'
import OrganismsConditionList from '../components/organisms/ConditionList.vue'
import OrganismsFoodsTable from '../components/organisms/FoodsTable.vue'
import TABS from '../constants/ui/tabs'
import useFilteredFoods from '../composables/useFilteredFoods'

const {
  inputText,
  checkedIngredients,
  checkedTimings,
  activeTabIndex,
  filteredFoods
} = useFilteredFoods()
</script>

<style lang="scss" scoped>
.tabs {
  margin: 20px 0 12px;
}
.disclaimer {
  margin: 12px 0 0;
  font-size: 12px;
}
</style>
