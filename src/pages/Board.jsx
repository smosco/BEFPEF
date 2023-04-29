// 게시글 목록을 보여줍니다.

import React from "react";
import { useState, useEffect } from "react";

import { getPosts } from "../api/firebase";
import PostCard from "../components/PostCard";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="board container">
      <p>동물을 찾습니다!</p>
      <thead>
        <tr>
          <th>사진</th>
          <th>제목</th>
          <th>발견장소</th>
          <th>작성자</th>
          <th>시간</th>
        </tr>
      </thead>
      {posts?.map((item) => (
        <PostCard key={item.postId} post={item} />
      ))}
    </div>
  );
}
