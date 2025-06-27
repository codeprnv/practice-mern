import * as helper from "../../utils/Data/helper";

export const sections = [
  {
    title: "Hindi Movies",
    queryKey: [
      "movies",
      "hindi",
      1,
      "popularity.desc",
      "2024-05-13,2025-05-13",
    ],
    queryFn: () =>
      helper.fetchMovies({
        movieType: "hindi",
        page: 1,
        sortBy: "popularity.desc",
        releaseDate: "2024-05-13,2025-05-13",
      }),
  },
  {
    title: "Marathi Movies",
    queryKey: [
      "movies",
      "marathi",
      1,
      "primary_release_date.desc",
      "2016-05-13,2025-05-13",
    ],
    queryFn: () =>
      helper.fetchMovies({
        movieType: "marathi",
        sortBy: "primary_release_date.desc",
        releaseDate: "2016-05-13,2025-05-13",
      }),
  },
  {
    title: "Animation Movies",
    queryKey: [
      "movies",
      "animation",
      1,
      "popularity.desc",
      "2024-05-13,2025-05-13",
      "16",
    ],
    queryFn: () =>
      helper.fetchMovies({
        movieType: "animation",
        genre: "16",
        sortBy: "popularity.desc",
        releaseDate: "2024-05-13,2025-05-13",
      }),
  },
  {
    title: "Mystery Movies",
    queryKey: [
      "movies",
      "mystery",
      1,
      "popularity.desc",
      "2024-05-13,2025-05-13",
    ],
    queryFn: () => helper.fetchMovies({ movieType: "mystery", genre: "9648" }),
  },
  {
    title: "Crime Movies",
    queryKey: [
      "movies",
      "crime",
      1,
      "popularity.desc",
      "2024-05-13,2025-05-13",
    ],
    queryFn: () => helper.fetchMovies({ movieType: "crime", genre: "80" }),
  },
];
