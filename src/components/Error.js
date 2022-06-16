import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
    const navigate = useNavigate()

    return (
        <Container>
        <h1 style={{fontSize : "xx-large", fontStyle:'bold'}}>
            앗 잠깐!!!!!
        </h1>
        <p>로그인 후 이용해 주세요!!</p>
        <Button onClick={() => {
            navigate('/login')
        }}>로그인 하러 가기</Button>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 80%;
  p{
    font-size: x-large;
  }
`;
const Button = styled.button`
  width: 30%;
  height: 50px;
  background-color: #F5BD25;
  margin: 20px;
  font-size: 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

`;
export default Error