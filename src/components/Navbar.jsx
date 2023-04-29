import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GrHomeRounded, GrLocation, GrBookmark } from "react-icons/gr";

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/add");
    } else {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  };
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
          <li onClick={handleOpen}>
            <Link to="/board">board</Link>
          </li>
          <li onClick={handleOpen}>
            <Link to="/mypage">mypage</Link>
          </li>
          {user ? (
            <button onClick={logout}>로그아웃</button>
          ) : (
            <Link to="/login">로그인</Link>
          )}
          <button onClick={handleClick}>write</button>
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
