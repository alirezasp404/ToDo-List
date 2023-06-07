import React from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./SignupValidation";
import { useState } from "react";
import axios from "axios";
function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    const correctInput =
      errors.name === "" && errors.email === "" && errors.password === "";
    if (correctInput) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/");
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
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              id="name"
              name="name"
              onChange={handleInput}
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              id="email"
              name="email"
              onChange={handleInput}
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
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
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="terms"
              required
            />
            <label class="form-check-label" for="terms">
              I agree to the terms and conditions
            </label>
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-3 mt-3">
            <strong>Sign up</strong>
          </button>

          <Link
            to={"/"}
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signup;
