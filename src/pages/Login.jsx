import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/firebase";

export default function Login() {
  const [user, setUser] = useState({
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
    login(user)
      .then(navigate("/"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit}>
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
          <button> 로그인</button>
        </form>
        <p>
          You don't have an accout? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
