import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentDB, loadCommentDB } from "../redux/modules/commentSlice";
import Comment from "./Comment";
import { BsChat } from "react-icons/bs";
import { useParams } from "react-router-dom";
const CommentList = ({id}) => {
  const data = useSelector((state) => state.comment.comment_list);
 
  return (
   
    <Container>
      {data.map((v) => (
        <Comment key={v.id} data={v}></Comment>
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
export default CommentList;
