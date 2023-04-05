import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { SiDatadog } from "react-icons/si";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

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
          <SiDatadog className="icon" />
          <h1>펫프</h1>
        </Link>
        <ul className={`links ${open ? "open" : "closed"}`}>
          <li onClick={handleOpen}>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              Home
            </Link>
          </li>
          <li onClick={handleOpen}>
            <Link to="/location">Location</Link>
          </li>
          <li onClick={handleOpen}>
            <Link to="/beFriend">Be Friend</Link>
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
