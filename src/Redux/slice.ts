import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'editPost',
  initialState: {
    value: false,
  },
  reducers: {
    editPost: (state, action: PayloadAction<boolean>) => {
       state.value=action.payload;
    },
  },
});

export const { actions, reducer } = slice;
