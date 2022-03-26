import EachFoodIngredient from '../types/EachFoodIngredient'

export default interface Food {
  name: string;
  imageUrl: string;
  ingredients: EachFoodIngredient[];
}
