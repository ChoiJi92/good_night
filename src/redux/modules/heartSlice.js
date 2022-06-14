import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./axios";


//middlewares
// export const loadHeartDB = (id) => {
//     return async function (dispatch) {
//       await instance.get(`/api/post/${id}/like`).then((response)=>{
//           console.log(response)
//       })
//     };
//   };

  export const createHeartDB = (content_id, user_name) => {
    return async function (dispatch, getState) {
      await instance
        .post(`/api/post/${content_id}/like`, {
          contentId:content_id ,
          nickName:user_name
        })
        .then((reponse) => {
            console.log('나는 좋아요생성리스폰스',reponse)
            
        //   dispatch(addHeart(reponse.data));
        });
    };
  };
  export const deleteHeartDB = (content_id, user_name) => {
    return async function (dispatch, getState) {
      console.log(content_id);
      console.log(user_name);
      await instance
        .delete(`/api/post/${content_id}/unlike`)
        .then((reponse) => {
          console.log("나는 좋아요삭제리스폰스", reponse);
        });
    };
  };


const contentSlice = createSlice({
    name: "content",
    initialState: {
      heart_list: [],
    },
    reducers: {
      loadHeart:(state,action) => {
            state.heart_list=action.payload
      },
      createHeart: (state, action) => {
        const index = state.content_list.findIndex(
          (v) => v.id === action.payload.id
        );
        state.content_list[index] = action.payload;
      },
      deleteHeart: (state, action) => {
        const index = state.content_list.findIndex(
          (v) => v.id === action.payload.id
        );
        state.content_list[index] = action.payload;
      },
    },
  });

  export const {
    loadContent,
    heartLoadContent,
    createContent,
    updateContent,
    addHeart,
    minusHeart,
  } = contentSlice.actions;
  export default contentSlice.reducer;
  