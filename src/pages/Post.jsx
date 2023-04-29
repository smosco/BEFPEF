// 게시물 상세보기 페이지입니다.
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { deletePost } from "../api/firebase";
import Comments from "../components/Comments";

export default function Post() {
  const { user } = useAuthContext();

  const {
    state: { post },
  } = useLocation();
  const {
    postId,
    title,
    writer,
    writerId,
    location,
    img,
    desc,
    contact,
    timestamp,
  } = post;

  const navigate = useNavigate();
  const handleDelete = () => {
    deletePost(postId).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="container">
      <img src={img} alt="img" />
      <div>{title}</div>
      <div>{writer}</div>
      <div>{location}</div>
      <div>{desc}</div>
      <div>{contact}</div>
      <div>{timestamp.seconds}</div>
      {user?.uid === writerId && (
        <div>
          <button onClick={() => navigate(`/update/${postId}`)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
      {/* <Comments user={user} postId={postId} /> */}
    </div>
  );
}
