// 게시물 목록 페이지에서 미리보기 목록 컴포넌트입니다.
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const { postId, writer, title, location, img, timestamp } = post;
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={img}
        alt="img"
        onClick={() => navigate(`/${postId}`, { state: { post } })}
      />
      <div>{writer}</div>
      <div>{title}</div>
      <div>{location}</div>
      <div>{timestamp.seconds}</div>
    </div>
  );
}
