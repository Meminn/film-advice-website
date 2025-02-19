// src/lib/tmdb.ts

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Mood-to-Keyword Mapping
const moodKeywords = {
  bored: ['adventure', 'comedy', 'action', 'thriller'],
  heartbroken: ['romance', 'drama', 'family'],
  excited: ['action', 'sci-fi', 'adventure'],
  relaxed: ['comedy', 'documentary', 'family'],
  nostalgic: ['drama', 'family', 'animation'],
  anxious: ['thriller', 'horror', 'mystery'],
  motivated: ['biography', 'documentary', 'sports'],
  lonely: ['romance', 'drama', 'indie'],
  curious: ['mystery', 'documentary', 'history'],
  festive: ['family', 'fantasy', 'musical'],
  sleepy: ['animation', 'fantasy', 'drama'],
  romantic: ['romance', 'drama', 'musical'],
  adventurous: ['adventure', 'fantasy', 'action'],
  scared: ['horror', 'thriller', 'mystery'],
  // Add more moods and corresponding keywords
};

// Genre ID Mapping
const genreMapping = {
  adventure: 12,
  comedy: 35,
  action: 28,
  thriller: 53,
  romance: 10749,
  drama: 18,
  family: 10751,
  'sci-fi': 878,
  documentary: 99,
  horror: 27,
  mystery: 9648,
  fantasy: 14,
  animation: 16,
  history: 36,
  biography: 10402,
  musical: 10402,
  war: 10752,
  western: 37,
  crime: 80,
  indie: 10770,
  sports: 10765,
  // Add more genre mappings
};

// Function to fetch movies by genre IDs
export async function fetchMoviesByGenreIds(genreIds: string) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}
                                &with_genres=${genreIds}
                                &include_adult=false
                                &include_video=false
                                &language=en-US
                                &page=20
                                &sort_by=vote_average.desc
                                &vote_count.gte=500
                                &with_original_language=en
                                &release_date.lte=2023-12-31
                                &vote_average.gte=7.5
                                &popularity.gte=500
                                `
  );
  const data = await response.json();
  return data.results;
}

// Function to fetch popular movies
export async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

// Function to get genre IDs from mood keywords
function getGenreIdsFromMood(mood: string): string {
  const keywords = moodKeywords[mood as keyof typeof moodKeywords] || [];
  const genreIds = keywords.map(keyword => genreMapping[keyword as keyof typeof genreMapping]).join(',');
  return genreIds;
}

// Function to get movie recommendations based on mood
export async function getRecommendationsByMood(mood: string) {
  const genreIds = getGenreIdsFromMood(mood);
  let movies = [];

  if (genreIds) {
    movies = await fetchMoviesByGenreIds(genreIds);
  } else {
    movies = await fetchPopularMovies();
  }

  return movies;
}

// Function to fetch movie details by ID
export async function fetchMovieDetails(movieId: string) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

// Function to search movies by query
export async function searchMovies(query: string) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
}