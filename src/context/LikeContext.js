import { createContext, useContext, useEffect, useState } from "react";

const LikesContext = createContext();

// likes에는 id만 저장해서 include로 판단하고, api에서 id로 따로 불러올 수 없어서 pet까지 로컬에 저장함
export function LikesProvider({ children }) {
  const [likes, setLikes] = useState(readLikesFromLocal("likes"));
  const [likeItems, setLikeItems] = useState(readLikesFromLocal("likeItems"));

  const handleAdd = (id, pet) => {
    setLikes([...likes, id]); //꼭 배열로 해야함, 객체로 하면 안됨
    setLikeItems([...likeItems, pet]);
  };

  const handleDelete = (id) => {
    setLikes(likes.filter((item) => item !== id));
    setLikeItems(likeItems.filter((item) => item.ABDM_IDNTFY_NO !== id));
  };

  // 처음 들어왔을때 코컬로 부터 읽고 나서 이걸 바로 로컬에 넣어줘야 한다. 그리고 set도 해줘야 한다.
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("likeItems", JSON.stringify(likeItems));
    setLikes(JSON.parse(localStorage.getItem("likes")));
    setLikeItems(JSON.parse(localStorage.getItem("likeItems")));
  }, []);

  return (
    <LikesContext.Provider
      value={{ likes, likeItems, handleAdd, handleDelete }}
    >
      {children}
    </LikesContext.Provider>
  );
}

function readLikesFromLocal(key) {
  const likes = localStorage.getItem(key);
  return likes ? JSON.parse(likes) : [];
}

export const useLikes = () => useContext(LikesContext);
