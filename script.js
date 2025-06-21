const OMDB_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=85a906f";
const YOUTUBE_API_KEY = "AIzaSyAB2ZlUlY5Zl3qmzrHy7RIBp9TJM9hIr5E"; 

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieResults = document.getElementById("movieResults");
const favorites = document.getElementById("favorites");

// Load Favorites from Local Storage
let favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];

// Display Favorites on Page Load
document.addEventListener("DOMContentLoaded", () => {
  displayFavorites();
});

// Fetch Movies from OMDb API
async function fetchMovies(query) {
  try {
    const response = await fetch(`${OMDB_API_URL}&s=${query}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieResults.innerHTML = `<p>No movies found for "${query}".</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Display Movies in Results Section
function displayMovies(movies) {
  movieResults.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
      <img 
        src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" 
        alt="${movie.Title}" 
        style="cursor:pointer"
        onclick="openTrailer('${movie.Title}', '${movie.Year}')"
      />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title.replace("'", "\\" + "'")}', '${movie.Poster}', '${movie.Year}')">Add to Favorites</button>
    `;
    movieResults.appendChild(movieCard);
  });
}

// 🔗 Fetch Trailer from YouTube Data API
async function getTrailerVideoId(title, year) {
  const query = `${title} ${year} official trailer`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
}

// 🚀 Open Trailer
async function openTrailer(title, year) {
  const videoId = await getTrailerVideoId(title, year);

  if (videoId) {
    const trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(trailerUrl, "_blank");
  } else {
    alert("Trailer not found.");
  }
}

// Add Movie to Favorites
function addToFavorites(id, title, poster, year) {
  if (!favoriteMovies.some((movie) => movie.id === id)) {
    favoriteMovies.push({ id, title, poster, year });
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
    displayFavorites();
  }
}

// Display Favorites
function displayFavorites() {
  favorites.innerHTML = "";
  favoriteMovies.forEach((movie) => {
    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("movie-card");
    favoriteCard.innerHTML = `
      <img 
        src="${movie.poster !== 'N/A' ? movie.poster : 'placeholder.jpg'}" 
        alt="${movie.title}"
      />
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
      <button onclick="removeFromFavorites('${movie.id}')">Remove</button>
    `;
    favorites.appendChild(favoriteCard);
  });
}

// Remove Movie from Favorites
function removeFromFavorites(id) {
  favoriteMovies = favoriteMovies.filter((movie) => movie.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  displayFavorites();
}

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    sessionStorage.setItem("lastSearch", query);
    fetchMovies(query);
  }
});
