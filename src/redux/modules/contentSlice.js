import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import { dblClick } from "@testing-library/user-event/dist/click";
import axios from "axios";
import instance from "./axios";

//middlewares
// 컨텐츠 로드
export const loadContentDB = (page) => {
  return async function (dispatch, getState) {
    await instance
      .get("/api/post/list/", { params: { page: page} })
      // .get("/api/post/list")
      .then((response) => {
        const data = getState().content.content_list;
        const new_data = [...data, ...response.data];
        dispatch(loadContent(new_data));
      });
  };
};
export const loadDetailContentDB = (id) => {
  return async function (dispatch){
    await instance.get(`/api/post/list/${id}`).then((response)=>{
      dispatch(loadDetailContent(response.data))
    })
  }
}
// 컨텐츠 생성
export const createContentDB = (data) => {
  return async function (dispatch) {
    await instance.post("/api/post", data).then((response) => {
      console.log(response);
      dispatch(createContent(response.data));
      window.location.replace('/')
    });
  };
};
// 컨텐츠 수정 
export const updateContentDB = (data) => {
  return async function (dispatch) {
    await instance.put(`/api/post/${data.id}/modify`, data).then((response) => {
      dispatch(updateContent(response.data));
      window.location.replace('/')
    });
  };
};
// 컨텐츠 삭제
export const deleteContentDB = (data) => {
  return async function (dispatch) {
    await instance.delete(`/api/post/${data}/delete`).then((response) => {
      console.log('삭제리스폰스',response.data)
      dispatch(deleteContent(data));
      window.location.replace('/')
    });

  };
};

const contentSlice = createSlice({
  name: "content",
  initialState: {
    content_list: [],
    detail_list:[]
  },
  reducers: {
    loadContent: (state, action) => {
      state.content_list = action.payload;
    },
    loadDetailContent:(state,action) => {
      state.detail_list=action.payload
    },
    heartLoadContent: (state, action) => {
      state.content_list = action.payload;
    },
    createContent: (state, action) => {
      state.content_list.push(action.payload);
    },
    updateContent: (state, action) => {
      const index = state.content_list.findIndex(
        (v) => v.id === action.payload.id
      );
      state.content_list[index] = action.payload;
    },
    deleteContent: (state, action) => {
      const new_content = state.content_list.filter((v,i) => i !== action.payload);
      state.content_list = new_content
    },
  },
});

export const {
  loadContent,
  loadDetailContent,
  heartLoadContent,
  createContent,
  updateContent,
  deleteContent
} = contentSlice.actions;
export default contentSlice.reducer;
