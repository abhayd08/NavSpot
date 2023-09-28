import {
  Button,
  Stack,
  TextField,
  Rating,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Explore.css";

const Explore = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; // importing an API Key from the .env file
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(4);
  const [buttonContent, setButtonContent] = useState("Explore!");

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login");
      enqueueSnackbar("Login to explore the destinations.", {
        variant: "warning",
      });
    }
  }, []);

  const validateInput = (location, category) => {
    if (location.length < 2) {
      enqueueSnackbar("Enter a correct location to explore the destinations.", {
        variant: "warning",
      });
      return false;
    } else if (category.length < 2) {
      enqueueSnackbar("Enter a correct category to explore the destinations.", {
        variant: "warning",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e, category, location, rating, apiKey) => {
    e.preventDefault();
    let prompt = `${category} in ${location}`;
    setButtonContent(<CircularProgress sx={{ color: "white" }} />);
    try {
      const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchText",
        {
          textQuery: prompt,
          minRating: rating,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "places.id,places.displayName,places.formattedAddress,places.types,places.internationalPhoneNumber,places.delivery,places.dineIn,places.editorialSummary,places.rating,places.reservable,places.reviews,places.servesBeer,places.servesBreakfast,places.servesBrunch,places.servesDinner,places.servesLunch,places.servesVegetarianFood,places.servesWine,places.takeout,places.currentOpeningHours",
          },
        }
      );
      {
        response.data.places.length > 0 ||
        response.data.places.length !== undefined
          ? localStorage.setItem(
              "searchDestinations",
              JSON.stringify(response.data.places)
            )
          : localStorage.setItem(
              "searchDestinations",
              JSON.stringify([
                { formattedAddress: "No matching locations found." },
              ])
            );
      }
      localStorage.setItem("category", category);
      localStorage.setItem("location", location);
      navigate("/results");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("No match found. Try again with different filters.", {
        variant: "warning",
      });
    } finally {
      setButtonContent("Explore!");
    }
  };

  return (
    <>
      <div style={{ minHeight: "80vh" }}>
        <Header component="Explore" />
        {!localStorage.getItem("isLoggedIn") ? (
          ""
        ) : (
          <>
            <Stack spacing={2} className="explore-form p-6 md:p-8 xl:p-10">
              <h2 className="explore-title font-bold">Explore Places!</h2>
              <TextField
                label="Location"
                variant="outlined"
                title="Location"
                name="location"
                placeholder="Enter a Travel Location (e.g., City or Destination)"
                helperText="Type the name of your travel location, such as a city or destination, to find nearby places of interest."
                fullWidth
                required
                sx={{
                  marginTop: "1.25rem !important",
                  marginBottom: "1.25rem !important",
                }}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                value={location}
              />
              <TextField
                label="Category"
                variant="outlined"
                title="Category"
                name="category"
                fullWidth
                required
                placeholder="Enter a Category (e.g., Restaurants, Museums, Parks)"
                helperText="Enter a category that best describes your travel interests."
                sx={{
                  marginTop: "1.25rem !important",
                  marginBottom: "1.25rem !important",
                }}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: ".5rem",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <label htmlFor="rating">
                  <Typography variant="subtitle1" className="opacity-70">
                    Min Rating ?
                  </Typography>
                </label>
                <Rating
                  name="simple-controlled"
                  id="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <Button
                className="explore-button"
                variant="contained"
                onClick={(e) => {
                  if (validateInput(location, category)) {
                    handleSubmit(e, category, location, rating, apiKey);
                  }
                }}
              >
                {buttonContent}
              </Button>
            </Stack>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Explore;
