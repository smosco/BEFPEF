// 게시물 목록 페이지에서 미리보기 목록 컴포넌트입니다.
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const { postId, writer, title, location, img, timestamp } = post;
  const navigate = useNavigate();

  return (
    <tbody
      className="postcard"
      onClick={() => navigate(`/${postId}`, { state: { post } })}
    >
      <tr>
        <td className="img-container">
          <img src={img} alt="img" />
        </td>
        <td className="preview">
          <div>{title}</div>
          <div>{location}</div>
          <div>{writer}</div>
          <div>{timestamp.seconds}</div>
        </td>
      </tr>
    </tbody>
  );
}
