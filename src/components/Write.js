import React, { useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { createContentDB, updateContentDB } from "../redux/modules/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Write = () => {
  const params = useParams();
  const data = useSelector((state)=>state.content.content_list).filter(v => v.id === Number(params.id))
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState(data[0]?.title);
  const [content, setContent] = useState(data[0]?.content);
  const [preview, setPreview] = useState(data[0]?.imageUrl);
  const [image, setImage] = useState();
  console.log(title)
  const uploadImage = (e) => {
    let reader = new FileReader(); // 이미지 미리보기!!!
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreview(reader.result);
    };
    setImage(e.target.files[0]);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeContent = (e) => {
    setContent(e.target.value);
  };
  const now = moment().format("YYYY-MM-DD HH:mm:ss");

  const addContent = async () => {
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${image.name}`),
      image
    );
    const file_url = await getDownloadURL(uploaded_file.ref);
    await dispatch(
      createContentDB({
        title: title,
        imageUrl:file_url,
        content: content,
        nickName: "닉네임",
        date: now,
      })
    );
    navigate('/')
  };
  const updateContent = async () => {
    let realImage;
    if(image){
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${image?.name}`),
      image
    );
    const file_url = await getDownloadURL(uploaded_file.ref);
    realImage = file_url
  }
    
    await dispatch(
      updateContentDB({
        id:data[0].id,
        title: title,
        imageUrl:realImage ? realImage : preview,
        content: content,
        nickName: "닉네임",
        date: now,
      })
    );
    navigate('/')
  }
  return (
    <Container>
      <div>{!params.id ? '게시글 작성' : '게시글 수정'}</div>
      <div>{title}</div>
      <img src={preview} alt="이미지"></img>
      <div style={{ height: "100px", border: "1px solid" }}>{content}</div>
      <input
        onChange={changeTitle}
        placeholder="제목을 입력해 주세요 :)"
        value={title}
      ></input>
      <textarea
        style={{ height: "100px" }}
        onChange={changeContent}
        placeholder="글을 작성해 주세요 :)"
        value={content}
      ></textarea>
      <input type="file" onChange={uploadImage}></input>
      {!params.id ? <button
        disabled={!image || !title || !content ? true : false}
        onClick={addContent}
      >
         게시글 등록
      </button> : <button
        disabled={!preview || !title || !content ? true : false}
        onClick={updateContent}
      >
         게시글 수정
      </button>}
    </Container>
  );
};
const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  & > * {
    margin-top: 20px;
  }
  /* align-items: center; */
  img {
    border: 1px solid;
    width: 400px;
    height: 400px;
  }
`;
export default Write;
