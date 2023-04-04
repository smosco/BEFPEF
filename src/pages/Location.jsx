import React, { useState, useEffect } from "react";
import Shelter from "../components/Shelter";

export default function Location() {
  const [shelters, setShelters] = useState([]);

  return (
    <div>
      <Shelter shelters={shelters} />
    </div>
  );
}
