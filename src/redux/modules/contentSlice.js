import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./axios";
//middlewares

export const loadContentDB = (page) => {
  return async function (dispatch, getState) {
    await instance
      .get("/api/post/list/", { params: { _page: page, _limit: 4 } })
      .then((response) => {
        console.log(response.data);
        const data = getState().content.content_list;
        console.log('나는데이터',data)
        const new_data = [...data, ...response.data];
        console.log(new_data);
        dispatch(loadContent(new_data));
      });
  };
};

export const createContentDB = (data) => {
  return async function (dispatch) {
    await instance.post("/api/post", data).then((response) => {
      console.log(response);
      dispatch(createContent(response.data));
    });
  };
};
export const updateContentDB = (data) => {
  return async function (dispatch) {
    console.log("수정하러왔어");
    console.log(data);
    await instance.put(`/api/post/${data.id}/modify`, data).then((response) => {
      dispatch(updateContent(response.data));
      // console.log(response)
    });
  };
};
export const deleteContentDB = () => {
  return async function (dispatch) {};
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
  },
});

export const {
  loadContent,
  heartLoadContent,
  createContent,
  updateContent,
} = contentSlice.actions;
export default contentSlice.reducer;
