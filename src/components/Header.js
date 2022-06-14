import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
const Header = () => {
    const navigate = useNavigate()
    const user_name = localStorage.getItem('user_name')
    console.log(user_name)
    return (
        <Container>
            <div style={{fontSize:'70px', width:'50%', cursor:'pointer'}} onClick={()=>navigate('/')}>🌙Good Night</div>
            <Btn>
            <p>{user_name}</p>
            {user_name ? <>
                <button onClick={()=>{navigate('/write')}}>write</button>
                <button onClick={() => {
                    localStorage.clear()
                    navigate('/')}}>Sign out</button>
            </>:
            <>
            <button onClick={() => {navigate('/login')}}>Log in</button>
            <button onClick={() => {navigate('/signup')}}>Sign up</button>
            </>
            }
            </Btn>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100px;
    border-bottom: 2px solid #78909C;
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
        border: none;
        background-color: transparent;
        font-size: medium;
        :hover {
            color: #0080ff;
        }
    }
`
export default Header