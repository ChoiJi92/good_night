import React, { useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { createContentDB, updateContentDB } from "../redux/modules/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { textAlign } from "@mui/system";

const Write = () => {
  const params = useParams();
  const data = useSelector((state)=>state.content.content_list).filter(v => v.id === params.id)
  const user_name = localStorage.getItem('user_name')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState(data[0]?.title);
  const [content, setContent] = useState(data[0]?.content);
  const [preview, setPreview] = useState(data[0]?.imageUrl);
  const [image, setImage] = useState();
  
  // 이미지 미리보기 기능 구현
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
  // const now = moment().format("YYYY-MM-DD HH:mm:ss");

  // content 추가 
  const addContent = async () => {
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${image.name}`),
      image
    );
    const file_url = await getDownloadURL(uploaded_file.ref);
     dispatch(
      createContentDB({
        title: title,
        imageUrl:file_url,
        content: content,
        nickName: user_name,
        createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    // navigate('/')
  };
  // content 수정 
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
   
    dispatch(
      updateContentDB({
        id:data[0].id,
        title: title,
        imageUrl: realImage ? realImage : preview,  // 이미지 변경안하면 원래 작성되어있는 이미지로 저장
        content: content,
        nickName: user_name,
        createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    
    // navigate('/')
  }
  return (
    <Container>
      <h1 >{!params.id ? '게시글 작성' : '게시글 수정'}</h1>
      <div style={{minWidth:'90%', fontSize:'30px',height:'40px' ,textAlign:'left'}}>Title: {title}</div>
      <div className="main">
      <img src={preview}></img>
      <div style={{ whiteSpace:'pre-wrap' ,width:'380px', height: "380px", border: "1px solid", borderRadius:'10px',padding:'10px'}}>{content}</div>
      </div>
      <input
      style={{minWidth:'90%'}}
      className="title"
        onChange={changeTitle}
        placeholder="제목을 입력해 주세요 :)"
        value={title}
      ></input>
      <textarea
      className="content"
        style={{ height: "100px",minWidth:'90%' }}
        onChange={changeContent}
        placeholder="글을 작성해 주세요 :)"
        value={content}
      ></textarea>
      <input style={{minWidth:'90%'}}className="file" type="file" accept="image/*" onChange={uploadImage}></input>
      {!params.id ? <Btn
      style={{cursor:'pointer'}}
        disabled={!preview || !title || !content}
        onClick={addContent}
      >
         게시글 등록
      </Btn> : <Btn
      style={{cursor:'pointer'}}
        disabled={!preview || !title || !content}
        onClick={updateContent}
      >
         게시글 수정
      </Btn>}
    </Container>
  );
};
const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  & > * {
    margin-top: 20px;
    
  }
  .main{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 90%;
  }
  .title{
    height: 30px;
  }
  img {
    border: 1px solid;
    border-radius: 10px;
    width: 400px;
    height: 400px;
    background-size: cover;
  }
  
`;
const Btn = styled.button`
  background-color: ${(props) => (props.disabled ? '#FFFFCC' : '#F5BD25')};
    border: none;
    border-radius: 5px;
    /* color: black; */
    height: 40px;
    font-size: large;
    width: 25%;
    margin: 20px auto;
    
`
export default Write;
