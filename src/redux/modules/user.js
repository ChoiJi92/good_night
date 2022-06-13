import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// //미들웨어
// //Create
// export const createUserDB = (user_data) => {
//   return async function (dispatch) {
//     console.log(user_data);
//     await axios
//       .post("URL", user_data)
//       .then((response) => {
//         window.alert(response.data.result);
//       })
//       .catch(function (error) {
//         console.log("error!!!!!!", error.response.data);
//       });
//     await dispatch(createUser(user_data));
//   };
// };

const userSlice = createSlice({
  nickName: "최지",
  initialState: {
    list: [],
  },

  reducers: {
    // 예시용
    // changeName: (state, action) => {
    //   state.name = action.payload;
    // },
    loadUser: (state, action) => {},
    createUser(state, action) {
      state.list.push(action.payload);
    },
    // updateUser(state, action) {},
    // removeUser(state, action) {},
  },
});

export const boardActions = userSlice.actions;
export const { loadUser, createUser, updateUser, removeUser } =
  userSlice.actions;
export default userSlice.reducer;