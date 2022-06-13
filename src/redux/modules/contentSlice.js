import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./axios";
//middlewares

export const loadContentDB = (page) => {
  return async function (dispatch, getState) {
    await instance
      .get("/api/post/list", { params: { _page: page, _limit: 4 } })
      .then((response) => {
        console.log(response.data.contents);
        const data = getState().content.content_list;
        console.log('나는데이터',data)
        const new_data = [...data, ...response.data.contents];
        console.log(new_data);
        dispatch(loadContent(new_data));
      });
  };
};

export const heartLoadContentDB = () => {
  return async function (dispatch) {
    await instance.get("/content");
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
export const addHeartDB = (content_id, user_id) => {
  return async function (dispatch, getState) {
    console.log(content_id);
    console.log(user_id);
    const content = getState().content.content_list.filter(
      (v) => v.id === Number(content_id)
    );
    const new_heart = content[0].heart_count;
    const heart = [...new_heart, user_id];
    await instance
      .patch(`/content/${content_id}`, {
        heart_count: heart,
      })
      .then((reponse) => {
        dispatch(addHeart(reponse.data));
      });
  };
};
export const minusHeartDB = (content_id, user_id) => {
  return async function (dispatch, getState) {
    console.log(content_id);
    console.log(user_id);
    const content = getState().content.content_list.filter(
      (v) => v.id === Number(content_id)
    );
    const new_heart = content[0].heart_count.filter((v) => v !== user_id);
    console.log(new_heart);
    await instance
      .patch(`/content/${content_id}`, {
        heart_count: new_heart,
      })
      .then((reponse) => {
        console.log("나는 리스폰스", reponse);
        dispatch(minusHeart(reponse.data));
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
    addHeart: (state, action) => {
      const index = state.content_list.findIndex(
        (v) => v.id === action.payload.id
      );
      state.content_list[index] = action.payload;
    },
    minusHeart: (state, action) => {
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
