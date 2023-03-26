import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import dude from "./try.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const loginRoute = "http://localhost:8000/api/auth/login";
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    // Style for the toast
  };
  useEffect(() => {
    if (localStorage.getItem("current-user")) {
      navigate("/avatar");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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

        navigate("/avatar");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[#add8e6]">
        <img src={dude} alt="dude" className="w-1/3 ml-12" />
        <FormContainer>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand bg-white">
              <h1 className="bg-white mb-4">Login</h1>
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
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="w-full px-5 py-2.5 mb-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full px-5 py-2.5 mb-4 text-white bg-red-700 rounded-lg focus:outline-none hover:bg-red-800 focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
            >
              Login
            </button>
            <span>
              Don't have an account ? <Link to="/signup">Create One.</Link>
            </span>
          </form>
        </FormContainer>
        <ToastContainer />
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
    }
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 2rem;
    padding: 5rem;
  }

  span {
    color: black;
    a {
      background-color: white;
      color: #4e0eff;
    }
    background-color: white;
      font-weight: bold;
    }
  }
`;
