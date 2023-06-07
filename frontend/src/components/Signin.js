import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./SigninValidation";
import axios from "axios";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    const correctInput = errors.email === "" && errors.password === "";

    if (correctInput) {
      axios
        .post("http://localhost:8081/signin", values)
        .then((res) => {
          if (res.data === "success") navigate("/home");
          else console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              id="email"
              onChange={handleInput}
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              name="email"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              id="password"
              name="password"
              onChange={handleInput}
              type="password"
              placeholder="Enter password"
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-3"
          >
            <strong>Sign in</strong>
          </button>
          <Link
            to={"/signup"}
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;
