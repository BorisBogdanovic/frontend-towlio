import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
  search: string;
}

const initialState: ClientState = {
  search: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = clientSlice.actions;
export default clientSlice.reducer;
