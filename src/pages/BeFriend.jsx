import React from "react";
import Pets from "../components/Pets";
import { useLikes } from "../context/LikeContext";
import NoResult from "../components/NoResult";

export default function BeFriend() {
  const { likeItems } = useLikes();

  return (
    <div className="likes-container">
      {likeItems.length === 0 && <p>다시보고 싶은 친구들을 추가해주세요</p>}
      {likeItems.length === 0 && <NoResult />}
      {likeItems.length !== 0 && <p>친구들에게 관심을 가져주셔서 감사해요!</p>}
      <Pets pets={likeItems} />
    </div>
  );
}
