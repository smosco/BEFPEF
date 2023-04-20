import React from "react";
import Pets from "../components/Pets";
import { useMark } from "../context/MarkContext";
import noImg from "../asset/noImg.jpg";

export default function MarkList() {
  const { markItems } = useMark();

  return (
    <div className="container">
      {markItems.length === 0 && <p>다시보고 싶은 친구들을 추가해주세요!</p>}
      {markItems.length === 0 && <img src={noImg} alt="noImg" />}
      {markItems.length !== 0 && <p>친구들에게 관심을 가져주셔서 감사해요!</p>}
      <Pets pets={markItems} />
    </div>
  );
}
