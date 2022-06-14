import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import instance from "axios";

export const loadCommentDB = () => {
  return async function (dispatch) {
    await instance.get("/api/comment/:contentId").then((response) => {
      dispatch(loadComment(response.data));
    });
  };
};
export const createCommentDB = (data) => {
  return async function (dispatch) {
    await instance.post("/api/comment/:contentId", data).then((response) => {
      dispatch(createComment(response.data));
    });
  };
};

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment_list: [],
  },
  reducers: {
    loadComment: (state, action) => {
      state.comment_list = action.payload;
    },
    createComment: (state, action) => {
      state.comment_list.push(action.payload);
    },
  },
});

export const { loadComment, createComment } = commentSlice.actions;
export default commentSlice.reducer;
