import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useLikes } from "../context/LikeContext";
import "../styles/PetDetail.scss";
import Like from "../components/Like";
import Kakao from "../components/Kakao";

export default function PetDetail() {
  const {
    state: {
      pet: {
        ABDM_IDNTFY_NO,
        RECEPT_DE,
        DISCVRY_PLC_INFO,
        PBLANC_IDNTFY_NO,
        PBLANC_BEGIN_DE,
        PBLANC_END_DE,
        SPECIES_NM,
        COLOR_NM,
        AGE_INFO,
        BDWGH_INFO,
        SEX_NM,
        NEUT_YN,
        SFETR_INFO,
        SHTER_NM,
        REFINE_ROADNM_ADDR,
        SHTER_TELNO,
        PROTECT_PLC,
        JURISD_INST_NM,
        CHRGPSN_NM,
        CHRGPSN_CONTCT_NO,
        PARTCLR_MATR,
        IMAGE_COURS,
        REFINE_WGS84_LAT,
        REFINE_WGS84_LOGT,
      },
      pet,
    },
  } = useLocation();
  // const { likes, handleAdd, handleDelete } = useLikes();
  // const [like, setLike] = useState(() => {
  //   if (likes.includes(pet)) {
  //     console.log("포함");
  //     return true;
  //   } else {
  //     console.log("안포함");
  //     return false;
  //   }
  // });

  // const toggleLike = () => {
  //   setLike((prev) => !prev);
  //   if (like) {
  //     handleDelete(pet);
  //   } else {
  //     handleAdd(pet);
  //   }
  // };

  // useEffect(() => {
  //   localStorage.setItem("likes", JSON.stringify(likes));
  // }, [likes]);

  return (
    <div className="description-container">
      <div className="top">
        <div className="img-container">
          <img src={IMAGE_COURS} alt={ABDM_IDNTFY_NO} />
          {/* <div
          className={`like-btn ${like ? "active" : ""}`}
          onClick={toggleLike}
        >
          be family
        </div> */}
          <Like id={ABDM_IDNTFY_NO} pet={pet} />
        </div>
        <div className="description">
          <div className="noticeNo">
            <span>공고번호</span>
            <span>{PBLANC_IDNTFY_NO}</span>
          </div>
          <div className="table">
            <div className="row">
              <span>픔종</span>
              <span>{SPECIES_NM}</span>
            </div>
            <div className="row">
              <span>색상</span>
              <span>{COLOR_NM}</span>
            </div>
            <div className="row">
              <span>성별</span>
              <span>{SEX_NM}</span>
            </div>
            <div className="row">
              <span>중성화 여부</span>
              <span>{NEUT_YN}</span>
            </div>
            <div className="row">
              <span>나이/체중</span>
              <span>
                {AGE_INFO}/{BDWGH_INFO}
              </span>
            </div>
            <div className="row">
              <span>접수일시</span>
              <span>{RECEPT_DE}</span>
            </div>
            <div className="row">
              <span>빌견장소</span>
              <span>{DISCVRY_PLC_INFO}</span>
            </div>
            <div className="row">
              <span>특징</span>
              <span>{SFETR_INFO}</span>
            </div>
            <div className="row">
              <span>공고기한</span>
              <span>
                {PBLANC_BEGIN_DE}~{PBLANC_END_DE}
              </span>
            </div>
            <div className="row">
              <span>보호센터</span>
              <span>{SHTER_NM}</span>
            </div>
            <div className="row">
              <span>보호센터 주소</span>
              <span>{REFINE_ROADNM_ADDR}</span>
            </div>
            <div className="row">
              <span>보호센터 연락처</span>
              <span>{SHTER_TELNO}</span>
            </div>
            <div className="row">
              <span>보호장소</span>
              <span>{PROTECT_PLC}</span>
            </div>
            <div className="row">
              <span>관할기관</span>
              <span>{JURISD_INST_NM}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="location">
        <p>{SHTER_NM} 위치</p>
        <Kakao
          lat={REFINE_WGS84_LAT}
          log={REFINE_WGS84_LOGT}
          kind={SPECIES_NM.split(" ")[0]}
        />
      </div>
    </div>
  );
}
