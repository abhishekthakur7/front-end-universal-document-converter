import CategoriesActionTypes from './categories.types';

export const saveCategories = (categories) => ({
    type: CategoriesActionTypes.SAVE_CATEGORIES,
    payload: categories
  });
  