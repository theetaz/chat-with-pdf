"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setSummary: "",
  setUrlParam: "",
  setReloadChatHistory: false,
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
    setReloadChatHistory: (state, action) => {
      state.setReloadChatHistory = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSummary, setUrlParam , setReloadChatHistory } = dataSlice.actions;

export default dataSlice.reducer;
