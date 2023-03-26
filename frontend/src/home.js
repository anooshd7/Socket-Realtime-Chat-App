function App() {
  return (
    <div className="App bg-[#add8e6]">
      <header className="App-header">
        <div className="wrapper bg-[#add8e6]">
          <h1 className="heading mt-36">Chat App</h1>
          <h2>
            The <span className="highlight">Realtime</span> Chat App
          </h2>
          <button
            type="button"
            // onClick={() => {
            //   // Emit socket event to join the room
            //   socket.emit("join", {
            //     name: "John",
            //     room: "Room " + Math.floor(Math.random() * 10),
            //   });
            // }}
            class=" mt-12 px-24 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Get Started
          </button>
          <img src={logo} className="landing-img" alt="logo" />
        </div>
      </header>
    </div>
  );
}
