import React from "react";
import PetCard from "../components/PetCard";
import Pets from "../components/Pets";
import { useLikes } from "../context/LikeContext";
import "../styles/BeFriend.scss";

export default function BeFriend() {
  const { likes, likeItems, handleDelete } = useLikes();

  return (
    // <div className="like-container">
    //   {likeItems.map((item) => (
    //     <PetCard key={item.ABDM_IDNTFY_NO} pet={item} />
    //   ))}
    // </div>
    <div className="likes-container">
      <Pets pets={likeItems} />
    </div>
  );
}
