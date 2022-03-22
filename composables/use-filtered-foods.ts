import { ref, computed } from 'vue'
import DESIRABILITY from '../constants/desirability'
import TIMING from '../constants/timing'
import Timimg from '../types/timing'
import Food from '../types/food'
import Tab from '../types/ui/tab'
import foods from '../data/foods'
import intersection from 'lodash.intersection'

const useFilteredFoods = (tabs: Tab[]) => {
  const inputText = ref<string>('')
  const checkedTiming = ref<Timimg[]>([...Object.values(TIMING)])
  const activeTabIndex = ref<number>(0)

  const filteredFoods = computed<Food[]>(() => {
    let filtered: Food[] = []
    // タブで絞り込み
    filtered = tabs[activeTabIndex.value].desirability === DESIRABILITY.all
      ? foods
      : foods.filter(
        f => f.ingredients.some(
          i => i.ingredient.desirability === tabs[activeTabIndex.value].desirability
        )
      )
    // 入力テキストで絞り込み（食材名、栄養素名）
    filtered = inputText.value === ''
      ? filtered
      : filtered.filter(f => {
          return [f.name, ...f.ingredients.map(i => i.ingredient.name)]
            .some(n => n.includes(inputText.value))
        })
    // 時期で絞り込み
    filtered = filtered
      .filter(f => f.ingredients.some(i => intersection(i.ingredient.timing, checkedTiming.value).length))
  
    return filtered
  })

  return {
    inputText,
    checkedTiming,
    activeTabIndex,
    filteredFoods
  }
}

export default useFilteredFoods
