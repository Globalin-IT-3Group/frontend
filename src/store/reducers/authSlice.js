import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: "",
  nickname: "",
  profileImage: "",
  signupType: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, nickname, profileImage, signupType } = action.payload;
      state.id = id;
      state.email = email;
      state.nickname = nickname;
      state.profileImage = profileImage;
      state.signupType = signupType;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.id = null;
      state.email = "";
      state.nickname = "";
      state.profileImage = "";
      state.signupType = "";
      state.isLoggedIn = false;
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    updateNickname: (state, action) => {
      state.nickname = action.payload;
    },
  },
});

export const { setUser, logout, updateNickname, updateProfileImage } =
  authSlice.actions;
export default authSlice.reducer;
