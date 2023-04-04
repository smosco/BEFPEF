import React, { useState, useEffect } from "react";
import { useLikes } from "../context/LikeContext";
import { HiHeart } from "react-icons/hi";
import "../styles/Like.scss";

export default function Like({ id, pet }) {
  const { likes, likeItems, handleAdd, handleDelete } = useLikes();
  // const [like, setLike] = useState(false);
  const [like, setLike] = useState(() => {
    if (likes.includes(id)) {
      return true;
    } else {
      return false;
    }
  });

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
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("likeItems", JSON.stringify(likeItems));
  }, [likes, likeItems]);

  return (
    <div onClick={toggleLike} className="like">
      <HiHeart className={`heart ${like ? "t" : "f"}`} />
    </div>
  );
}
