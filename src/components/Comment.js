import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentDB,
  loadCommentDB,
  updateCommentDB,
} from "../redux/modules/commentSlice";
import moment from "moment";


const Comment = ({ data }) => {
  const user_name = localStorage.getItem("user_name");
  const dispatch = useDispatch();
  const [isedit, setIsedit] = useState(false);
  const [input, setInput] = useState(data.comment);
  const [date, setDate] = useState(data.createAt);
  
  // comment 수정시 change 감지
  const onChange = (e) => {
    setInput(e.target.value);
  };

  // comment 수정
  const updateComment = () => {
    dispatch(
      updateCommentDB({
        contentId: data.contentId,
        commentId: data.commentId,
        comment: input,
        nickName: user_name,
        createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    setDate(moment().format("YYYY-MM-DD HH:mm:ss"));
    setIsedit(false);
  };
  // comment 수정시 엔터키로 등록가능하게 구현
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      updateComment();
    }
  };
  return ( 
    <List key={data.id}>
      <div className="nickname">{data.nickName}</div>
      {!isedit ? (
        <>
          <div className="comment">{input}</div>
          <div className="date">{date}</div>
          {user_name === data.nickName ? (
            <Btn>
              <button
                onClick={() => {
                  setIsedit(true);
                }}
              >
                수정
              </button>
              <button
                onClick={() =>
                  dispatch(
                    deleteCommentDB({
                      contentId: data.contentId,
                      commentId: data.commentId,
                    })
                  )
                }
              >
                삭제
              </button>
            </Btn>
          ) : (
            <Btn></Btn>
          )}
        </>
      ) : (
        <>
          <input
            style={{ width: "75%", height: "45%" }}
            onChange={onChange}
            value={input}
            onKeyPress={onKeyPress}
            autoFocus
          ></input>
          <Btn>
            <button
              onClick={() => {
                setIsedit(false);
              }}
            >
              취소
            </button>
            <button onClick={updateComment}>등록</button>
          </Btn>
        </>
      )}
    </List>
  )
            
};
const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  /* width: 90%; */
  /* margin: 0 auto; */
  .nickname {
    width: 7%;
  }
  .comment {
    width: 60%;
  }
  .date {
    width: 15%;
  }
  /* button{
    border: none;
      border-radius: 5px;
      background-color: #78909c;
      color: white;
      width: 60px;
      height: 60%;
} */
`;
const Btn = styled.div`
  width: 10%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  & > * {
    border: none;
    border-radius: 5px;
    background-color: #F5BD25;
    width: 50%;
    height: 70%;
    margin-left: 10px;
    cursor: pointer;
  }
`;
export default Comment;
