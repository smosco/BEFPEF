import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn, MdCategory } from "react-icons/md";
import "../styles/Category.scss";

const regions = [
  "전체",
  "가평군",
  "고양시",
  "과천시",
  "광명시",
  "광주시",
  "구리시",
  "군포시",
  "김포시",
  "남양주시",
  "동두천시",
  "부천시",
  "성남시",
  "수원시",
  "시흥시",
  "안산시",
  "안성시",
  "안양시",
  "양주시",
  "양평군",
  "여주시",
  "연천군",
  "오산시",
  "용인시",
  "기흥구",
  "의왕시",
  "의정부시",
  "이천시",
  "파주시",
  "포천시",
  "하남시",
  "화성시",
];

export default function Category({ query, onChange, onSubmit }) {
  const { PBLANC_BEGIN_DE, PBLANC_END_DE, SIGUN_NM, SPECIES_NM } = query;

  return (
    <div className="category-container">
      <h1>SEARCH</h1>
      <div className="category">
        <form className="form" onSubmit={onSubmit}>
          {/* 유기 날짜  */}
          <div className="box-form">
            <label className="label" htmlFor="bgnde">
              <FaCalendarAlt className="icon" />
              &nbsp; 날짜
              <b>*</b>
            </label>
            <div className="calender">
              <input
                className="input"
                name="PBLANC_BEGIN_DE"
                id="PBLANC_BEGIN_DE"
                value={PBLANC_BEGIN_DE}
                onChange={onChange}
                type="date"
              ></input>
              <input
                className="input"
                name="PBLANC_END_DE"
                id="PBLANC_END_DE"
                value={PBLANC_END_DE}
                onChange={onChange}
                type="date"
              ></input>
            </div>
          </div>
          {/* 시도 */}
          <div className="box-form">
            <label className="label" htmlFor="SIGUN_NM">
              <MdLocationOn className="icon" />
              &nbsp;시군구
              <b>*</b>
            </label>
            <select
              className="select"
              name="SIGUN_NM"
              id="SIGUN_NM"
              value={SIGUN_NM}
              onChange={onChange}
            >
              {regions.map((region, idx) => (
                <option value={region !== "전체" ? region : ""} key={idx}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* 품종 */}
          <div className="box-form">
            <label className="label" htmlFor="SPECIES_NM">
              <MdCategory className="icon" />
              &nbsp;품종
              <b>*</b>
            </label>
            <select
              className="select"
              name="SPECIES_NM"
              id="SPECIES_NM"
              value={SPECIES_NM}
              onChange={onChange}
            >
              <option value="">전체</option>
              <option value="[개]">개</option>
              <option value="[고양이]">고양이</option>
              <option value="[기타축종]">기타</option>
            </select>
          </div>
          <button className="button" type="submit">
            검색
          </button>
        </form>
      </div>
    </div>
  );
}
