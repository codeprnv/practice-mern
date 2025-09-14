// Shuffle array function
export const shuffleArray = (array) => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
};

// Filter unique and valid movies
export const getUniqueAndFilteredContent = (array) => {
   const seenTitles = new Set();
   return array.filter((movie) => {
      const title = movie.title || movie.name; // Use title for movies, name for TV shows
      if (
         seenTitles.has(title) ||
         !movie.backdrop_path ||
         !movie.poster_path ||
         !movie.id
      ) {
         return false;
      } else {
         seenTitles.add(title);
         return true;
      }
   });
};

// Shuffles, filters out duplicates, and ensures valid movie objects
export const shuffleAndFilterUniqueContent = (array) => {
   // Shuffle the array
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }

   // Filter unique and valid items
   const seenTitles = new Set();
   return array.filter((movie) => {
      const title = movie.title || movie.name;
      if (
         seenTitles.has(title) ||
         !movie.backdrop_path ||
         !movie.poster_path ||
         !movie.id
      ) {
         return false;
      }
      seenTitles.add(title);
      return true;
   });
};
