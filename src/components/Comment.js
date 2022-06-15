import styled from "@emotion/styled";
import { style } from "@mui/system";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentDB } from "../redux/modules/commentSlice";

const Comment = () => {
  const data = useSelector((state) => state.comment.comment_list);
  const user_name = localStorage.getItem('user_name') 
  const dispatch =useDispatch()

  return (
    <Container>
      {data.map((v) => (
        <List key={v.id}>
          <div className="nickname">{v.nickName}</div>
          <div className="comment">{v.comment}</div>
          <div className="date">{v.createAt}</div>
          {user_name === v.nickName ?
          <button onClick={()=> 
            dispatch(deleteCommentDB({
                contentId:v.contentId,
                commentId:v.commentId
            }))
        }>삭제</button>
        :
        <></>}
          
        </List>
      ))}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  /* margin: 0, auto; */
`;
const List = styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
height: 50px;
/* width: 90%; */
/* margin: 0 auto; */
.nickname {
    width: 10%;
}
.comment{
    width: 60%;
}
.date{
    width: 15%;
}
button{
    border: none;
      border-radius: 5px;
      background-color: #78909c;
      color: white;
      width: 60px;
      height: 50%;
}
`
export default Comment;
