import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addHeartDB, minusHeartDB } from "../redux/modules/contentSlice";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createHeartDB, deleteHeartDB, loadHeartDB } from "../redux/modules/heartSlice";

import instance from "../redux/modules/axios";
const Heart = ({ data }) => {
  const dispatch = useDispatch();
  const [isloaded, setIsloaded] = useState(false);
  const user_name = localStorage.getItem('user_name')
  const [heart_count, setHeart_count] = useState()
  const [heartUser,setHeartUser] =useState([])
  useEffect(() => {
    async function heartLoad() {
    //   await dispatch(loadHeartDB(data.id));
    let user_list =[]
    await instance.get(`/api/post/${data.id}/like`).then((response)=>{
        setHeart_count(response.data.length)
        response.data.map((v,i) => user_list[i]=v.nickName)
        setHeartUser(user_list)
    })
    
      setIsloaded(true);
    }
    heartLoad();
  }, []);
  return (
    <>
      {isloaded && (
        <>
        {!heartUser.includes(user_name) ? 
          <FavoriteBorderIcon
            onClick={() => {
                dispatch(createHeartDB(data.id, user_name));
                setHeart_count(heart_count+1)
                setHeartUser([...heartUser,user_name])
            }}
            fontSize="large"
            cursor="pointer"
          ></FavoriteBorderIcon>
            :
          <FavoriteIcon
            style={{ color: "red" }}
            onClick={() => {
              dispatch(deleteHeartDB(data.id, user_name));
              setHeart_count(heart_count-1)
              setHeartUser(heartUser.filter(v => v !== user_name))
            }}
            fontSize="large"
            cursor="pointer"
          ></FavoriteIcon>
        }
          <div>좋아요{heart_count}개</div>
        </>
      )}
    </>
  );
};

export default Heart