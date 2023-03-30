import React, { useState, useEffect } from "react";
import Pets from "./Pets";
import "../styles/Shelter.scss";

const { kakao } = window;

export default function Shelter() {
  const [pets, setPets] = useState([]);
  const [shelter, setShelter] = useState("");
  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.633898, 127.2079274), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    const positions = [
      {
        title: "가평군동물보호센터",
        latlng: new kakao.maps.LatLng(37.8459543, 127.4991358),
      },
      {
        title: "고양시동물보호센터",
        latlng: new kakao.maps.LatLng(37.6496069, 126.870066),
      },
      {
        title: "광주TNR동물병원",
        latlng: new kakao.maps.LatLng(37.41746097, 127.2752964),
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
        title: "CJ동물병원",
        latlng: new kakao.maps.LatLng(37.50029663, 126.7751273),
      },
      {
        title: "펫토피아동물병원",
        latlng: new kakao.maps.LatLng(37.3670017, 127.1276345),
      },
      {
        title: "수원시동물보호센터",
        latlng: new kakao.maps.LatLng(37.28501037, 127.0786968),
      },
      {
        title: "시흥시동물누리보호센터",
        latlng: new kakao.maps.LatLng(37.37405365, 126.7427931),
      },
      {
        title: "한국야생동물보호협회",
        latlng: new kakao.maps.LatLng(37.3401156, 126.8700487),
      },
      {
        title: "스타동물병원",
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
        title: "양평군동물보호센터",
        latlng: new kakao.maps.LatLng(37.51079775, 127.5142953),
      },
      {
        title: "위더스동물메디컬센터 부설동물보호센터",
        latlng: new kakao.maps.LatLng(37.297553, 127.5756334),
      },
      {
        title: "오산시 수의사회",
        latlng: new kakao.maps.LatLng(37.149051, 127.065149),
      },
      {
        title: "용인시동물보호센터",
        latlng: new kakao.maps.LatLng(37.243299, 127.1591338),
      },
      {
        title: "파주시 수의사회",
        latlng: new kakao.maps.LatLng(37.86064623, 126.7781643),
      },
      {
        title: "농업회사법인 주식회사 달래",
        latlng: new kakao.maps.LatLng(37.13063033, 127.0554225),
      },
      {
        title: "하남동물병원",
        latlng: new kakao.maps.LatLng(37.5371145, 127.204029),
      },
      {
        title: "남양유기견보호센터",
        latlng: new kakao.maps.LatLng(37.22494992, 126.8434243),
      },
    ];

    // 마커 이미지의 이미지 주소입니다
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

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
        // 클릭한 위도, 경도 정보를 가져옵니다
        // console.log(marker.Gb);
        // fetch(
        //   `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=029f99a01fbb42dba52abb947db9975e&Type=json&SHTER_NM=${marker.Gb}&STATE_NM=보호중&pSize=20`
        // )
        //   .then((res) => res.json())
        //   .then((data) => {
        //     //데이터 없는 경우가 많아서 꼭 확인해야 한다.
        //     setPets(
        //       data.AbdmAnimalProtect ? data.AbdmAnimalProtect[1].row : []
        //     );
        //     // setCount(
        //     //   data.AbdmAnimalProtect
        //     //     ? data.AbdmAnimalProtect[0].head[0].list_total_count
        //     //     : ""
        //     // );
        //   });
        setShelter(marker.Gb);
        fetch(`data/shelterPets.json`)
          .then((res) => res.json())
          .then((data) => {
            //데이터 없는 경우가 많아서 꼭 확인해야 한다.
            setPets(
              data.AbdmAnimalProtect ? data.AbdmAnimalProtect[1].row : []
            );
            // setCount(
            //   data.AbdmAnimalProtect
            //     ? data.AbdmAnimalProtect[0].head[0].list_total_count
            //     : ""
            // );
          });
      });
    }
  }, []);

  return (
    <div className="shelter-container">
      <div id="map"></div>
      {shelter && (
        <p>
          <span>{shelter}</span>에서 친구들이 기다리고 있어요
        </p>
      )}
      <Pets pets={pets} />
    </div>
  );
}
