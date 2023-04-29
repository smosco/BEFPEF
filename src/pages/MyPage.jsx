import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getPostsById } from "../api/firebase";
import PostCard from "../components/PostCard";

export default function MyPage() {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPostsById(user?.uid).then((posts) => setPosts(posts));
  }, []);
  return (
    <div className="container">
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}
