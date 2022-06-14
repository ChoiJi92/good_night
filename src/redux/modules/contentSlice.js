import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./axios";
//middlewares

export const loadContentDB = (page) => {
  return async function (dispatch, getState) {
    await instance
      // .get("/api/post/list/", { params: { _page: page, _limit: 4 } })
      .get("/api/post/list")
      .then((response) => {
        console.log(response.data);
        const data = getState().content.content_list;
       
        const new_data = [...data, ...response.data];
       console.log(new_data)
        dispatch(loadContent(new_data));
      });
  };
};

export const createContentDB = (data) => {
  console.log(data)
  return async function (dispatch) {
    await instance.post("/api/post", data).then((response) => {
      console.log(response);
      dispatch(createContent(response.data));
      window.location.replace('/')
    });
  };
};
export const updateContentDB = (data) => {
  return async function (dispatch) {
    console.log("수정하러왔어");
    console.log(data);
    await instance.put(`/api/post/${data.id}/modify`, data).then((response) => {
      dispatch(updateContent(response.data));
      window.location.replace('/')
      // console.log(response)
    });
  };
};
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
  },
  reducers: {
    loadContent: (state, action) => {
      state.content_list = action.payload;
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
  heartLoadContent,
  createContent,
  updateContent,
  deleteContent
} = contentSlice.actions;
export default contentSlice.reducer;
