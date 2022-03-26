import Food from '../types/food'

import INGREDIENTS from '../data/ingredients'

const foods: Food[] = [
  {
    name: 'ブロッコリー（花序）',
    imageUrl: 'https://3.bp.blogspot.com/-kUCoL5ijgWA/UkJMpwWHd0I/AAAAAAAAYQ4/qxVI_KDl1po/s800/broccoli.png',
    ingredients: [
      {
        ingredient: INGREDIENTS.folicAcid,
        contentAmount: 450,
        contentUnit: '㎍',
        unitAmount: '100g',
        recommendedWay: '水に溶けやすく熱に弱いという葉酸の性質を利用し、スープにして汁ごと食べたり、電子レンジで加熱したりするとより良い',
        note: 'adfasdfafdf',
        sourceUrl: ''
      }
    ]
  },
  {
    name: 'sample1',
    imageUrl: 'https://1.bp.blogspot.com/-NjjJTkZLHZU/YHDkS1jh9aI/AAAAAAABdnY/i1gTKezrqpgjwNWYFFMnUWCrrlnl_58uQCNcBGAsYHQ/s579/vegetable_cabbage_leaf.png',
    ingredients: [
      {
        ingredient: INGREDIENTS.sample1,
        contentAmount: 450,
        contentUnit: '㎍',
        unitAmount: '100g',
        recommendedWay: '水に溶けやすく熱に弱いという葉酸の性質を利用し、スープにして汁ごと食べたり、電子レンジで加熱したりするとより良い',
        note: 'あいうえおあいうえおあいうえお、あいうえおあいうえおあいうえお。',
        sourceUrl: 'https://www.elevit.jp/nutrition/folic-acid/foodlist/'
      },
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
