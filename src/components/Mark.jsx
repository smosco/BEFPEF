import React, { useState, useEffect } from "react";
import { useLikes } from "../context/LikeContext";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

export default function Mark({ id, pet }) {
  const { likes, likeItems, handleAdd, handleDelete } = useLikes();

  const [mark, setMark] = useState(() => {
    if (likes.includes(id)) {
      return true;
    } else {
      return false;
    }
  });

  const toggleLike = () => {
    if (mark) {
      handleDelete(id);
      setMark((prev) => !prev);
    } else {
      handleAdd(id, pet);
      setMark((prev) => !prev);
    }
  };

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("likeItems", JSON.stringify(likeItems));
  }, [likes, likeItems]);

  return (
    <div onClick={toggleLike} className="like">
      {mark ? <RxBookmarkFilled className="fill" /> : <RxBookmark />}
    </div>
  );
}
