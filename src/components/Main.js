import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addHeart,
  addHeartDB,
  loadContentDB,
  minusHeartDB,
} from "../redux/modules/contentSlice";

const Main = () => {
  const data = useSelector((state) => state.content.content_list);
  console.log(data.length);
  const dispatch = useDispatch();
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
            <div>닉네임</div>
            <div>{v.createdAt}</div>
          </Head>
          <img src={v.imageUrl}></img>
          {/* {!v.heart_count.includes("jeahoon10000@naver.com") ? (
            <FavoriteBorderIcon
              onClick={() => {
                dispatch(addHeartDB(v.id, "jeahoon10000@naver.com"));
              }}
              fontSize="large"
              cursor="pointer"
            ></FavoriteBorderIcon>
          ) : (
            <FavoriteIcon
              style={{ color: "red" }}
              onClick={() => {
                dispatch(minusHeartDB(v.id, "jeahoon10000@naver.com"));
              }}
              fontSize="large"
              cursor="pointer"
            ></FavoriteIcon>
          )} */}
          {/* <div>좋아요 {v.heart_count.length}개</div> */}
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
