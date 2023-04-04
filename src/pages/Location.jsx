import React, { useState, useEffect } from "react";
import Pets from "../components/Pets";
import "../styles/Location.scss";
import { getShelterPets } from "../api/axios";
import NoResult from "../components/NoResult";

const { kakao } = window;

export default function Location() {
  const [pets, setPets] = useState([]);
  const [count, setCount] = useState("");
  const [shelter, setShelter] = useState("한국동물구조관리협회");

  useEffect(() => {
    window.scrollTo(0, 0);
    getShelterPets(shelter).then((data) => {
      setPets(data.length === 0 ? [] : data[1].row);
      setCount(data.length === 0 ? "0" : data[0].head[0].list_total_count);
    });
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.3658, 126.988), // 지도의 중심좌표
        level: 11, // 지도의 확대 레벨
      };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    const positions = [
      {
        title: "가평군유기동물보호소",
        latlng: new kakao.maps.LatLng(37.8459543, 127.4991358),
      },
      {
        title: "고양시동물보호센터",
        latlng: new kakao.maps.LatLng(37.6496069, 126.870066),
      },
      {
        title: "광주TNR동물병원송정",
        latlng: new kakao.maps.LatLng(37.41746097, 127.2752964),
      },
      {
        title: "수원시 동물보호센터",
        latlng: new kakao.maps.LatLng(37.2850336895, 127.0787149165),
      },
      {
        title: "남양주동물보호협회",
        latlng: new kakao.maps.LatLng(37.63389828, 127.2079274),
      },
      {
        title: "가나동물병원",
        latlng: new kakao.maps.LatLng(37.48350736, 126.7631747),
      },
      {
        title: "가야동물병원",
        latlng: new kakao.maps.LatLng(37.49060016, 126.7838949),
      },
      {
        title: "24시아이동물메디컬",
        latlng: new kakao.maps.LatLng(37.5256574, 126.8045482),
      },
      {
        title: "cj동물병원",
        latlng: new kakao.maps.LatLng(37.50029663, 126.7751273),
      },
      {
        title: "펫앤쉘터동물병원",
        latlng: new kakao.maps.LatLng(37.3670017, 127.1276345),
      },
      {
        title: "시흥동물누리보호센터",
        latlng: new kakao.maps.LatLng(37.37405365, 126.7427931),
      },
      {
        title: "한국야생동물보호협회",
        latlng: new kakao.maps.LatLng(37.3401156, 126.8700487),
      },
      {
        title: "스타캣츠",
        latlng: new kakao.maps.LatLng(37.3135805, 126.8367508),
      },
      {
        title: "이성준동물병원",
        latlng: new kakao.maps.LatLng(37.0065829, 127.274787),
      },
      {
        title: "한국동물구조관리협회",
        latlng: new kakao.maps.LatLng(37.8700531, 831861),
      },
      {
        title: "양평군유기동물보호소",
        latlng: new kakao.maps.LatLng(37.51079775, 127.5142953),
      },
      {
        title: "위더스 동물보호센터",
        latlng: new kakao.maps.LatLng(37.297553, 127.5756334),
      },
      {
        title: "오산 유기동물보호소",
        latlng: new kakao.maps.LatLng(37.149051, 127.065149),
      },
      {
        title: "용인시 동물보호센터",
        latlng: new kakao.maps.LatLng(37.243299, 127.1591338),
      },
      {
        title: "나은동물병원",
        latlng: new kakao.maps.LatLng(37.7659558096, 126.7753889745),
      },
      {
        title: "평택시유기동물보호소",
        latlng: new kakao.maps.LatLng(37.1306281469, 127.0554235932),
      },
      {
        title: "하남동물병원",
        latlng: new kakao.maps.LatLng(37.5371145, 127.204029),
      },
      {
        title: "남양동물보호센터",
        latlng: new kakao.maps.LatLng(37.22494992, 126.8434243),
      },
    ];

    // 마커 이미지의 이미지 주소입니다
    const imageSrc = "https://cdn-icons-png.flaticon.com/512/3010/3010995.png";

    // 마커 이미지의 이미지 크기 입니다
    const imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      kakao.maps.event.addListener(marker, "click", function () {
        setShelter(marker.Gb);
        getShelterPets(shelter).then((data) => {
          setPets(data.length === 0 ? [] : data[1].row);
          setCount(data.length === 0 ? "0" : data[0].head[0].list_total_count);
        });
      });
    }
  }, [shelter]);

  return (
    <div className="shelter-container">
      <p>가까운 보호소를 지도상에서 클릭해 주세요!</p>
      <div id="map"></div>
      {shelter && (
        <p>
          <span>{shelter}</span>에서 친구들이 기다리고 있어요
        </p>
      )}
      {pets.length === 0 && <NoResult />}
      <Pets pets={pets} />
    </div>
  );
}
