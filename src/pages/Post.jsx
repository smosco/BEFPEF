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
    <div className="post">
      <div className="img-container">
        <img src={img} alt="img" />
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p>{writer}</p>
        <p>{location}</p>
        <p>{desc}</p>
        <p>{contact}</p>
        <p>{timestamp.seconds}</p>
      </div>
      {user?.uid === writerId && (
        <div className="button-container">
          <button onClick={() => navigate(`/update/${postId}`)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
      {/* <Comments user={user} postId={postId} /> */}
    </div>
  );
}
