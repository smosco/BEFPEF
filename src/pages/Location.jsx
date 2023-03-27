import React, { useState, useEffect } from "react";
import Shelter from "../components/Shelter";

export default function Location() {
  const [shelters, setShelters] = useState([]);

  fetch("/data/shelter.json")
    .then((res) => res.json())
    .then((data) => setShelters(data));

  return (
    <div>
      <Shelter shelters={shelters} />
    </div>
  );
}
