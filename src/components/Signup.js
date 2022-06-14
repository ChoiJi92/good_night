import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserDB, userCreateDB, userSignupDB } from "../redux/modules/userSlice";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // 회원가입 할 정보 ref
    const email_ref = React.useRef(null);
    const password_ref = React.useRef(null);
    const repeat_password_ref = React.useRef(null);
    const nickName_ref = React.useRef(null);
  
    // 이메일 정규표현식
    const emailCheck = (email) => {
      let _reg =
        // /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      return _reg.test(email);
    };
    // 패스워드 정규표현식
    const passwordCheck = (password) => {
      let _reg =
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{6,10}$/;
      // 패스워드는 6 ~ 10자 영문, 숫자 및 특수문자조합
      return _reg.test(password);
    };
    // 유효성 검사
    const signup = async () => {
      // 회원가입 정보 란 비어있을때
      if (
        email_ref.current.value === "" ||
        password_ref.current.value === "" ||
        nickName_ref.current.value === ""
      ) {
        window.alert("정보를 입력해주세요.");
        return;
      }
      // 이메일 체크
      if (!emailCheck(email_ref.current.value)) {
        window.alert("이메일 형식이 맞지 않습니다!");
        return;
      }
      // 비밀번호 체크
      if (!passwordCheck(password_ref.current.value)) {
        window.alert(
          "비밀번호는 6 ~ 10자 영문, 숫자 및 특수문자조합으로 작성하세요!"
        );
        return;
      }
      //비밀번호 확인 체크
      if (password_ref.current.value !== repeat_password_ref.current.value) {
        window.alert("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        dispatch(createUserDB({
            email: email_ref.current.value,
            nickName: nickName_ref.current.value,
            password:password_ref.current.value,
            repeat_password: repeat_password_ref.current.value

        }))
      }
      
    };
      // //  Axios
      // const callSomethingAxios = () => {
      //   //post
      //   let userdata = {
      //     email: email_ref.currnet.value,
      //     nickname: nickName_ref.current.value,
      //     password: password_ref.current.value,
      //     repeat_password: repeat_password_ref.current.value,
      //   };
      //   callSomethingAxios
      //     .post("api", userdata)
      //     //api,{데이터}, {config}
      //     .then((response) => {
      //       console.log(response);
      //     });
      // };
      // //axios가 알아서 json화해서 요청을 보냄

      // React.useEffect(() => {
      //   callSomethingAxios();
      // });

    return (
        <Container>
          <SignupWrap>
            <SignupHeader>
              <SignupTitle>🌙SIGN UP</SignupTitle>
            </SignupHeader>
            <Input>
              <label htmlFor="email">이메일</label>
              <br />
              <input id="email" type="email" ref={email_ref} required></input>
              <p>이메일을 작성해주세요!</p>
            </Input>
            <Input>
              <label htmlFor="nickName">닉네임</label>
              <br />
              <input id="nickName" type="name" ref={nickName_ref} required></input>
            </Input>
            <Input>
              <label htmlFor="password">비밀번호</label>
              <br />
              <input
                id="password"
                type="password"
                ref={password_ref}
                required
              ></input>
              <p>4 ~ 10자 영문, 숫자 및 특수문자조합</p>
            </Input>
            <Input>
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <br />
              <input
                id="confirmPassword"
                type="password"
                ref={repeat_password_ref}
                required
              ></input>
            </Input>
            <Btn onClick={signup}>회원가입</Btn>
          </SignupWrap>
        </Container>
      );
    };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const SignupTitle = styled.label`
    margin-bottom: 20px;
    font-size: 3.2rem;
    color: black;
`;

const SignupHeader = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
`;

const SignupWrap = styled.div`
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
    margin: 5px 0;
    color: black;
    font-size: 1.2rem;
    width: 50%;
    p {
        color: #000;
        font-size: 13px;
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

export default Signup;