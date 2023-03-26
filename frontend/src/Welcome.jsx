import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Robot from "../assets/robot.svg";
import Logout from "./Logout";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect( () => {
    async function fetchData() {
    setUserName(
      await JSON.parse(
        localStorage.getItem("current-user")
      ).username
    );
    }
    fetchData();
  }, []);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details mt-6">
          
          
        </div>
        <Logout />
      </div>

      <div className="chat-body">
        <div className="box">
          <h1>
            Welcome, <span>{userName}!</span>
          </h1>
          <h2 className="text-black ">&emsp;&emsp;&emsp; Select a chat to Start messaging.</h2>
        </div>


      </div>
      
      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }

  .chat-header {
    position: relative;
    top: -220px;
    margin-left: 865px;
  }

  .chat-body {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: white;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }



  

    

  
`;
