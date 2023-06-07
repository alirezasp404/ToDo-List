import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./SigninValidation";
import axios from "axios";
import { ReactComponent as TodoImg } from "../../logo/task-list.svg";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    const correctInput = errors.email === "" && errors.password === "";

    if (correctInput) {
      axios
        .post("http://localhost:8081/signin", values)
        .then((res) => {
          if (res.data.status === "success") navigate(`/home/${res.data.id}`);
          else if (res.data.status === "wrongpassword")
            errors.password = "Wrong password! Try again";
          else
            errors.email =
              "The email address that you've entered doesn't match any account ! Please Create an account";
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
    <div className="d-flex justify-content-start align-items-center bg-info vh-100">
      <TodoImg width={700} className="todoimg"></TodoImg>
      <div className=" bg-white p-3 rounded w-25">
        <div className="d-flex justify-content-center pt-2 pb-5">
          <h1 className="todoTitle">ToDo</h1>
        </div>
        <h2 className="mb-4">Sign-In</h2>
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
          <button
            type="submit"
            className="btn btn-warning w-100 rounded-0 mb-3"
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
