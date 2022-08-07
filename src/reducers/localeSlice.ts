import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '~/app/store';
import i18n, { languageList } from '~/i18n';

interface FiltersStore {
  locale: any;
}

const initialState: FiltersStore = {
  locale: i18n.language,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<{ language: any }>) => {
      const lang = action.payload.language.toLowerCase();
      i18n.changeLanguage(lang);
    },
  },
});

export const localeSelector = createSelector(
  (state: RootState) => state.locale.locale,
  (items) => items,
);

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
