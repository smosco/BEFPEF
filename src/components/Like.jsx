import React, { useState, useEffect } from "react";
import { useLikes } from "../context/LikeContext";
import { HiHeart } from "react-icons/hi";
import "../styles/Like.scss";

// const a = [{ a: "1", c: "3" }, { b: "2" }];
// const b = { c: "3", a: "1" };
// console.log("di", a.includes(b));
export default function Like({ id, pet }) {
  const { likes, likeItems, handleAdd, handleDelete } = useLikes();
  // const [like, setLike] = useState(false);
  const [like, setLike] = useState(() => {
    if (likes.includes(id)) {
      // console.log(likes, productId);
      //   console.log("포함");
      return true;
    } else {
      //   console.log("안포함");
      return false;
    }
  });
  console.log(like);

  const toggleLike = () => {
    if (like) {
      handleDelete(id, pet);
      setLike((prev) => !prev);
    } else {
      handleAdd(id, pet);
      setLike((prev) => !prev);
    }
  };

  useEffect(() => {
    // setLikes(JSON.parse(localStorage.getItem("likes")));
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("likeItems", JSON.stringify(likeItems));
  }, [likes, likeItems]);

  return (
    <div onClick={toggleLike} className="like">
      <HiHeart className={`heart ${like ? "t" : "f"}`} />
    </div>
  );
}
