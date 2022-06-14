import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import instance from "./axios";

export const loadCommentDB = (id) => {
  return async function (dispatch) {
    await instance.get(`/api/comment/${id}`).then((response) => {
      dispatch(loadComment(response.data));
    });
  };
};
export const createCommentDB = (data) => {
  return async function (dispatch) {
    await instance.post(`/api/comment/${data.contentId}`, data).then((response) => {
      console.log(response)
      dispatch(createComment(response.data));
    });
  };
};
export const deleteCommentDB = (data) => {
  return async function (dispatch){
    await instance.delete(`/api/comment/${data.contentId}/${data.commentId}`).then((response) => {
      console.log(response)
      dispatch(deleteComment(data.commentId))
    })
  }
}
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
    deleteComment: (state,action) =>{
      const new_comment = state.comment_list.filter(v => v.id !== action.payload )
      state.comment_list = new_comment
    }
  },
});

export const { loadComment, createComment,deleteComment } = commentSlice.actions;
export default commentSlice.reducer;