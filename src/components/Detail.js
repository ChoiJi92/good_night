import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { deleteContentDB, loadDetailContentDB } from "../redux/modules/contentSlice";
import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";
import { createCommentDB, loadCommentDB } from "../redux/modules/commentSlice";
import Comment from "./Comment";
import Heart from './Heart'
import moment from "moment";
import { BsChat } from "react-icons/bs";



const Detail = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [isloaded, setIsloaded] = useState(false);
  const params = useParams();
  const data = useSelector((state) => state.content.detail_list)
  const user_name = localStorage.getItem("user_name");
  const navigate = useNavigate();
  // const commentData = useSelector((state) => comments);
  // const comments = useSelector((state) => state.comment.comment_list);

  //comment 값 가져오기
  const changeComment = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };
  const createComment = async () => {
    if (comment) {
      await dispatch(
        createCommentDB({
          contentId: data[0].contentId,
          nickName: user_name,
          comment: comment,
          createAt: moment().format("YYYY-MM-DD HH:mm:ss")
        })
      );
      setComment("");
    } else {
      window.alert("댓글을 입력해 주세요!");
    }
  };
  const data_comment = useSelector((state) => state.comment.comment_list);
  
  const onKeyPress = (e) => {
    if(e.key ==='Enter'){
      createComment()
    }
  }
  useEffect(() => {
    async function commentLoad() {
      await dispatch(loadDetailContentDB(params.id))
      await dispatch(loadCommentDB(params.id));
      setIsloaded(true);
    }
    commentLoad();
  }, []);
  return (
    <>
    {isloaded && 
      <DetailArticleOverview>
        <DetailArticle>
          <h1>{data.title}</h1>
          <Middle>
            <div style={{ width: "20%" }}>{data.nickName}</div>
            <Right>
              <div style={{ width: "50%" ,textAlign:'right'}}>{data.nDate}</div>
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

          <img src={data.imageUrl} alt="이미지"></img>
          <Icon>
          <Heart data ={params.id}></Heart>
          <div style={{marginLeft:'10px'}}>
          <BsChat fontSize='30px' style={{padding:'2px'}}></BsChat>
          <div style={{marginTop:'1px'}}>댓글 {data_comment.length}개</div>
          </div>
          </Icon>
          <CommentInput>
            <input
              onChange={changeComment}
              placeholder="댓글을 입력해 주세요 "
              value={comment}
              onKeyPress={onKeyPress}
            ></input>
            <button onClick={createComment}>등록</button>
          </CommentInput>

          <Comment></Comment>
        </DetailArticle>
      </DetailArticleOverview>
}
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
  }
`;
const Middle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
`;
const Icon = styled.div`
display: flex;
flex-direction: row;
`
const Btn = styled.div`
  & > * {
    margin-left: 5px;
    border: none;
    font-size: medium;
    background-color: transparent;
    cursor: pointer;
    :hover {
      color: #78909c;
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
  input{
      width: 90%;
  }
  button{
      border: none;
      border-radius: 5px;
      background-color: #78909c;
      color: white;
      width: 60px;
  }
`;

export default Detail;
