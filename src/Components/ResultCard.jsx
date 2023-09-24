import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Chip, Rating, CardContent, Card, Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Carousel from "react-material-ui-carousel";
import "./ResultCard.css";

const ResultCard = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [currentSelectedReview, setCurrentSelectedReview] = useState("");
  const [currentSelectedHoursSection, setCurrentSelectedHoursSection] =
    useState("");
  const [currentSelectedServicesSection, setCurrentSelectedServicesSection] =
    useState("");
  const [searchResult, setSearchResult] = useState([]);
  const colorCombination = [
    "gold",
    "pink",
    "skyblue",
    "orange",
    "lightgreen",
    "cyan",
    "wheat",
  ];
  let colorCountStart = 0;

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login");
      enqueueSnackbar("Login to explore the destinations.", {
        variant: "warning",
      });
    }
  }, []);

  useEffect(() => {
    setSearchResult(
      JSON.parse(localStorage.getItem("searchDestinations")) || []
    );
  }, []);

  const CarouselItem = ({ reviewDetails }) => {
    const { userName, userAvatar, rating, publishTime, reviewText } =
      reviewDetails;

    let updatedReviewText = "";
    for (let i = 0; i < Math.min(350, reviewText.length); i++) {
      updatedReviewText += reviewText[i];
    }

    return (
      <div className="flex flex-col place-items-center justify-center">
        <div className="flex flex-col place-items-center justify-center">
          <Avatar
            src={userAvatar}
            alt={userName}
            className="hover:scale-125 hover:cursor-pointer active:scale-150"
            sx={{
              width: "54px",
              height: "54px",
              transition: ".25s ease-in-out",
              zIndex: 1,
            }}
          />
          <p
            style={{ fontFamily: '"Comfortaa", Verdana, sans-serif' }}
            className="font-bold text-sm mt-0.5 sm:text-base opacity-80 text-center"
          >
            {userName}
          </p>
          {rating ? (
            <Rating
              value={rating}
              readOnly
              sx={{ fontSize: "1rem", marginTop: ".25rem" }}
            />
          ) : (
            ""
          )}

          {publishTime ? (
            <p
              variant="body2"
              className="opacity-60 text-xs sm:text-sm text-center"
            >
              ({publishTime})
            </p>
          ) : (
            ""
          )}
        </div>

        {reviewText ? (
          <p
            variant="body2"
            className="mt-4 opacity-60 text-sm sm:text-base text-center review-text w-11/12 sm:w-10/12 md:w-9/12 xl:w-8/12 2xl:w-7/12"
          >
            ~ "{updatedReviewText}..."
          </p>
        ) : (
          ""
        )}
      </div>
    );
  };

  return localStorage.getItem("isLoggedIn") ? (
    <div style={{ minHeight: "40vh" , marginTop: "7rem", marginBottom: "6rem"}}>
      <div>
        {localStorage.getItem("category") &&
        localStorage.getItem("location") ? (
          <p
            style={{ animation: "fadeIn 2.5s ease-in-out" }}
            className="text-base md:text-lg lg:text-xl font-semibold opacity-90 text-blue-500 mt-24 sm:mt-24 mb-3.5 p-2 text-center"
          >
            Search result(s) for " {localStorage.getItem("category")} in{" "}
            {localStorage.getItem("location")} " :
          </p>
        ) : (
          <p
            style={{ animation: "fadeIn 2.5 ease-in-out" }}
            className="text-base md:text-lg lg:text-xl font-semibold opacity-90 text-blue-500 mt-24 sm:mt-24 mb-3.5 p-2 text-center"
          >
            Matching Search Results :
          </p>
        )}
      </div>

      {searchResult.map((result) => {
        return (
          <Card className="result-card shadow-2xl" key={result.id}>
            <CardContent className="card-content mb-6">
              <p className="opacity-90 font-extrabold text-2xl sm:text-3xl place-name">
                {result.displayName ? result.displayName.text : ""},
              </p>
              <p
                variant="body2"
                style={{ fontFamily: "'Comfortaa', Verdana, sans-serif" }}
                className="opacity-80 text-sm md:w-10/12 sm:text-base font-medium mt-1"
              >
                {result.formattedAddress ? result.formattedAddress : ""}
              </p>
              <div className="mt-3">
                {result.internationalPhoneNumber ? (
                  <p
                    variant="body2"
                    className="opacity-80 text-xs sm:text-sm text-blue-700 text-justify"
                  >
                    {result.internationalPhoneNumber}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-8 flex flex-col justify-center place-items-center flex-wrap gap-2">
                {result.rating ? (
                  <Rating
                    value={result.rating}
                    readOnly
                    className="mt-2 mb-4"
                    sx={{ fontSize: "1.5rem" }}
                  />
                ) : (
                  ""
                )}
                <div className="flex gap-2 flex-wrap justify-center place-items-center">
                  {result.types
                    ? result.types.map((type, index) => {
                        if (type !== "point_of_interest") {
                          if (colorCountStart === colorCombination.length - 1) {
                            colorCountStart = 0;
                          } else {
                            colorCountStart++;
                          }
                          return (
                            <Chip
                              label={type}
                              key={index}
                              className="opacity-90 font-semibold hover:scale-105"
                              sx={{
                                backgroundColor:
                                  colorCombination[colorCountStart],
                              }}
                            />
                          );
                        }
                      })
                    : ""}
                </div>
                {result.editorialSummary ? (
                  <p
                    variant="body2"
                    style={{ fontFamily: "'Comfortaa', Verdana, sans-serif" }}
                    className="opacity-70 text-gray-600 w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 text-center text-sm sm:text-base mt-5 mb-2"
                  >
                    ~ "{result.editorialSummary.text}"
                  </p>
                ) : (
                  ""
                )}
              </div>

              {result.dineIn ||
              result.delivery ||
              result.takeout ||
              result.servesBeer ||
              result.servesBreakfast ||
              result.servesBrunch ||
              result.servesDinner ||
              result.servesLunch ||
              result.servesVegetarianFood ||
              result.servesWine ||
              result.reservable ? (
                <div className="flex flex-col place-items-start mt-10 mb-3">
                  <p
                    style={{ transition: ".2s ease-in-out" }}
                    className="opacity-90 font-medium sm:text-lg text-center mb-1 cursor-pointer hover:opacity-90 active:translate-y-2"
                    onClick={() => {
                      if (currentSelectedServicesSection === result.id) {
                        setCurrentSelectedServicesSection("");
                      } else {
                        setCurrentSelectedServicesSection(result.id);
                      }
                    }}
                  >
                    Services & Features
                    <ArrowDropDownIcon />
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 pt-1.5 mb-1.5 sm:w-11/12 md:w-10/12 lg:w-9/12 ${
                      currentSelectedServicesSection !== result.id
                        ? "d-none"
                        : "reviews"
                    }
                             `}
                  >
                    {result.dineIn ? (
                      <Chip
                        label="Dine In"
                        className="opacity-90 font-medium hover:scale-105 bg-yellow-400"
                        sx={{
                          backgroundColor: "gold",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.delivery ? (
                      <Chip
                        label="Delivery"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "cyan",
                        }}
                      />
                    ) : (
                      ""
                    )}

                    {result.takeout ? (
                      <Chip
                        label="Takeout"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "darkgreen",
                          color: "white",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.reservable ? (
                      <Chip
                        label="Reservable"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "lightgreen",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.servesVegetarianFood ? (
                      <Chip
                        label="Serves Vegetarian Food"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "skyblue",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.servesBreakfast ? (
                      <Chip
                        label="Serves Breakfast"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "pink",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.servesLunch ? (
                      <Chip
                        label="Serves Lunch"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "yellow",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.servesDinner ? (
                      <Chip
                        label="Serves Dinner"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "lightblue",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.servesBrunch ? (
                      <Chip
                        label="Serves Brunch"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "wheat",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.servesBeer ? (
                      <Chip
                        label="Serves Beer"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "rebeccapurple",
                          color: "white",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {result.servesWine ? (
                      <Chip
                        label="Serves Wine"
                        className="opacity-90 font-medium hover:scale-105"
                        sx={{
                          backgroundColor: "orange",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {result.openingHours ? (
                <div className="flex flex-col place-items-start mt-3 mb-2">
                  <p
                    style={{ transition: ".2s ease-in-out" }}
                    className="opacity-90 font-medium sm:text-lg text-center mb-1 cursor-pointer hover:opacity-90 active:translate-y-2"
                    onClick={() => {
                      if (currentSelectedHoursSection === result.id) {
                        setCurrentSelectedHoursSection("");
                      } else {
                        setCurrentSelectedHoursSection(result.id);
                      }
                    }}
                  >
                    Opening Hours <ArrowDropDownIcon />
                  </p>
                  <ul
                    className={`flex flex-col gap-2 text-justify ${
                      currentSelectedHoursSection !== result.id
                        ? "d-none"
                        : "reviews"
                    }
                  `}
                  >
                    {result.openingHours
                      ? result.openingHours.weekdayDescriptions.map(
                          (description, index) => {
                            return (
                              <li
                                className="opacity-75 text-sm sm:text-base text-start"
                                key={index}
                              >
                                {description}
                              </li>
                            );
                          }
                        )
                      : ""}
                  </ul>
                </div>
              ) : (
                ""
              )}

              {result.reviews ? (
                <div className="flex flex-col">
                  <p
                    className="font-medium sm:text-lg cursor-pointer text-center opacity-90 hover:opacity-90 ml-1 mt-14 dropdown-btn"
                    onClick={() => {
                      if (currentSelectedReview === result.id) {
                        setCurrentSelectedReview("");
                      } else {
                        setCurrentSelectedReview(result.id);
                      }
                    }}
                  >
                    Reviews & Ratings <ArrowDropDownIcon />
                  </p>
                  <Carousel
                    interval={5000}
                    className={`ml-1 mt-3 p-2 sm:p-4 ${
                      currentSelectedReview !== result.id ? "d-none" : "reviews"
                    }`}
                  >
                    {result.reviews.map((review, index) => {
                      return (
                        <CarouselItem
                          key={index}
                          reviewDetails={{
                            userName: review.authorAttribution
                              ? review.authorAttribution.displayName
                              : null,
                            userAvatar: review.authorAttribution
                              ? review.authorAttribution.photoUri
                              : null,
                            rating: review.rating ? review.rating : null,
                            publishTime: review.relativePublishTimeDescription
                              ? review.relativePublishTimeDescription
                              : null,
                            reviewText: review.text ? review.text.text : "",
                          }}
                        />
                      );
                    })}
                  </Carousel>
                </div>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  ) : (
    ""
  );
};

export default ResultCard;
