import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { Buffer } from "buffer";
// import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "./APIRoutes";
import image_0 from "./0.png";
import image_2 from "./2.png";
import image_3 from "./3.png";
import image_4 from "./4.png";
import image_6 from "./6.png";
import image_7 from "./7.png";
import image_9 from "./9.png";
import image_10 from "./10.png";
import image_11 from "./11.png";
export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let image_array = [
    image_0,
    image_2,
    image_3,
    image_4,
    image_6,
    image_7,
    image_9,
    image_10,
    image_11,
  ];

  //   images array with 4 random images from the image_array
  let images = [];
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * image_array.length);
    // Push the base64 content from path to images array
    // Convert the image path
    images.push(image_array[random]);
    
image_array.splice(random, 1);
  }

  useEffect(() => {
    async function fetchAvatars() {
      if (localStorage.getItem("current-user"))
        // navigate("/login");
        console.log("hello");
    }
    fetchAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("current-user")
      );
      //log base 64 data of image
      // console.log(avatars.selectedAvatar.data);

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(data)

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "current-user",
          JSON.stringify(user)
        );
        navigate("/chatroom");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    // Set avatars to the state from images array

    images = images
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setAvatars(images);
    console.log("IMAGES");
    console.log(avatars);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          {/* <img src={loader} alt="loader" className="loader" /> */}
        </Container>
      ) : (
        <Container>
          <div className="title-container ">
            <div className="bg-white rounded-lg p-6">
            <h2>Pick an Avatar as your profile picture</h2>
            </div>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                    className="avatar-image"
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>

          <div className="refresh-container">
            <div className="rounded-lg p-2">
              <h2>Refresh the page to see more choices!</h2>
            </div>

          </div>
      
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #add8e6;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h2 {
      color: black;
      font-size: 2rem;
      
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      z-index: 1;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #add8e6;
      overflow: hidden;
      img {
        transform: scale(1.2);
      }
    }
  }
  .submit-btn {
    background-color: rgb(132 204 22);
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: rgb(101 163 13);
    }
  }
  .refresh-container {
    h2 {
      color: black;
      font-size: 1.3rem;
    }
  }
`;
