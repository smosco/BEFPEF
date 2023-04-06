# PETFRIEND
<p align="center">
<img src="https://img.shields.io/badge/made by-smosco-red">
<img src="https://img.shields.io/badge/React-blue">
<img src="https://img.shields.io/badge/SCSS-magenta">
<img src="https://img.shields.io/badge/Open%20Source-🐶-mint">
</p>
  
<img width="100%" alt="thumbnail" src="https://user-images.githubusercontent.com/62870362/230266704-318f82e7-0cc4-4045-9e1d-e1cb5069dc6d.png">
  
### 👉 [Live Demo](https://petf.netlify.app)

## **📜요약**
경기도 데이터 드림의 유기동물 보호 현황 open api를 사용해 경기도 지역의 유기 동물을 시군구, 공고일, 품종에 따라 조회하고 지도 상에서 가까운 보호소를 찾아 유기 동물 입양을 돕는 서비스입니다.

1. Skills: React, React Router, SCSS
2. Use: Postman, 경기도 데이터 드림 유기동물 보호 현황 open api, 카카오맵 api, axios
3. Deploy: Netlify

## **📜페이지별 구현 기능**
### **1. 홈페이지**
📌 공고기한이 얼마 남지 않은 유기동물을 반응형 멀티 슬라이더로 보여줍니다.

![multiSlider](https://user-images.githubusercontent.com/62870362/230267750-ebe144e3-bb52-41b0-9604-6da162a72f9a.png)

📌 공고일, 시군구, 품종 카테고리에 맞는 유기 동물을 조회할 수 있습니다.

![category](https://user-images.githubusercontent.com/62870362/230268002-3a371812-6716-4f63-be2f-f8f9c3e4dc50.png)

### **2. 지도 페이지**

📌 카카오맵 상의 유기 동물 보호소 위치를 클릭하면 보호중인 유기 동물을 보여줍니다.

![map](https://user-images.githubusercontent.com/62870362/230268840-8e1e9e05-6af0-4b77-8952-03b3981b6e7f.png)

### **2. 유기 동물 디테일 페이지**

📌 유기 동물의 이미지, 구체적인 정보를 사용자가 보기 쉽게 테이블로 만들었습니다.

![detail](https://user-images.githubusercontent.com/62870362/230269224-cd67d435-8b84-4d7f-b83c-5777ce059e8d.png)

### **3. 다시보고 싶은 유기동물 기록 페이지**

📌 Context API를 활용해 다시 보고 싶은 동물 데이터를 글로벌하게 관리해 어디서나 업데이트 할 수 있게 구현했습니다.

![like](https://user-images.githubusercontent.com/62870362/230270215-0253979a-d7d2-4938-ba53-ff39cf059834.png)

