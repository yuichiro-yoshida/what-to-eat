import Food from '../types/food'

import INGREDIENTS from '../data/ingredients'

const foods: Food[] = [
  {
    name: 'ブロッコリー（花序）',
    ingredients: [
      {
        ingredient: INGREDIENTS.folicAcid,
        contentAmount: 450,
        contentUnit: '㎍',
        unitAmount: '100g',
        recommendedWay: '水に溶けやすく熱に弱いという葉酸の性質を利用し、スープにして汁ごと食べたり、電子レンジで加熱したりするとより良い',
        note: '',
        sourceUrl: ''
      }
    ]
  },
  {
    name: 'sample1',
    ingredients: [
      {
        ingredient: INGREDIENTS.sample1,
        contentAmount: 450,
        contentUnit: '㎍',
        unitAmount: '100g',
        recommendedWay: '水に溶けやすく熱に弱いという葉酸の性質を利用し、スープにして汁ごと食べたり、電子レンジで加熱したりするとより良い',
        note: 'dfjoasdfjaosdjfoiasdjfoaisfaosdfjasoifjaosidfjaoisf',
        sourceUrl: 'https://www.elevit.jp/nutrition/folic-acid/foodlist/'
      }
    ]
  }
]

export default foods
