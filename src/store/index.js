import { configureStore } from "@reduxjs/toolkit";
import task from "./reducers/task";

export default configureStore({
  reducer: { task },
});
