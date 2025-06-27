import axios from "axios";

export const truncateText = (text = "", maxLength = 100) => {
  if (text?.length <= maxLength) return text;
  const trimmedText = text?.slice(0, maxLength);
  return trimmedText.slice(0, trimmedText.lastIndexOf(" ")) + "...";
};

export const extractYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const fetchTrending = async ({
  trendingType = "movie",
  timeDuration = "week",
}) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/content/trending/${trendingType}/${timeDuration}`,
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching trending data: ", err.message || err);
    return { results: [] };
  }
};

export const fetchNowPlaying = async ({ type = "movie" }) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/content/${type}/now_playing`,
    );
    return res.data;
  } catch (err) {
    console.error("Error fetch now playing data: ", err.message || err);
    return { results: [] };
  }
};

export const fetchMovies = async ({
  movieType = "hindi",
  page = 1,
  adult = true,
  releaseDate = "2024-05-13,2025-05-13",
  sortBy = "popularity.desc",
  genre = "",
  origin = "",
}) => {
  try {
    const [gte, lte] = releaseDate.split(",");
    const res = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/content/movies/${movieType}?page=${page}&include_adult=${adult}&release_date.gte=${gte}&release_date.lte=${lte}&sort_by=${sortBy}${genre.length > 0 ? `&genre=${genre}` : ""}${origin.length > 0 ? `&origin=${origin}` : ""}`,
    );
    return res.data;
  } catch (err) {
    console.error(`Error fetching animation movies: ${err.message || err}`);
    return { results: [] };
  }
};
