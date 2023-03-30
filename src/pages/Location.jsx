import React, { useState, useEffect } from "react";
import Shelter from "../components/Shelter";

export default function Location() {
  const [shelters, setShelters] = useState([]);

  //useEffect을 안 써서 like 애들이 엄청 계속 fetch된거구나
  //심지어 필요도 없는데? 이웬??
  // useEffect(() => {
  //   fetch("/data/shelter.json")
  //     .then((res) => res.json())
  //     .then((data) => setShelters(data));
  // }, []);

  return (
    <div>
      <Shelter shelters={shelters} />
    </div>
  );
}
