<template>
  <div>
    <OrganismsConditionList
      v-model:inputText="inputText"
      v-model:checkedIngredients="checkedIngredients"
      v-model:checkedTimings="checkedTimings"
    />
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
</style>
