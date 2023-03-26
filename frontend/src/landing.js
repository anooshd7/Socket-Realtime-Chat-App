import logo from "./sr2.png";
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./login";
import chatroom from "./chatroom";

function Landing() {
  let socket = io("http://localhost:8000");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message.text);
    });
  }, []);

  return (
    <div className="App h-full">
      <header className="App-header">
        <div className="wrapper">
          <h1 className="heading mt-36">Chat App</h1>
          <h2>
            The <span className="highlight">Realtime</span> Chat App
          </h2>
          <div className="Buttons">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/signup";
              }}
              class=" mt-12 px-24 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Get Started
            </button>

            {/* <button
              type="button"
              onClick={() => {
                // Emit socket event to join the room
                socket.emit("join", {
                  name: "John",
                  room: "Room " + Math.floor(Math.random() * 10),
                });
              
              window.location.href = "/login";
              }}
              class=" mt-12 px-24 focus:outline-none text-white bg-orange-400 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Login
            </button>  */}
          </div>

          <img src={logo} className="landing-img" alt="logo" />
        </div>
      </header>
    </div>
    // <Signup />
  );
}

export default Landing;
