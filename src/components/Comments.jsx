import React, { useState, useEffect } from "react";
import { updateComments, getPostComments } from "../api/firebase";
import { v4 as uuidv4 } from "uuid";

export default function Comments({ user, postId }) {
  const initialState = {
    id: postId + uuidv4(),
    writer: user.displayName,
    writerId: user.uid,
    text: "",
  };
  const [comment, setComment] = useState(initialState);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = setTimeout(() => {
      console.log("댓글모음을 가져오는 중");
      getPostComments(postId).then((res) => setComments(res));
    }, 500);

    return () => {
      console.log("클린업 함수 실행");
      clearTimeout(getComments);
    };
  }, [comment, postId]); //의존성에 당연히 comments를 넣으면 무한 루프돌지

  const handleChange = (e) => {
    setComment({ ...comment, text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setComment({
      ...comment,
      timeStamp: new Date(),
    });
    updateComments(postId, comments, comment);
    setComments([...comments, comment]);
    setComment(initialState);
  };
  return (
    <div>
      <span>댓글</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="댓글입력"
          value={comment.text}
          onChange={handleChange}
        />
      </form>
      {comments.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
}
