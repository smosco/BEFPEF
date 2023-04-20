import React, { useEffect } from "react";
const { kakao } = window;

export default function Kakao({ lat, log, shelter, kind }) {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(lat, log), //지도의 중심좌표.
      level: 7, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    let imageSrc;
    if (kind === "[개]") {
      imageSrc = "https://cdn-icons-png.flaticon.com/512/1623/1623792.png";
    } else if (kind === "[고양이]") {
      imageSrc = "https://cdn-icons-png.flaticon.com/512/2171/2171991.png";
    } else {
      imageSrc = "https://cdn-icons-png.flaticon.com/512/3196/3196017.png";
    }
    // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(50, 50); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
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

    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const content =
      '<div class="customoverlay">' +
      `    <span class="title">${shelter}</span>` +
      "</div>";
    // 커스텀 오버레이가 표시될 위치입니다
    const position = new kakao.maps.LatLng(lat, log);

    // 커스텀 오버레이를 생성합니다
    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      content: content,
      xAnchor: 0.5,
      yAnchor: 0.91,
    });
  }, []);
  return <div id="map"></div>;
}
