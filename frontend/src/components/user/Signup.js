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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    const correctInput =
      errors.name === "" && errors.email === "" && errors.password === "";
    if (correctInput) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          if (res.data === "failed")
            errors.email = "You have already registered with this email";
          else navigate("/");
          setErrors(errors);
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
    <div className="d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="bg-white p-3 rounded w-25">
        <div className="d-flex justify-content-center pt-2 pb-5">
          <h1 className="todoTitle">ToDo</h1>
        </div>
        <h2 className="mb-4">Sign-Up</h2>
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
            <div className="input-group">
              <input
                id="password"
                name="password"
                onChange={handleInput}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="form-control rounded-0"
              />
              <button
                type="button"
                className="btn btn-outline-secondary rounded-0 border-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <div class="form-check mb-3">
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
          <button className="btn btn-warning w-100 rounded-0 mb-3 mt-3">
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
