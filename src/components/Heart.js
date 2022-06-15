import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";


import instance from "../redux/modules/axios";
const Heart = ({ data }) => {
  const dispatch = useDispatch();
  const [isloaded, setIsloaded] = useState(false);
  const user_name = localStorage.getItem("user_name");
  const [heart_count, setHeart_count] = useState(0);
  const [heartUser, setHeartUser] = useState([]);
  useEffect(() => {
    async function heartLoad() {
      let user_list = [];
      await instance.get(`/api/post/${data}/like`).then((response) => {
        setHeart_count(response.data.length);
        response.data.map((v, i) => (user_list[i] = v.nickName));
        setHeartUser(user_list);
      });
      setIsloaded(true);
    }
    heartLoad();
  }, []);
  // 좋아요 추가
  const addHeart = async () => {
    await instance.post(`/api/post/${data}/like`, {
      contentId: data,
      nickName: user_name,
    });
    setHeart_count(heart_count + 1);
    setHeartUser([...heartUser, user_name]);
  };
  // 좋아요 취소
  const deleteHeart = async () => {
    await instance.delete(`/api/post/${data}/unlike`);
    setHeart_count(heart_count - 1);
    setHeartUser(heartUser.filter((v) => v !== user_name));
  };
  return (
    <>
      {isloaded && (
        <div>
          {!heartUser.includes(user_name) ? (
            <FavoriteBorderIcon
              onClick={addHeart}
              fontSize="large"
              cursor="pointer"
            ></FavoriteBorderIcon>
          ) : (
            <FavoriteIcon
              style={{ color: "red" }}
              onClick={deleteHeart}
              fontSize="large"
              cursor="pointer"
            ></FavoriteIcon>
          )}
          <div>좋아요 {heart_count}개</div>
        </div>
      )}
    </>
  );
};

export default Heart;
