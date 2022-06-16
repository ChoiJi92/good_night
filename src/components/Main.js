import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heart from "./Heart";
import {
  loadContentDB,
  loadDetailContentDB,
} from "../redux/modules/contentSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import instance from "../redux/modules/axios";
import banner from "../css/banner.png";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { amber } from "@mui/material/colors";

const Main = () => {
  const data = useSelector((state) => state.content.content_list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [target, setTarget] = useState(null);
  // 무한스크롤 관련 intersection observer
  // page를 넘겨주면서 백엔드 쪽에서 몇번부터 시작해서 가져올지
  const onIntersect = async ([entry], observer) => {
    //entry.isIntersecting은 내가 지금 target을 보고있니?라는 뜻 그 요소가 화면에 들어오면 true 그전엔 false
    if (entry.isIntersecting) {
      observer.unobserve(entry.target); // 이제 그 target을 보지 않겠다는 뜻
      await dispatch(loadContentDB());
    }
  };
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target); // target을 보겠다!
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target]);

  const color = amber[500];

  return (
    <>
      <Banner></Banner>
      <Container>
        {data.map((v, i) => (
          <Card key={v.id} ref={i === data.length - 1 ? setTarget : null}>
            <Head>
              <div>{v.nickName}</div>
              <div>{v.createAt}</div>
            </Head>
            <img
              src={v.imageUrl}
              onClick={() => {
                navigate(`/detail/${v.id}`);
              }}
              style={{ cursor: "pointer" }}
            ></img>
            <Heart data={v.id}></Heart>
            <h1>{v.title}</h1>
            <div>
              {v.content.length < 26
                ? v.content
                : v.content.slice(0, 26) + "..."}
            </div>
          </Card>
        ))}
      </Container>
      <Fab
        onClick={() => {
          navigate("/write");
        }}
        color="primary"
        aria-label="add"
        style={{
          backgroundColor: color,
          position: "fixed",
          bottom: "25px",
          right: "25px",
        }}
      >
        <AddIcon/>
      </Fab>
    </>
  );
};
const Banner = styled.div`
  background: url(${banner});
  background-size: cover;
  width: 100%;
  height: 500px;
  background-position: center;
`;
const Container = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-wrap: wrap; */
  display: grid;
  /* grid-template-rows: 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-gap: 10px; */
  width: 100%;
  /* margin: 0 auto; */
`;

const Card = styled.div`
  width: 80%;
  margin: 20px auto;
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  /* background-color: #78909C; */
  /* color: white; */
  img {
    width: 100%;
    height: 400px;
    border-radius: 10px;
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
