import { createSlice } from "@reduxjs/toolkit";

export const loading = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = loading.actions;

export default loading.reducer;
