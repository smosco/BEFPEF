import React, { useEffect, useState } from "react";
import { getCurrent } from "../api/axios";
import PetCard from "./PetCard";
import "../styles/Slider.scss";

export default function Slider() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const [current, setCurrent] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postPerPage, setPostPerPage] = useState(() => {
    if (windowWidth < 768) {
      return "1";
    } else if (windowWidth < 1024) {
      return "2";
    } else {
      return "3";
    }
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (windowWidth < 768) {
      setPostPerPage("1");
    } else if (windowWidth < 1024) {
      setPostPerPage("2");
    } else {
      setPostPerPage("3");
    }
  }, [windowWidth]);

  useEffect(() => {
    getCurrent().then((data) => setCurrent(data[1].row));
  }, []);

  const TOTAL_SLIDES = Math.ceil(current.length / postPerPage) - 1;
  const lastPostIndex = (currentSlide + 1) * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = current.slice(firstPostIndex, lastPostIndex);

  // Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="slider-container">
      <h2>공고기한이 얼마 남지 않은 친구들이에요!</h2>
      <div className="slides">
        {currentPosts.map((item) => (
          <PetCard key={item.ABDM_IDNTFY_NO} pet={item} />
        ))}
      </div>
      <div className="button-container">
        <button onClick={PrevSlide}>Prev</button>
        <button onClick={NextSlide}>Next</button>
      </div>
    </div>
  );
}
