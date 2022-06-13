import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
const Header = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <div style={{fontSize:'70px', width:'50%', cursor:'pointer'}} onClick={()=>navigate('/')}>🌙Good Night</div>
            <Btn>
            <p>유저이름</p>
            <button onClick={()=>{navigate('/write')}}>write</button>
            <button onClick={()=>{navigate('/login')}}>로그인</button>
            <button onClick={()=>{navigate('/signup')}}>회원가입</button>
            </Btn>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100px;
    border-bottom: 2px solid #cce5ff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

`
const Btn = styled.div`
    width:20%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    & > *{
        margin-right: 20px;
    }
    button{
        cursor: pointer;
    }
`
export default Header