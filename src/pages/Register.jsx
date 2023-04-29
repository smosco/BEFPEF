import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/firebase";

export default function Register() {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register(user)
      .then(navigate("/login"))
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="displayName"
          value={user.displayName}
          placeholder="display name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button> 회원가입</button>
      </form>
      <p>
        You do have an accout? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
}
