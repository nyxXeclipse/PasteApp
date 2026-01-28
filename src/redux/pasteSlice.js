import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // check if title already exists
      const titleExists = state.pastes.some(
        (item) => item.title.toLowerCase() === paste.title.toLowerCase(),
      );

      // check if content already exists
      const contentExists = state.pastes.some(
        (item) => item.content === paste.content,
      );

      if (titleExists) {
        toast.error("Paste with this title already exists");
        return;
      }

      if (contentExists) {
        toast.error("Paste with same content already exists");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste updated");
      }
    },

    resetAllPastes: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
