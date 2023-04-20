import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import { getCurrent } from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Grid, Pagination } from "swiper";

export default function Current() {
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    getCurrent().then((data) => setCurrent(data[1].row));
  }, []);

  return (
    <div className="current">
      <h1 className="text-4xl font-bold mb-8">
        <b className="text-[#ff4d30]">" &nbsp;</b>
        공고 기한이 하루 밖에 남지 않은 친구들이에요
        <b className="text-[#ff4d30]">&nbsp;"</b>
      </h1>
      <Swiper
        slidesPerView={3}
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
