"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setSummary: "",
  setTest: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSummary: (state, action) => {
      state.setSummary = action.payload;
    },
    setTest: (state, action) => {
      state.setTest = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSummary, setTest } = dataSlice.actions;

export default dataSlice.reducer;
