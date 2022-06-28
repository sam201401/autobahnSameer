import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './slice';

const store = configureStore({
  reducer: {
    editPost: reducer,
  },
});

export default store;
