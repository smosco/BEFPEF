import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import Pets from "../components/Pets";
import { agoDate } from "../util/DateFormatFn";
import { getPets } from "../api/axios";
import NoResult from "../components/NoResult";
import Slider from "../components/Slider";

export default function Home() {
  const [query, setQuery] = useState({
    PBLANC_BEGIN_DE: agoDate(new Date(), 12),
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

  // 처음 들어왔을떄 새로고침할때 패치해준다. 쿼리를 디펜던시로 넣으면 계속 패치해옴.
  useEffect(() => {
    getPets(query).then((data) => {
      setPets(data.length === 0 ? [] : data[1].row);
      setCount(data.length === 0 ? "0" : data[0].head[0].list_total_count);
    });
  }, [query]);

  return (
    <div className="home container">
      <Slider />
      <Category query={query} onChange={handleChange} />
      <p className="count">{count} 마리의 친구들이 기다리고 있어요🐈🐕🦎</p>
      {pets.length === 0 && <NoResult />}
      <Pets pets={pets} />
    </div>
  );
}
