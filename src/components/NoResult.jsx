import React from "react";
import noImg from "../asset/noImg.jpg";

export default function NoResult() {
  return (
    <div className="noResult">
      <img src={noImg} alt="noResult" />
    </div>
  );
}
