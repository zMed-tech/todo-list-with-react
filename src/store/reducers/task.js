import { createSlice } from "@reduxjs/toolkit";

export const task = createSlice({
  name: "task",
  initialState: {
    openEdit: false,
    id: null,
  },
  reducers: {
    setOpenEdit(state, { payload }) {
      state.openEdit = payload;
    },

    setId: (state, { payload }) => {
      state.id = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenEdit, setId } = task.actions;

export default task.reducer;
