<template>
  <DataTable :value="foods">
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
                  含有量：{{ `${i.contentAmount}${i.contentUnit} / ${i.unitAmount}（目標${i.ingredient.targetAmount}${i.ingredient.unit}）` }}
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
</template>

<script lang="ts">
export default defineComponent({
  name: 'OrganismsFoodsTable'
})
</script>

<script lang="ts" setup>
import { PropType } from 'vue'
import TIMING_CHECKBOXES from '../../constants/ui/timingCheckboxes'
import DESIRABILITY from '../../constants/desirability'
import TimingCheckbox from '../../types/ui/timingCheckbox'
import Food from '../../types/food'

defineProps({
  foods: Object as PropType<Food[]>
})

const isDesirableFood = (food: Food): boolean => {
  return food.ingredients.some(i => i.ingredient.desirability === DESIRABILITY.betterEat)
}

const getTimingList = (food: Food): TimingCheckbox[] => {
  const timingList = food.ingredients
    .map(i => i.ingredient.timing)
    .reduce((previous, current) => previous.concat(current))

  return TIMING_CHECKBOXES.filter(t => timingList.includes(t.timing))
}
</script>

<style lang="scss">
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

.p-datatable .p-datatable-thead tr th:first-child {
  border-top-left-radius: 8px;
}
.p-datatable .p-datatable-thead tr th:last-child {
  border-top-right-radius: 8px;
}
.p-datatable .p-datatable-tbody tr:last-child td:first-child {
  border-bottom-left-radius: 8px;
}
.p-datatable .p-datatable-tbody tr:last-child td:last-child {
  border-bottom-right-radius: 8px;
}
.p-datatable .p-datatable-tbody tr td {
  vertical-align: middle;
}
</style>
