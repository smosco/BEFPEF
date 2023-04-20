import { createContext, useContext, useEffect, useState } from "react";

const MarkContext = createContext();

// marks에는 id만 저장해서 include로 판단하고, api에서 id로 따로 불러올 수 없어서 pet까지 로컬에 저장함
export function MarkProvider({ children }) {
  const [markIds, setMarkIds] = useState(readMarksFromLocal("markIds"));
  const [markItems, setMarkItems] = useState(readMarksFromLocal("markItems"));

  const handleAdd = (id, pet) => {
    setMarkIds([...markIds, id]); //꼭 배열로 해야함, 객체로 하면 안됨
    setMarkItems([...markItems, pet]);
  };

  const handleDelete = (id) => {
    setMarkIds(markIds.filter((item) => item !== id));
    setMarkItems(markItems.filter((item) => item.ABDM_IDNTFY_NO !== id));
  };

  // 처음 들어왔을때 로컬에서 읽어서 바로 로컬에 넣어줘야 한다. 그리고 set도 해줘야 한다.
  useEffect(() => {
    localStorage.setItem("markIds", JSON.stringify(markIds));
    localStorage.setItem("markItems", JSON.stringify(markItems));
    setMarkIds(JSON.parse(localStorage.getItem("markIds")));
    setMarkItems(JSON.parse(localStorage.getItem("markItems")));
  }, []);

  return (
    <MarkContext.Provider
      value={{ markIds, markItems, handleAdd, handleDelete }}
    >
      {children}
    </MarkContext.Provider>
  );
}

function readMarksFromLocal(key) {
  const marks = localStorage.getItem(key);
  return marks ? JSON.parse(marks) : [];
}

export const useMark = () => useContext(MarkContext);
