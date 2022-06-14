import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heart from './Heart'
import {
  addHeart,
  addHeartDB,
  loadContentDB,
  minusHeartDB,
} from "../redux/modules/contentSlice";
import { useNavigate } from "react-router-dom";

import moment from "moment";

const Main = () => {
  const data = useSelector((state) => state.content.content_list);
  console.log(data.length);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(2)
  // 무한스크롤 관련 intersection observer
  const onIntersect = async ([entry], observer) => {
    //entry.isIntersecting은 내가 지금 target을 보고있니?라는 뜻 그 요소가 화면에 들어오면 true 그전엔 false
    if (entry.isIntersecting) {
      observer.unobserve(entry.target); // 이제 그 target을 보지 않겠다는 뜻
      await dispatch(loadContentDB(page));
      console.log(page)
    }
  };
  useEffect(() => {
    let observer;
    if (target) {
      setPage(page+1)
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target); // target을 보겠다!
      
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target]);
  return (
    <Container>
      {data.map((v,i) => (
        <Card key={v.id} ref={i === data.length - 1 ? setTarget : null}>
          <Head>
            <div>{v.nickName}</div>
            <div>{v.nDate}</div>
          </Head>
          <img src={v.imageUrl} onClick={()=>navigate(`/detail/${v.id}`)} style={{cursor:'pointer'}}></img>
          <Heart data ={v.id}></Heart>
          <h1>{v.title}</h1>
          <div >{v.content.length < 30 ? v.content : v.content.slice(0,30)+'...'}</div>
        </Card>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
`;
const Card = styled.div`
  width: 25%;
  margin: 20px 20px;
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  img {
    width: 100%;
    height: 400px;
  }
  :hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 5px 15px 0px;
  }
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
export default Main;
