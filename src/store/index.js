import { configureStore } from "@reduxjs/toolkit";
import task from "./reducers/task";
import loading from "./reducers/loading";

export default configureStore({
  reducer: { task, loading },
});
