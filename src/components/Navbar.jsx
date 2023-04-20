import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GrHomeRounded, GrLocation, GrBookmark } from "react-icons/gr";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="logo" onClick={scrollToTop}>
          <h1>BEFPEF</h1>
        </Link>
        <ul className={`links ${open ? "open" : "closed"}`}>
          <li onClick={handleOpen}>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <GrHomeRounded className="icon" />
            </Link>
          </li>
          <li onClick={handleOpen}>
            <Link to="/location">
              <GrLocation className="icon" />
            </Link>
          </li>
          <li onClick={handleOpen}>
            <Link to="/marklist">
              <GrBookmark className="icon" />
            </Link>
          </li>
        </ul>
        <div className="menu" onClick={handleOpen}>
          {open ? (
            <AiOutlineClose className="icon" />
          ) : (
            <AiOutlineMenu className="icon" />
          )}
        </div>
      </div>
    </nav>
  );
}
