import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import instance from "./axios";


//middlewares
export const createUserDB = (data) => {
  return async function (dispatch) {
    
    await instance
      .post("/api/user/signup", data)
      .then((response) => {
        window.alert("회원가입을 축하합니다!");
        window.location.replace('/login')
      })
      .catch((error) => {
        if (error.response.status === 400) {
          window.alert("중복된 이메일 혹은 닉네임이 존재합니다!!");
        }
      });
  };
};
export const loginUserDB = (data) => {
  return async function (dispatch) {
    await instance.post("/api/user/login", data).then((response) => {
      // localStorage에 토큰 저장
      localStorage.setItem("token", response.data.token);
      window.location.replace('/')
    }).catch((error) => {
      window.alert(error.response.data.errorMessage)
    });
    
}
}
export const loadUserDB = () => {
  return async function (dispatch) {
    await instance.get("/api/user/signup/me").then((response) => {
      // localStorage에 유저 이름 , 이메일 저장
      localStorage.setItem("user_name", response.data.nickName);
      localStorage.setItem("user_id", response.data.userId);
      dispatch(loadUser(response.data));
      
    });
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user_list: [],
  },
  reducers: {
    loadUser: (state, action) => {
      state.user_list=action.payload;
    },
  },
});

export const boardActions = userSlice.actions;
export const { loadUser, createUser, updateUser, removeUser } =
  userSlice.actions;
export default userSlice.reducer;
