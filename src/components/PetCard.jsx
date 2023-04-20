import React from "react";
import { useNavigate } from "react-router-dom";
import { dateFormat, sexFormat } from "../util/format";
import Mark from "./Mark";
import no from "../asset/no-image.jpg";

export default function PetCard({ pet }) {
  const navigate = useNavigate();
  const {
    ABDM_IDNTFY_NO,
    THUMB_IMAGE_COURS,
    IMAGE_COURS,
    RECEPT_DE,
    SPECIES_NM,
    SEX_NM,
    DISCVRY_PLC_INFO,
    SFETR_INFO,
    STATE_NM,
  } = pet;

  return (
    <div key={ABDM_IDNTFY_NO} className="petcard">
      {/*<div className="noticeNo">
        <span>고유번호 &nbsp;</span>
        <span>{ABDM_IDNTFY_NO}</span>
  </div>*/}

      <div className="box">
        <div
          className="img-container"
          onClick={() =>
            navigate(`/petDetail/${ABDM_IDNTFY_NO}`, { state: { pet } })
          }
        >
          <img src={`${IMAGE_COURS ? IMAGE_COURS : no}`} alt={ABDM_IDNTFY_NO} />
        </div>
        <div className="description">
          <Mark id={ABDM_IDNTFY_NO} pet={pet} />
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
        </div>
      </div>
    </div>
  );
}
