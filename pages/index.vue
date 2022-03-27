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
            v-for="option in timingCheckboxes"
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
      <TabMenu
        :model="tabs"
        :active-index="activeTabIndex"
        @tab-change="event => activeTabIndex = event.index"
      />
    </div>
    <div class="table">
      <DataTable :value="filteredFoods">
        <Column
          header="名前"
          style="width: 300px; max-width: 300px;"
        >
          <template #body="slotProps">
            <div class="columnName">
              <img
                class="columnName_image"
                :src="slotProps.data.imageUrl"
                :alt="slotProps.data.name"
              />
              <i :class="`columnName_thumbsIcon pi pi-thumbs-${isDesirableFood(slotProps.data) ? 'up' : 'down'}`"></i>
              <p>{{ slotProps.data.name }}</p>
            </div>
          </template>
        </Column>
        <Column header="成分">
          <template #body="slotProps">
            <div
              class="columnIngredient"
            >
              <ul
                class="columnIngredient_ingredientList"
                v-for="i in slotProps.data.ingredients"
              >
                <li class="columnIngredient_ingredientItem">
                  <h3 class="columnIngredient_ingredientHeading">
                    <i :class="`columnIngredient_thumbsIcon pi pi-thumbs-${isDesirableFood(slotProps.data) ? 'up' : 'down'}`"></i>
                    {{ i.ingredient.name }}
                  </h3>
                  <ul>
                    <li class="columnIngredient_detailItem">
                      {{ `${i.contentAmount}${i.contentUnit} / ${i.unitAmount}（目標${i.ingredient.targetAmount}${i.ingredient.unit}）` }}
                    </li>
                    <li class="columnIngredient_detailItem">
                      効果：{{ i.ingredient.effect }}
                    </li>
                    <li
                      class="columnIngredient_detailItem"
                      v-if="i.recommendedWay"
                    >
                      おすすめの食べ方：{{ i.recommendedWay }}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </template>
        </Column>
        <Column
          header="時期"
          style="width: 130px; max-width: 130px;"
        >
          <template #body="slotProps">
            <div class="columnTiming">
              <ul
                class="columnTiming_timingList"
                v-for="timing in getTimingList(slotProps.data)"
              >
                <li class="columnTiming_timingListItem">
                  <i :class="`columnTiming_thumbsIcon pi pi-thumbs-${isDesirableFood(slotProps.data) ? 'up' : 'down'}`"></i>
                  {{ timing.label }}
                </li>
              </ul>
            </div>
          </template>
        </Column>
        <Column
          header="備考"
          style="width: 200px; max-width: 200px;"
        >
          <template #body="slotProps">
            <div class="columnNote">
              <ul
                class="columnNote_noteList"
                v-for="ingredient in slotProps.data.ingredients"
              >
                <li
                  class="columnNote_noteListItem"
                  v-if="ingredient.note"
                >
                  {{ ingredient.note }}
                </li>
              </ul>
            </div>
          </template>
        </Column>
        <Column
          header="出典URL"
          style="width: 200px; max-width: 200px;"
        >
          <template #body="slotProps">
            <div class="columnSource">
              <ul
                class="columnSource_sourceList"
                v-for="ingredient in slotProps.data.ingredients"
              >
                <li
                  class="columnSource_sourceListItem"
                  v-if="ingredient.sourceUrl"
                >
                  <a
                    class="columnSource_sourceLink"
                    :href="ingredient.sourceUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ ingredient.sourceUrl }}
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AtomsInputText from '../components/atoms/InputText.vue'
import AtomsCheckbox from '../components/atoms/Checkbox.vue'
import DESIRABILITY from '../constants/desirability'
import TIMING from '../constants/timing'
import ingredients from '../data/ingredients'
import TimingCheckbox from '../types/ui/timingCheckbox'
import Tab from '../types/ui/tab'
import Food from '../types/food'
import Ingredient from '../types/ingredient'
import useFilteredFoods from '../composables/use-filtered-foods'

reactive<Object>(DESIRABILITY)
const ingredientsMaster = ref<Ingredient[]>(Object.values(ingredients))

const timingCheckboxes: TimingCheckbox[] = [
  { timing: TIMING.early, label: '妊娠初期' },
  { timing: TIMING.middle, label: '妊娠中期' },
  { timing: TIMING.late, label: '妊娠後期' },
  { timing: TIMING.milk, label: '授乳期' }
]

const tabs: Tab[] = [
  { desirability: DESIRABILITY.all, label: 'すべて' },
  { desirability: DESIRABILITY.betterEat, label: '食べよう', icon: 'pi pi-fw pi-thumbs-up' },
  { desirability: DESIRABILITY.bestAvoided, label: '避けよう', icon: 'pi pi-fw pi-thumbs-down' }
]

const {
  inputText,
  checkedIngredients,
  checkedTimings,
  activeTabIndex,
  filteredFoods
} = useFilteredFoods(tabs)

const isDesirableFood = (food: Food): boolean => {
  return food.ingredients.some(i => i.ingredient.desirability === DESIRABILITY.betterEat)
}

const getTimingList = (food: Food): TimingCheckbox[] => {
  const timingList = food.ingredients
    .map(i => i.ingredient.timing)
    .reduce((previous, current) => previous.concat(current))

  return timingCheckboxes.filter(t => timingList.includes(t.timing))
}
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
.columnName {
  display: flex;
  align-items: center;
  &_image {
    width: 48px;
  }
  &_thumbsIcon {
    margin: 0 4px 0 12px;
  }
  // PrimeVueのクラス
  .pi-thumbs-up {
    color: $color-quiet-red-darker;
  }
  .pi-thumbs-down {
    color: $color-dark-blue;
  }
}
.columnIngredient {
  // PrimeVueのクラス
  .pi-thumbs-up {
    color: $color-quiet-red-darker;
  }
  .pi-thumbs-down {
    color: $color-dark-blue;
  }
  &_ingredientList {
    & + & {
      margin: 8px 0 0;
    }
  }
  &_ingredientHeading {
    font-size: 14px;
  }
  &_detailItem {
    list-style-type: disc;
    margin: 0 0 0 40px;
    font-size: 14px;
  }
}
.columnTiming {
  &_thumbsIcon {
    font-size: 13px;
  }
  // PrimeVueのクラス
  .pi-thumbs-up {
    color: $color-quiet-red-darker;
  }
  .pi-thumbs-down {
    color: $color-dark-blue;
  }
  &_timingListItem {
    font-size: 14px;
  }
}
.columnNote {
  &_noteList {
    list-style-type: disc;
  }
  &_noteListItem {
    margin: 8px 0 0 12px;
    word-break: break-all;
    font-size: 14px;
  }
}
.columnSource {
  &_sourceList {
    list-style-type: disc;
  }
  &_sourceList {
    margin: 8px 0 0 12px;
  }
  &_sourceLink {
    @include link-effect;
    color: $color-link-blue;
    word-break: break-all;
    font-size: 14px;
  }
}

/* UIライブラリPrimeVueのスタイル上書き */
// table
::v-deep(.p-datatable .p-datatable-thead tr th:first-child) {
  border-top-left-radius: 8px;
}
::v-deep(.p-datatable .p-datatable-thead tr th:last-child) {
  border-top-right-radius: 8px;
}
::v-deep(.p-datatable .p-datatable-tbody tr:last-child td:first-child) {
  border-bottom-left-radius: 8px;
}
::v-deep(.p-datatable .p-datatable-tbody tr:last-child td:last-child) {
  border-bottom-right-radius: 8px;
}
::v-deep(.p-datatable .p-datatable-tbody tr td) {
  vertical-align: middle;
}
// タブの色
::v-deep(.p-tabmenu .p-tabmenu-nav),
::v-deep(.p-tabmenu .p-tabmenu-nav .p-menuitem-link),
::v-deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link),
::v-deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem:not(.p-highlight):not(.p-disabled):hover .p-menuitem-link) {
  background: $color-quiet-red-lighter;
  border-bottom-color: $color-red-like-gray;
}
::v-deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link) {
  color: $color-quiet-red-darker;
  border-color: $color-quiet-red-darker;
}
::v-deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:not(.p-disabled):focus) {
  box-shadow: inset 0 0 0 0.2rem $color-quiet-red;
}
::v-deep(.p-tabmenuitem) {
  @include link-effect;
}
// タブのCSSが初期表示時に一瞬崩れるのを修正する
::v-deep(.p-tabmenu .p-tabmenu-nav) {
  display: flex;
}
::v-deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link) {
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
