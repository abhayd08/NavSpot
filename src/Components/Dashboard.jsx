import { Stack, Avatar } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import "./Dashboard.css";

export default () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  const adventures = [
    {
      name: "Mount Forel",
      image: "/mount-forel.webp",
    },
    {
      name: "Camping",
      image: "/camping.webp",
    },
    {
      name: "Greenland",
      image: "/greenland.webp",
    },
    {
      name: "Rafting",
      image: "/rafting.webp",
    },
    {
      name: "Jojo",
      image: "/jojo.webp",
    },
  ];

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <>
      <div className="bg-white mt-20 m-auto p-1 pt-8 space-x-1 dashboard">
        <div className="space-x-4 dashboard-header">
          <div className="flex space-x-4 place-items-center justify-center flex-wrap pl-4 sm:pl-8 md:pl-12 lg:pl-16">
            <Avatar
              alt={username}
              src="/jeremy.webp"
              sx={{ width: "3rem", height: "3rem" }}
            />
            <Stack>
              <div>
                <span className="opacity-50 text-sm md:text-base">
                  Welcome back
                </span>
                <span>👋</span>
              </div>
              <p className="font-bold sm:text-base md:text-lg">{username}</p>
            </Stack>
          </div>
          <i className="fa-solid fa-bell bell pr-4 sm:pr-8 md:pr-12 lg:pr-16"></i>
        </div>
        <div className="explore-section mt-44">
          <div id="character">
            <img src="/character.webp" alt="Character" />
          </div>
          <div id="explore-content">
            <Stack>
              <p className="text-sm sm:text-base font-bold">
                Explore the Beauty
              </p>
              <p className="opacity-50 text-xs sm:text-sm">
                Get special offers & discount
              </p>
            </Stack>
            <ArrowCircleRightIcon
              sx={{ color: "#F98647" }}
              className="explore-icon"
              onClick={() => {
                navigate("/explore");
              }}
            />
          </div>
        </div>
        <Stack className="mt-24 content-box">
          <div className="flex place-items-center justify-between p-1">
            <p className="text-lg sm:text-xl font-bold">Popular Now</p>
          </div>
          <div className="p-1.5 pt-0 pb-0 adventures-container">
            <div className="adventure-list-container">
              <div className="adventure-list">
                {adventures.map((adventure, index) => (
                  <div
                    className="adventure"
                    onClick={() => {
                      enqueueSnackbar("Sold Out!", { variant: "warning" });
                    }}
                    key={index}
                    style={{ backgroundImage: `url(${adventure.image})` }}
                  >
                    <div className="adventure-content">
                      <span className="adventure-name bg-green-300 p-2 opacity-90">
                        {adventure.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Stack>
      </div>
    </>
  );
};
