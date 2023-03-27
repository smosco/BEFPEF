import React, { useState, useEffect } from "react";
import { agoDate, format } from "../util/DateFormatFn";
import PetCard from "./PetCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Grid, Pagination } from "swiper";

const date = new Date();

export default function Current() {
  const [current, setCurrent] = useState([]);

  console.log(current);

  // useEffect(() => {
  //   fetch(
  //     `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=029f99a01fbb42dba52abb947db9975e&Type=json&PBLANC_BEGIN_DE=${format(
  //       date,
  //       "-"
  //     )}&pSize=10`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCurrent(data.AbdmAnimalProtect[1].row);
  //     });
  // }, []);

  useEffect(() => {
    fetch(`data/current.json`)
      .then((res) => res.json())
      .then((data) => {
        setCurrent(data.AbdmAnimalProtect[1].row);
      });
  }, []);
  // useEffect(() => {
  //   const check = localStorage.getItem("current");
  //   if (check) {
  //     setCurrent(JSON.parse(check));
  //   } else {
  //     fetch("data/current.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         localStorage.setItem(
  //           "current",
  //           JSON.stringify(data.response.body.items.item)
  //         );
  //         setCurrent(data.response.body.items.item);
  //       });
  //   }
  // }, []);

  return (
    <div className="bg-[#f8f8f8] pt-8 pb-16 px-8">
      <h1 className="text-4xl font-bold mb-8">
        <b className="text-[#ff4d30]">" &nbsp;</b>
        공고 기한이 하루 밖에 남지 않은 친구들이에요
        <b className="text-[#ff4d30]">&nbsp;"</b>
      </h1>
      <Swiper
        slidesPerView={4}
        grid={{
          rows: 1,
        }}
        spaceBetween={30}
        modules={[Grid, Pagination]}
        className="mySwiper"
      >
        {current.map((item) => {
          return (
            <SwiperSlide key={item.desertionNo}>
              <PetCard pet={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
