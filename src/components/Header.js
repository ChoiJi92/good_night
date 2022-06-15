import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import goodnight from "../css/goodnight.png";



const Header = ({ isloaded }) => {
  const navigate = useNavigate();
  const user_name = localStorage.getItem("user_name");
  return (
    <>
      <Head>
        <Container>
          {/* <div
            style={{ fontSize: "70px", width: "50%", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            🌙Good Night
          </div> */}
          <Btn>
            <p>{user_name}</p>
            {user_name ? (
              <>
                <button
                  onClick={() => {
                    navigate("/write");
                  }}
                >
                  write
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.replace("/");
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </button>
              </>
            )}
          </Btn>
        </Container>
        <Home onClick={()=> navigate('/')}></Home>
      </Head>
      
    </>
  );
};
const Head = styled.div`
  height: 430px;
  background: url(${goodnight});
  background-position: center;

`;
const Home = styled.div`
/* background-color: green; */
width: 50%;
height: 70%;
margin: auto;
cursor: pointer;
`
const Container = styled.div`
  width: 100%;
  height: 100px;
  color: white;
  /* border-bottom: 2px solid #78909C; */
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  justify-content: flex-end;
  align-items: flex-end;
  /* background: url(${goodnight});
    background-size: cover; */
  /* background-color: white; */
`;

const Btn = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  & > * {
    margin-right: 20px;
  }
  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: medium;
    color: white;
    :hover {
      /* color: #78909c; */
      color: #F5BD25;
    }
  }
`;
export default Header;
