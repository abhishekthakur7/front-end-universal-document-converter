import { createSelector } from 'reselect';

const selectCategories = state =>  state.categories;

export const selectCurrentExtensionType = createSelector(
    [selectCategories],
    category => category.extensionType
);