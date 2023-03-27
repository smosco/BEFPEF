import React from "react";
import PetCard from "../components/PetCard";
import { useLikes } from "../context/LikeContext";

export default function BeFriend() {
  const { likes, likeItems, handleDelete } = useLikes();

  return (
    <div>
      {likeItems.map((item) => (
        <PetCard key={item.ABDM_IDNTFY_NO} pet={item} />
      ))}
    </div>
  );
}
