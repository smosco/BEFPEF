import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import Pets from "../components/Pets";
import Current from "../components/Current";
import { format, agoDate, dateForm } from "../util/DateFormatFn";
import Loader from "../components/Loader";
import "../styles/Home.scss";
import { getPets } from "../api/axios";

export default function Home() {
  const [query, setQuery] = useState({
    PBLANC_BEGIN_DE: "2023-03-24",
    PBLANC_END_DE: "",
    SIGUN_NM: "",
    SPECIES_NM: "",
  });
  const [pets, setPets] = useState([]);
  const [count, setCount] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  // 제출할때마다 다시 패치해준다
  const handleSubmit = (e) => {
    e.preventDefault();

    getPets(query).then((data) => {
      setPets(data[1].row);
      setCount(data[0].head[0].list_total_count);
    });
  };

  // 이게 없으면 처음 들어왔을떄 새로고침할때 패치가 안된다. 쿼리는 디펜던시에서 제거 제출도 안했는데 바뀜
  useEffect(() => {
    getPets(query).then((data) => {
      setPets(data[1].row);
      setCount(data[0].head[0].list_total_count);
    });
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
    <div className="container">
      <Current />
      <Category query={query} onChange={handleChange} onSubmit={handleSubmit} />
      {pets.length === 0 && <Loader />}
      <p className="count">전체 검색결과 &nbsp;{count}</p>
      <Pets pets={pets} />
    </div>
  );
}
