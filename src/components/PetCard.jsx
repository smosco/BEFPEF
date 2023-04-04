import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateFormat, sexFormat } from "../util/format";
import "../styles/PetCard.scss";
import no from "../asset/no-image.jpg";
import Like from "./Like";
export default function PetCard({ pet }) {
  // const {
  //   noticeNo,
  //   kindCd,
  //   colorCd,
  //   sexCd,
  //   neuterYn,
  //   age,
  //   weight,
  //   happenDt,
  //   happenPlace,
  //   specialMark,
  //   noticeSdt,
  //   noticeEdt,
  //   careNm,
  //   careTel,
  //   careAddr,
  //   orgNm,
  //   officetel,
  //   noticeComment,
  //   filename,
  //   popfile,
  //   processState,
  // } = pet;
  // const { likes, handleAdd, handleDelete } = useLikes();
  // console.log(pet, likes);
  // 아니 뭐가 포함이 안된다는 거야
  // const [like, setLike] = useState(() => {
  //   if (likes.includes(pet)) {
  //     console.log("포함");
  //     return true;
  //   } else {
  //     console.log("안포함");
  //     return false;
  //   }
  // });

  // console.log(like);
  // const toggleHeart = () => {
  //   if (likes) {
  //     handleDelete(pet);
  //     setLike((prev) => !prev);
  //   } else {
  //     handleAdd(pet);
  //     setLike((prev) => !prev);
  //   }
  // };
  const navigate = useNavigate();

  // useEffect(() => {
  //   localStorage.setItem("likes", JSON.stringify(likes));
  // }, [likes]);

  const {
    ABDM_IDNTFY_NO,
    THUMB_IMAGE_COURS,
    RECEPT_DE,
    SPECIES_NM,
    SEX_NM,
    DISCVRY_PLC_INFO,
    SFETR_INFO,
    STATE_NM,
  } = pet;

  return (
    <div key={ABDM_IDNTFY_NO} className="petcard">
      <div className="noticeNo">
        <span>고유번호 &nbsp;</span>
        <span>{ABDM_IDNTFY_NO}</span>
      </div>
      <Like id={ABDM_IDNTFY_NO} pet={pet} />
      <div className="box">
        <div
          className="img-container"
          onClick={() =>
            navigate(`/petDetail/${ABDM_IDNTFY_NO}`, { state: { pet } })
          }
        >
          <img
            src={`${THUMB_IMAGE_COURS ? THUMB_IMAGE_COURS : no}`}
            alt={ABDM_IDNTFY_NO}
          />
        </div>
        <div className="description">
          <div className="row">
            <span>접수일시</span>
            <span>{dateFormat(RECEPT_DE)}</span>
          </div>
          <div className="row">
            <span>픔종</span>
            <span>{SPECIES_NM.split("]")[1]}</span>
          </div>
          <div className="row">
            <span>성별</span>
            <span>{sexFormat(SEX_NM)}</span>
          </div>
          <div className="row">
            <span>빌견장소</span>
            <span>{DISCVRY_PLC_INFO.substr(0, 10)}</span>
          </div>
          <div className="row">
            <span>특징</span>
            <span>{SFETR_INFO.substr(0, 10)}</span>
          </div>
          <div className="row">
            <span>상태</span>
            <span>{STATE_NM}</span>
          </div>
          {/* 
          <div
            className={`like-btn ${like ? "active" : ""}`}
            onClick={toggleHeart}
          >
            be friend
          </div> */}
        </div>
      </div>
    </div>
  );
}
