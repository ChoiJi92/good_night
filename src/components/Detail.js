import styled from "styled-components";
import React, { useState } from "react";
import { deleteContentDB } from "../redux/modules/contentSlice";
import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const params = useParams();
  const data = useSelector((state) => state.content.content_list);
  const navigate = useNavigate()
  // const commentData = useSelector((state) => comments);
  // const comments = useSelector((state) => state.comment.comment_list);
  console.log(params)
  const x = params.index;
  console.log(x, data);

  //comment 값 가져오기
  const changeComment = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  return (
    <>
      <DetailArticleOverview>
        <DetailArticle>
          <div key={data[x].contentId}>
            {/* <div>{data[x].date}</div> */}
            <div>{data[x].nickName}</div>
            <div>{data[x].title}</div>
            <img src={data[x].imageUrl} alt="이미지"></img>
          </div>

          {/* <Link to={"/"}> */}
          <button
            onClick={() => {
              dispatch(deleteContentDB(data[x].contentId));
              navigate('/')
            }}
          >
            삭제하기
          </button>
          {/* </Link> */}
        </DetailArticle>
      </DetailArticleOverview>

      <CommentInput
        onChange={changeComment}
        placeholder="댓글을 입력해 주세요 "
      ></CommentInput>
      <button>확인</button>
      <div style={{ height: "200px", border: "1px solid" }}>
        {/* <div>닉네임</div>
        <div style={{ display: "flex" }}>댓글 내용</div> */}
      </div>
    </>
  );
};

const DetailArticleOverview = styled.div`
  background-color: blue;
  margin: 20px;
  padding: 20px;
`;
const DetailArticle = styled.div`
  width: 80%;
  display: block;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  & > * {
    margin-top: 20px;
    background-color: red;
  }
  /* align-items: center; */
  img {
    width: 100%;
    height: 400px;
  }
`;

const CommentInput = styled.input`
  width: 80%;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
`;

const Content = styled.div``;

export default Detail;
