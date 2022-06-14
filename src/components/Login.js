import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserDB, loginUserDB, userLoadDB } from "../redux/modules/userSlice";
// import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // 로그인 할 정보 ref
    const email_ref = React.useRef(null);
    const password_ref = React.useRef(null);
  
    // 로그인 이메일 정규표현식
    const emailCheck = (email) => {
      let reg =
        // /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      return reg.test(email);
    };
  
    // 유효성 검사
    const login = async () => {
      // 이메일과 비밀번호가 비어있을때
      if (email_ref.current.value === "" || password_ref.current.value === "") {
        window.alert("이메일과 비밀번호를 입력하세요!");
        return;
      }
      // 이메일 체크
      if (!emailCheck(email_ref.current.value)) {
        window.alert("이메일 형식이 맞지 않습니다!");
        return;
      } else {
          await dispatch(loginUserDB({
              email:email_ref.current.value,
              password:password_ref.current.value
          }))
        // navigate("/");
      }
    };
    const onKeyPress = (e) => {
      if(e.key ==='Enter'){
        login()
      }
    }

    return (
        <Container>
          <LoginWrap>
            <LoginHeader>
              <LoginTitle>🌙Login</LoginTitle>
            </LoginHeader>
            <Input>
              <label htmlFor="email">이메일</label>
              <br />
              <input id="email" type="email" ref={email_ref} required></input>
            </Input>
            <Input>
              <label htmlFor="password">비밀번호</label>
              <br />
              <input
                id="password"
                type="password"
                ref={password_ref}
                onKeyPress={onKeyPress}
                required

              ></input>
            </Input>
            <Btn onClick={login} >로그인</Btn>
          </LoginWrap>
        </Container>
      );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled.label`
  margin-bottom: 20px;
  font-size: 3.2rem;
  color: black;
`;

const LoginHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const LoginWrap = styled.div`
  margin-top: 5%;
  background-color: #78909C;
  height: 60%;
  width: 30%;
  border-radius: 5%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  color: black;
  font-size: 1.2rem;
  width: 50%;
  p {
    color: #999494;
    font-size: 15px;
  }
  input {
    width: 100%;
    height: 25px;
    border: none;
    border: 0 solid #000;
    border-radius: 7px;
  }

`;

const Btn = styled.button`
  border: none;
  border-color: white;
  width: 30%;
  margin-top: 20px;
  height: 50px;
  border-radius: 5px;
  font-size: 1.5rem;
  background-color: black;
  color: white;
  &:hover {
    background-color: #CFD8DC;
    color: black;
  }
`;

export default Login;