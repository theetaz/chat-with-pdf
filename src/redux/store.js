import { configureStore } from "@reduxjs/toolkit";
import dataslice from "@/feature/dataslice";

export default configureStore({
  reducer: {
    data: dataslice,
  },
});
