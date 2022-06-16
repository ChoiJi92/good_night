import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  deleteContentDB,
  loadDetailContentDB,
} from "../redux/modules/contentSlice";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";
import { createCommentDB, loadCommentDB } from "../redux/modules/commentSlice";
import CommentList from "./CommentList";
import Heart from "./Heart";
import moment from "moment";
import { BsChat } from "react-icons/bs";

const Detail = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [isloaded, setIsloaded] = useState(false);
  const params = useParams();
  const data = useSelector((state) => state.content.detail_list);
  const user_name = localStorage.getItem("user_name");
  const navigate = useNavigate();

  // comment change 확인
  const changeComment = (e) => {
    setComment(e.target.value);
  };
  // comment 생성
  const createComment = async () => {
    if (comment) {
      await dispatch(
        createCommentDB({
          contentId: data.contentId,
          nickName: user_name,
          comment: comment,
          createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
      );
      setComment("");
    } else {
      window.alert("댓글을 입력해 주세요!");
    }
  };
  // 해당 content에 comment 갯수 알기 위해서 정보가져옴
  const data_comment = useSelector((state) => state.comment.comment_list);

  // comment 등록시 엔터로 등록할수 있도록 구현
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      createComment();
    }
  };
  // 디테일 페이지의 해당 content와 content의 comment 로드
  useEffect(() => {
    async function commentLoad() {
      await dispatch(loadDetailContentDB(params.id));
      await dispatch(loadCommentDB(params.id));
      setIsloaded(true);
    }
    commentLoad();
  }, []);
  return (
    <>
      {isloaded && (
        <DetailArticleOverview>
          <DetailArticle>
            <h1>{data.title}</h1>
            <Middle>
              <div style={{ width: "20%" }}>{data.nickName}</div>
              <Right>
                <div style={{ width: "50%", textAlign: "right" }}>
                  {data.createAt}
                </div>
                {data.nickName === user_name ? (
                  <Btn>
                    <button
                      onClick={() => {
                        navigate(`/write/${params.id}`);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteContentDB(data.contentId));
                        //   navigate('/')
                      }}
                    >
                      삭제
                    </button>
                  </Btn>
                ) : (
                  <></>
                )}
              </Right>
            </Middle>
            <Content>
              <img src={data.imageUrl} alt="이미지"></img>
              <div>{data.content}</div>
            </Content>
            <Icon>
              <Heart data={params.id}></Heart>
              <div style={{ marginLeft: "10px" }}>
                <BsChat fontSize="30px" style={{ padding: "2px" }}></BsChat>
                <div style={{ marginTop: "1px" }}>
                  댓글 {data_comment.length}개
                </div>
              </div>
            </Icon>
            {user_name && (
              <CommentInput>
                <input
                  onChange={changeComment}
                  placeholder="댓글을 입력해 주세요 :) "
                  value={comment}
                  onKeyPress={onKeyPress}
                ></input>
                <button onClick={createComment}>등록</button>
              </CommentInput>
            )}
            <CommentList></CommentList>
          </DetailArticle>
        </DetailArticleOverview>
      )}
    </>
  );
};

const DetailArticleOverview = styled.div`
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
    /* background-color: red; */
  }
  /* align-items: center; */
  img {
    width: 100%;
    height: 400px;
    border-radius: 10px;
  }
`;
const Middle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 800px;
    height: 400px;
    margin: 0 auto;
    background-size: cover;
  }
  div {
    white-space: pre-wrap;
    margin-top: 30px;
    border-bottom: 1px solid;
    padding: 5px;
    width: 100%;
    height: 100px;
  }
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`;
const Icon = styled.div`
  display: flex;
  flex-direction: row;
`;
const Btn = styled.div`
  & > * {
    margin-left: 5px;
    border: none;
    font-size: medium;
    background-color: transparent;
    cursor: pointer;
    :hover {
      color: #f5bd25;
    }
  }
`;

const CommentInput = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* margin: 20px auto; */
  input {
    width: 90%;
  }
  button {
    border: none;
    border-radius: 5px;
    background-color: #f5bd25;

    width: 60px;
  }
`;

export default Detail;
