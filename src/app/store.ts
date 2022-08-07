import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '~/reducers/ticketsSlice';
import filtersReducer from '~/reducers/filtersSlice';
import localeReducer from '~/reducers/localeSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filtersReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
