import { createContext, useContext, useEffect, useState } from "react";

const LikesContext = createContext();

export function LikesProvider({ children }) {
  const [likes, setLikes] = useState(readLikesFromLocal("likes"));
  const [likeItems, setLikeItems] = useState(readLikesFromLocal("likeItems"));

  const handleAdd = (id, pet) => {
    setLikes([...likes, id]);
    setLikeItems([...likeItems, pet]);
  };
  // const handleUpdate = (updated) =>
  //후에 아이디는 reqNo으로 바꿀것이다.
  const handleDelete = (id, pet) => {
    setLikes(likes.filter((item) => item !== id));
    setLikeItems(
      likeItems.filter((item) => item.ABDM_IDNTFY_NO !== pet.ABDM_IDNTFY_NO)
    );
  };
  // const handleEdit = (edited) => {
  //   setTodos(todos.map((item) => (item.id === edited.id ? edited : item)));
  // };
  // const toggleDarkMode = () => {
  //   setDarkMode((prev) => !prev); //(!darkMode)
  //   updateDarkMode(!darkMode);
  // };

  // useEffect(() => {
  //   const isDark =
  //     localStorage.theme === "dark" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches);
  //   setDarkMode(isDark);
  //   updateDarkMode(isDark);
  // }, []);
  useEffect(() => {
    //console.log("first", JSON.parse(localStorage.getItem("todos")));
    //localStorage.setItem("todos", JSON.stringify(todos));
    console.log("내가 지금 set함");
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("likeItems", JSON.stringify(likeItems));
    setLikes(JSON.parse(localStorage.getItem("likes")));
    setLikeItems(JSON.parse(localStorage.getItem("likeItems")));
    //console.log("after", todos);
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
  //console.log("read");
  const likes = localStorage.getItem(key);
  return likes ? JSON.parse(likes) : [];
}
// function updateDarkMode(darkMode) {
//   if (darkMode) {
//     document.documentElement.classList.add("dark");
//     localStorage.theme = "dark";
//   } else {
//     document.documentElement.classList.remove("dark");
//     localStorage.theme = "light";
//   }
// }
export const useLikes = () => useContext(LikesContext);
