// src/services/tmdb/api.ts
import type { Movie, MovieDetails, TMDBResponse } from './types';

// Define a proper type for the params object
type TMDBParams = {
  [key: string]: string | number | boolean | undefined;
};

const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.TMDB_API_KEY, // Use your own TMDB API key
  DEFAULT_PARAMS: {
    include_adult: "false",
    'vote_count.gte': "100", 
    'vote_average.gte': "5",
    'popularity.gte': "10",
    language: 'en-US',
    with_original_language: 'en',
    'release_date.lte': '2024-12-31'
  } as TMDBParams
} 

// Genre metadata mapping (pages for each genre)
export const genreMetadata = new Map<number, number>([
  [28, 10], // Action
  [12, 10], // Adventure
  [16, 10], // Animation
  [35, 10], // Comedy
  [80, 10], // Crime
  [99, 1], // Documentary
  [18, 10], // Drama
  [10751, 10], // Family
  [14, 10], // Fantasy
  [36, 5], // History
  [27, 10], // Horror
  [10402, 5], // Music
  [9648, 10], // Mystery
  [10749, 10], // Romance
  [878, 10], // Science Fiction
  [10770, 5], // TV Movie
  [53, 10], // Thriller
]);

class TMDBService {
  private readonly baseUrl: string = TMDB_CONFIG.BASE_URL;
  private readonly apiKey: string = TMDB_CONFIG.API_KEY || 'YOUR_FALLBACK_KEY_HERE';

  private async fetchFromTMDB<T>(endpoint: string, params: TMDBParams = {}): Promise<T> {
    const queryParams = new URLSearchParams();

     // Add API key
    queryParams.append('api_key', this.apiKey);
    
    // Add default params from the config
    Object.entries(TMDB_CONFIG.DEFAULT_PARAMS).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
    
    // Add custom params from the function call
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    const url = `${this.baseUrl}${endpoint}?${queryParams}`; // Construct the full URL
    console.log('TMDB API Request URL:', url);
    
    const response = await fetch(url); // Make the request
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('TMDB API Error Response:', errorText);
      throw new Error(`TMDB API Error: ${response.status}`); // Throw an error if the response is not OK
    }

    return response.json();
  }

  async getMoviesByGenres(genreIds: number[]): Promise<Movie[]> {
    console.log('Getting movies for genres:', genreIds);
    
    const movies: Movie[] = [];
    const uniqueMovieIds = new Set<number>();
  
    // If no genres provided, fallback to popular movies
    if (!genreIds || genreIds.length === 0) {
      console.log('No genres provided, returning popular movies');
      return this.getPopularMovies();
    }

    try {
      // Fetch one random page of movies for each genre in parallel
      const responses = await Promise.all(
        genreIds.map(genreId => {
          const total_pages = genreMetadata.get(genreId) || 5; // Use genre-specific total_pages
          const randomPage = Math.floor(Math.random() * total_pages) + 1;
      
          return this.fetchFromTMDB<TMDBResponse<Movie>>('/discover/movie', {
            with_genres: genreId.toString(),
            page: randomPage,
            sort_by: 'popularity.desc'
          });
        })
      );
    
      // Process each genre's results
      for (const response of responses) {
        if (!response.results || response.results.length === 0) {
          console.log('No results for a genre');
          continue;
        }
        
        // Shuffle the results array to randomize selection
        const shuffled = [...response.results].sort(() => Math.random() - 0.5);
      
        // Try to find a unique movie in the shuffled results
        for (const movie of shuffled) {
          if (!uniqueMovieIds.has(movie.id) && movies.length < 3) {
            uniqueMovieIds.add(movie.id);
            movies.push({
              ...movie,
              poster_path: movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : null
            });
            break; // Move to the next genre after finding a unique movie
          }
        }
        
        // If we have enough movies, break early
        if (movies.length >= 3) break;
      }
    } catch (error) {
      console.error('Error fetching from TMDB:', error);
    }
  
    // If we couldn't get enough movies, fill with popular movies
    if (movies.length < 3) {
      console.log('Not enough genre-specific movies, fetching popular movies');
      const popularMovies = await this.getPopularMovies();
      
      for (const movie of popularMovies) {
        if (!uniqueMovieIds.has(movie.id) && movies.length < 3) {
          uniqueMovieIds.add(movie.id);
          movies.push(movie);
        }
      }
    }
    
    console.log(`Returning ${movies.length} movies`);
    return movies;
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchFromTMDB<MovieDetails>(`/movie/${movieId}`);
  }

  async getPopularMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB<TMDBResponse<Movie>>('/movie/popular');
    return response.results.slice(0, 3).map(movie => ({
      ...movie,
      poster_path: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : null
    }));
  }

  async getMovieRecommendations(sentimentScore: number, genreIds: number[]): Promise<Movie[]> {
    console.log('Getting recommendations for sentiment score:', sentimentScore);
    console.log('And genres:', genreIds);
    
    try {
      return this.getMoviesByGenres(genreIds);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return this.getPopularMovies();
    }
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await this.fetchFromTMDB<TMDBResponse<Movie>>('/search/movie', {
      query: query
    });
    return response.results.map(movie => ({
      ...movie,
      poster_path: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : null
    }));
  }
}

export const tmdbService = new TMDBService();