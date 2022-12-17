import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '~/app/store';
import { Tag } from '~/model/enums';

type availableFilters = 'description' | 'tags' | 'comments';

interface FiltersStore {
  filters: {
    description?: string;
    tags?: Tag[];
    comments?: boolean;
  };
}

const initialState: FiltersStore = {
  filters: {},
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ value: any; field: availableFilters }>,
    ) => {
      state.filters[action.payload.field] = action.payload.value;
    },
    resetFilter: (
      state,
      action: PayloadAction<{ field: availableFilters }>,
    ) => {
      delete state.filters[action.payload.field];
    },
  },
});

export const filtersSelector = createSelector(
  (state: RootState) => state.filters.filters,
  (items) => items,
);

export const { setFilter, resetFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
