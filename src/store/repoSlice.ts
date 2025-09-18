// src/store/repoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repo } from "../models/Repo";

interface RepoState {
  selectedRepo: Repo | null;
}

const initialState: RepoState = {
  selectedRepo: null,
};

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setSelectedRepo(state:RepoState, action: PayloadAction<Repo>) {
      state.selectedRepo = action.payload;
    },
    clearSelectedRepo(state:RepoState) {
      state.selectedRepo = null;
    },
  },
});

export const { setSelectedRepo, clearSelectedRepo } = repoSlice.actions;
export default repoSlice.reducer;
