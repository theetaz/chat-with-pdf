"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setSummary: "",
  setUrlParam: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSummary: (state, action) => {
      state.setSummary = action.payload;
    },
    setUrlParam: (state, action) => {
      state.setUrlParam = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSummary, setUrlParam } = dataSlice.actions;

export default dataSlice.reducer;
