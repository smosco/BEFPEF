import React from "react";
import noImg from "../asset/noImg.jpg";
import "../styles/NoResult.scss";

export default function NoResult() {
  return (
    <div className="noResult">
      <img src={noImg} alt="noResult" />
    </div>
  );
}
