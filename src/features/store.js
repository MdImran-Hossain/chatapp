import { configureStore } from "@reduxjs/toolkit";
import friendSlice from "./slice/friendSlice";
export default configureStore({
  reducer: {
    friend: friendSlice,
  },
});