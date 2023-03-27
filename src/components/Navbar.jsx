import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { SiDatadog } from "react-icons/si";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <SiDatadog className="icon" />
        <h1>펫프</h1>
      </Link>
      <ul className="links">
        <li>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/location">Location</Link>
        </li>
        <li>
          <Link to="/beFriend">Be Friend</Link>
        </li>
      </ul>
    </nav>
  );
}
