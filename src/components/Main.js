import styled from 'styled-components'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addHeart, addHeartDB, minusHeartDB } from '../redux/modules/contentSlice';

const Main = () => {
  const data = useSelector((state) => state.content.content_list);
  console.log(data);
  const dispatch = useDispatch()
  return (
    <Container>
      {data.map((v) => (
        <Card key={v.id}>
            <Head>
            <div>닉네임</div>
            <div>{v.date}</div>
            </Head>
          <img src={v.imageUrl}></img>
          {!v.heart_count.includes('jeahoon10000@naver.com') ?
          <FavoriteBorderIcon onClick={() => {
              dispatch(addHeartDB(v.id,'jeahoon10000@naver.com'))
           
          }} fontSize='large' cursor='pointer'></FavoriteBorderIcon>
          :
          <FavoriteIcon style={{color:'red'}} onClick={() => {
              dispatch(minusHeartDB(v.id,'jeahoon10000@naver.com'))
           
          }} fontSize='large' cursor='pointer'></FavoriteIcon>
        }
          <h1>{v.title}</h1>
          <div>{v.content}</div>
        </Card>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
`;
const Card = styled.div`
  width: 25%;
    margin: 20px 20px;
    border: 1px solid;
    border-radius: 5px;
    padding: 10px;
  img{
      width: 100%;
      height: 400px;
  }
`;
const Head = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`
export default Main;
