import Ingredient from '../types/ingredient'

import INGREDIENT from '../constants/ingredient'
import DESIRABILITY from '../constants/desirability'
import TIMING from '../constants/timing'

const folicAcid: Ingredient = {
  code: INGREDIENT.folicAcid,
  name: '葉酸',
  desirability: DESIRABILITY.betterEat,
  timing: [
    TIMING.early,
    TIMING.middle,
    TIMING.late,
    TIMING.milk
  ],
  effect: 'あああ',
  targetAmount: 240,
  unit: 'μg/日',
  note: '',
  sourceUrl: 'https://www.elevit.jp/nutrition/folic-acid/foodlist/'
}

const sample1: Ingredient = {
  code: INGREDIENT.folicAcid,
  name: 'sampleIngredient1',
  desirability: DESIRABILITY.bestAvoided,
  timing: [
    TIMING.early,
    TIMING.middle
  ],
  effect: 'あああ',
  targetAmount: 240,
  unit: 'μg/日',
  note: '',
  sourceUrl: 'https://www.elevit.jp/nutrition/folic-acid/foodlist/'
}

export default {
  folicAcid,
  sample1
}
