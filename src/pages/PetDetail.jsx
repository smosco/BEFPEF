import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dateFormat, sexFormat, neutFormat } from "../util/format";
import Kakao from "../components/Kakao";
import Mark from "../components/Mark";

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
        AGE_INFO,
        BDWGH_INFO,
        SEX_NM,
        NEUT_YN,
        SFETR_INFO,
        SHTER_NM,
        REFINE_ROADNM_ADDR,
        SHTER_TELNO,
        PROTECT_PLC,
        IMAGE_COURS,
        REFINE_WGS84_LAT,
        REFINE_WGS84_LOGT,
      },
      pet,
    },
  } = useLocation();

  // 페이지 들어오면 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail container">
      <div className="top">
        <div className="img-container">
          <img src={IMAGE_COURS} alt={ABDM_IDNTFY_NO} />
          <Mark id={ABDM_IDNTFY_NO} pet={pet} />
        </div>
        <div className="description">
          <div className="noticeNo">
            <span>공고번호</span>
            <span>{PBLANC_IDNTFY_NO}</span>
          </div>
          <div className="table">
            <div className="row">
              <span>품종</span>
              <span>{SPECIES_NM.split("]")[1]}</span>
            </div>
            <div className="row">
              <span>성별</span>
              <span>{sexFormat(SEX_NM)}</span>
            </div>
            <div className="row">
              <span>중성화 여부</span>
              <span>{neutFormat(NEUT_YN)}</span>
            </div>
            <div className="row">
              <span>나이 / 체중</span>
              <span>
                {new Date().getFullYear() - AGE_INFO.slice(0, 4) + 1}살 / &nbsp;
                {BDWGH_INFO.split("(")[0]}kg
              </span>
            </div>
            <div className="row">
              <span>접수일시</span>
              <span>{dateFormat(RECEPT_DE)}</span>
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
                {dateFormat(PBLANC_BEGIN_DE)} ~ {dateFormat(PBLANC_END_DE)}
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
          </div>
        </div>
      </div>
      <div className="location">
        <p>
          <span>{SHTER_NM}</span>
          에서 기다리고 있어요!
        </p>
        <Kakao
          lat={REFINE_WGS84_LAT}
          log={REFINE_WGS84_LOGT}
          shelter={SHTER_NM}
          kind={SPECIES_NM.split(" ")[0]}
        />
      </div>
    </div>
  );
}
