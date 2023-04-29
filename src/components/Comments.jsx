import React, { useState, useEffect } from "react";
import { updateComments, getPostComments } from "../api/firebase";

export default function Comments({ user, postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostComments(postId).then((res) => setComments(res));
  }, [comments, postId]);

  //무한으로 읽히는데 해결방법 없나..
  console.log(comments);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateComments(user, postId, comments, comment);
    setComment("");
  };
  return (
    <div>
      <span>댓글</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="댓글입력"
          value={comment}
          onChange={handleChange}
        />
      </form>
      {comments.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
}
