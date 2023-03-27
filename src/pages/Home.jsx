import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import Pets from "../components/Pets";
import Current from "../components/Current";
import { format, agoDate, dateForm } from "../util/DateFormatFn";
import Loader from "../components/Loader";

export default function Home() {
  const [query, setQuery] = useState({
    PBLANC_BEGIN_DE: agoDate(new Date(), 360), //,
    PBLANC_END_DE: format(new Date(), "-"),
    SIGUN_NM: "",
    SPECIES_NM: "",
  });
  const [pets, setPets] = useState([]);
  const [count, setCount] = useState("");

  console.log(query);
  // console.log(query.bgnde.replace(/-/g, ""));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  // 제출할때마다 다시 패치해준다
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("data/pets.json")
      .then((res) => res.json())
      .then((data) => {
        //데이터 없는 경우가 많아서 꼭 확인해야 한다.
        setPets(data.AbdmAnimalProtect ? data.AbdmAnimalProtect[1].row : []);
        setCount(
          data.AbdmAnimalProtect
            ? data.AbdmAnimalProtect[0].head[0].list_total_count
            : ""
        );
      });
    // fetch(
    //   `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=029f99a01fbb42dba52abb947db9975e&Type=json&SIGUN_NM=${query.SIGUN_NM}&PBLANC_BEGIN_DE=${query.PBLANC_BEGIN_DE}&PBLANC_END_DE=${query.PBLANC_END_DE}&SPECIES_NM=${query.SPECIES_NM}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //데이터 없는 경우가 많아서 꼭 확인해야 한다.
    //     setPets(data.AbdmAnimalProtect ? data.AbdmAnimalProtect[1].row : []);
    //     setCount(
    //       data.AbdmAnimalProtect
    //         ? data.AbdmAnimalProtect[0].head[0].list_total_count
    //         : ""
    //     );
    //   });
  };

  // 이게 없으면 처음 들어왔을떄 새로고침할때 패치가 안된다. 쿼리는 디펜던시에서 제거 제출도 안했는데 바뀜

  useEffect(() => {
    fetch("data/pets.json")
      .then((res) => res.json())
      .then((data) => {
        //데이터 없는 경우가 많아서 꼭 확인해야 한다.
        setPets(data.AbdmAnimalProtect ? data.AbdmAnimalProtect[1].row : []);
        setCount(
          data.AbdmAnimalProtect
            ? data.AbdmAnimalProtect[0].head[0].list_total_count
            : ""
        );
      });
    // fetch(
    //   `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=029f99a01fbb42dba52abb947db9975e&Type=json&SIGUN_NM=${query.SIGUN_NM}&PBLANC_BEGIN_DE=${query.PBLANC_BEGIN_DE}&PBLANC_END_DE=${query.PBLANC_END_DE}&SPECIES_NM=${query.SPECIES_NM}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //데이터 없는 경우가 많아서 꼭 확인해야 한다.
    //     setPets(data.AbdmAnimalProtect ? data.AbdmAnimalProtect[1].row : []);
    //     setCount(
    //       data.AbdmAnimalProtect
    //         ? data.AbdmAnimalProtect[0].head[0].list_total_count
    //         : ""
    //     );
    //   });
  }, []);

  console.log(pets, "pets보내기 전에 확인", count);

  // useEffect(() => {
  //   fetch("data/pets.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPets(data.response.body.items.item);
  //       setCount(data.response.body.totalCount);
  //     });
  // }, []);

  return (
    <div className="flex flex-col gap-16 px-16">
      <Current />
      <Category query={query} onChange={handleChange} onSubmit={handleSubmit} />
      {pets.length === 0 && <Loader />}
      <p className="text-3xl text-gray-500">전체 검색결과 &nbsp;{count}</p>
      <Pets pets={pets} />
    </div>
  );
}
