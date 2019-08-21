import CategoriesActionTypes from './categories.types';

const INITIAL_STATE = {
  categories: null
};

const CategoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesActionTypes.SAVE_CATEGORIES:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default CategoriesReducer;