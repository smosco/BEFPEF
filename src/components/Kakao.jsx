import React, { useEffect } from "react";
const { kakao } = window;

export default function Kakao({ lat, log, kind }) {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(lat, log), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    let imageSrc;
    if (kind === "[개]") {
      imageSrc = "https://cdn-icons-png.flaticon.com/512/616/616408.png";
    } else if (kind === "[고양이]") {
      imageSrc = "https://cdn-icons-png.flaticon.com/512/616/616408.png";
    } else {
      imageSrc = "https://cdn-icons-png.flaticon.com/512/616/616430.png";
    } // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커가 표시될 위치입니다
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    const markerPosition = new kakao.maps.LatLng(lat, log);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);
  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
}
