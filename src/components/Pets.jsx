import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import PetCard from "./PetCard";
// import { useLikes } from "../context/LikeContext";
import "../styles/Pets.scss";

export default function Pets({ pets }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);

  // const { likes, handleAdd, handleDelete } = useLikes();

  // useEffect(() => {
  //   localStorage.setItem("likes", JSON.stringify(likes));
  // }, [likes]);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = pets.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="pets-container">
      <div className="pets">
        {currentPosts.map((pet) => (
          <PetCard
            key={pet.ABDM_IDNTFY_NO}
            pet={pet}
            // likes={likes}
            // onAdd={handleAdd}
            // onDelete={handleDelete}
          />
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
