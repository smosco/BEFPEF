import React, { useState, useEffect } from "react";
import { useMark } from "../context/MarkContext";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

export default function Mark({ id, pet }) {
  const { markIds, markItems, handleAdd, handleDelete } = useMark();

  const [mark, setMark] = useState(() => {
    if (markIds.includes(id)) {
      return true;
    } else {
      return false;
    }
  });

  const toggleMark = () => {
    if (mark) {
      handleDelete(id);
      setMark((prev) => !prev);
    } else {
      handleAdd(id, pet);
      setMark((prev) => !prev);
    }
  };

  useEffect(() => {
    localStorage.setItem("markIds", JSON.stringify(markIds));
    localStorage.setItem("markItems", JSON.stringify(markItems));
  }, [markIds, markItems]);

  return (
    <div onClick={toggleMark} className="mark">
      {mark ? <RxBookmarkFilled className="fill" /> : <RxBookmark />}
    </div>
  );
}
