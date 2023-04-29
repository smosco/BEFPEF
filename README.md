
# PETFRIEND
<p align="center">
<img src="https://img.shields.io/badge/made by-smosco-red">
<img src="https://img.shields.io/badge/React-blue">
<img src="https://img.shields.io/badge/SCSS-magenta">
<img src="https://img.shields.io/badge/Open%20Source-🐶-mint">
</p>
  
<img width="100%" alt="thumbnail" src="https://user-images.githubusercontent.com/62870362/230266704-318f82e7-0cc4-4045-9e1d-e1cb5069dc6d.png">
  
### 👉 [Live Demo](https://befpef.netlify.app/)

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

### **3. 유기 동물 디테일 페이지**

📌 유기 동물의 이미지, 구체적인 정보를 사용자가 보기 쉽게 테이블로 만들었습니다.

![detail](https://user-images.githubusercontent.com/62870362/230269224-cd67d435-8b84-4d7f-b83c-5777ce059e8d.png)

### **4. 다시보고 싶은 유기동물 기록 페이지**

📌 Context API를 활용해 다시 보고 싶은 동물 데이터를 글로벌하게 관리해 어디서나 업데이트 할 수 있게 구현했습니다.

![like](https://user-images.githubusercontent.com/62870362/230270215-0253979a-d7d2-4938-ba53-ff39cf059834.png)

# **🔍 About the project**

**✅ 흩어져 있던 네트워크 통신 코드를 한 곳에 모아 관리했습니다.**

**✅ axios 라이브러리를 사용해 fetch보다 가독성 좋게 서버로부터 데이터를 받아왔습니다.**

**✅ 카테고리가 변경 될때마다 검색 조건을 query state으로 관리해 컴포넌트의 비즈니스 로직을 깔끔하게 관리했습니다.**

```jsx
// src/api/axios.js

// 카테고리 검색조건에 맞는 유기동물 데이터를 받아옵니다.
export const getPets = async (query) => {
  try {
    const data = await axios
      .get(
        `${BASE_URL}&SIGUN_NM=${query.SIGUN_NM}&PBLANC_BEGIN_DE=${query.PBLANC_BEGIN_DE}&PBLANC_END_DE=${query.PBLANC_END_DE}&SPECIES_NM=${query.SPECIES_NM}`,
        options
      )
      .then((res) =>
        res.data.AbdmAnimalProtect ? res.data.AbdmAnimalProtect : []
      );
    return data; //꼭 리턴 해주기
  } catch (err) {
    console.log(err.message);
  }

// 지도상에서 선택한 보호소에 상태가 보호중인 유기동물을 받아옵니다.    
export const getShelterPets = async (marker) => {
  try {
    const data = await axios
      .get(`${BASE_URL}&SHTER_NM=${marker.Gb}&STATE_NM=보호중`)
      .then((res) =>
        res.data.AbdmAnimalProtect ? res.data.AbdmAnimalProtect : []
      );
    return data; //꼭 리턴 해주기
  } catch (err) {
    console.log(err.message);
  }
};

```

```jsx
// src/page/Home.js
//...
  useEffect(() => {
    getPets(query).then((data) => {
      setPets(data[1].row);
      setCount(data[0].head[0].list_total_count);
    });
  }, [query]);

```

**✅ 어디서나 다시보고 싶은 동물을 업데이트 할 수 있도록 context api를 사용해 글로벌하게 상태를 관리했습니다.**

``` jsx
//src/ context/LikeContext.js

import { createContext, useContext, useEffect, useState } from "react";

const LikesContext = createContext();

// likes에는 id만 저장해서 include로 판단하고, api에서 id로 따로 불러올 수 없어서 pet까지 로컬에 저장함
export function LikesProvider({ children }) {
  const [likes, setLikes] = useState(readLikesFromLocal("likes"));
  const [likeItems, setLikeItems] = useState(readLikesFromLocal("likeItems"));

  const handleAdd = (id, pet) => {
    setLikes({ ...likes, id });
    setLikeItems([...likeItems, pet]);
  };

  const handleDelete = (id) => {
    setLikes(likes.filter((item) => item !== id));
    setLikeItems(likeItems.filter((item) => item.ABDM_IDNTFY_NO !== id));
  };

  // 처음 들어왔을때 로컬로 부터 읽고 나서 이걸 바로 로컬에 넣어줘야 한다. 그리고 set도 해줘야 한다.
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("likeItems", JSON.stringify(likeItems));
    setLikes(JSON.parse(localStorage.getItem("likes")));
    setLikeItems(JSON.parse(localStorage.getItem("likeItems")));
  }, []);

  return (
    <LikesContext.Provider
      value={{ likes, likeItems, handleAdd, handleDelete }}
    >
      {children}
    </LikesContext.Provider>
  );
}

function readLikesFromLocal(key) {
  const likes = localStorage.getItem(key);
  return likes ? JSON.parse(likes) : [];
}

export const useLikes = () => useContext(LikesContext);
 ```
**✅펫카드에서 includes 메소드를 사용해 찜한 상태인지 판단했습니다.** 

```jsx
//src/ components/Like.

const { likes, handleAdd, handleDelete } = useLikes();
  const [like, setLike] = useState(() => {
    if (likes.includes(pet)) {
      console.log("포함");
      return true;
    } else {
      console.log("안포함");
      return false;
    }
  });

  const toggleLike = () => {
    setLike((prev) => !prev);
    if (like) {
      handleDelete(pet);
    } else {
      handleAdd(pet);
    }
  };

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]); 
```

**✅카카오맵에 이벤트를 추가해 보호소를 클릭했을 때 보호소에 보호중인 동물을 받아왔습니다.**

 ```jsx
//src/page/Location.jsx
//...
kakao.maps.event.addListener(marker, "click", function () {
        setShelter(marker.Gb);
        getShelterPets(shelter).then((data) => {
          setPets(data.length === 0 ? [] : data[1].row);
          setCount(data.length === 0 ? "0" : data[0].head[0].list_total_count);
        });
      });
    }
  }, []); 
```

# **⏳ Future scope**

- 모바일에서 볼때 펫카드가 왜곡되는 것 해결하기
- 카카오맵 기능을 더 잘 활용해 보기
