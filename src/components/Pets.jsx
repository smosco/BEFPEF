import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import PetCard from "./PetCard";
// import { useLikes } from "../context/LikeContext";

export default function Pets({ pets }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = pets.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="pets-container">
      <div className="pets">
        {currentPosts.map((pet) => (
          <PetCard key={pet.ABDM_IDNTFY_NO} pet={pet} />
        ))}
      </div>
      <Pagination
        totalPosts={pets.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}
