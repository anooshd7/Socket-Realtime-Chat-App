import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hello from "./try.png";

export default function Register() {
  let registerRoute = "http://localhost:8000/api/auth/register";
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("current-user")) {
      navigate("/Avatar");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "current-user",
          JSON.stringify(data.user)
        );
        navigate("/Avatar");
      }
    }
  };

  return (
    <>
      <div className="h-full">
        <div className="flex items-center justify-start h-screen">
          <img src={hello} alt="hello" className="w-1/3 ml-24" />
          <FormContainer>
            <form action="" onSubmit={(event) => handleSubmit(event)}>
              <div className="brand">
                {/* <img src={Logo} alt="logo" /> */}
                <h1>Sign Up</h1>
              </div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
                min="3"
                className="w-full px-5 py-2.5 mb-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
                min="3"
                className="w-full px-5 py-2.5 mb-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
                className="w-full px-5 py-2.5 mb-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                className="w-full px-5 py-2.5 mb-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
              />

              <button
                type="submit"
                className="w-full px-5 py-2.5 mb-4 text-white bg-red-700 rounded-lg focus:outline-none hover:bg-red-800 focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
              >
                Create User
              </button>
              <span>
                Already have an account ? <Link to="/login">Login.</Link>
              </span>
            </form>
          </FormContainer>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #add8e6;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      margin-bottom: 2vh;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  span {
    color: black;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
