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
    <div>
      {posts?.map((item) => (
        <PostCard key={item.postId} post={item} />
      ))}
    </div>
  );
}
