// src/services/tmdb/api.ts
import type { Movie, MovieDetails, TMDBResponse } from './types';
import { getGenreRecommendations } from '../sentiment/sentiment-genre-mapping';

const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.TMDB_API_KEY,
  DEFAULT_PARAMS: {
    include_adult: "false",
    'vote_count.gte': "5000",
    'vote_average.gte': "6",
    'popularity.gte': "500",
    language: 'en-US',
    with_original_language: 'en',
    'release_date.lte': '2023-12-31'
  }
} 

class TMDBService {
  private readonly baseUrl: string = TMDB_CONFIG.BASE_URL;
  private readonly apiKey: string = TMDB_CONFIG.API_KEY!;

  private async fetchFromTMDB<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const queryParams = new URLSearchParams({
      api_key: this.apiKey,
      ...TMDB_CONFIG.DEFAULT_PARAMS,
      ...params
    });

    const response = await fetch(`${this.baseUrl}${endpoint}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status}`);
    }

    return response.json();
  }

  async getMoviesByGenres(genreIds: number[]): Promise<Movie[]> {
    const movies: Movie[] = [];
    const uniqueMovieIds = new Set<number>();
  
    for (const genreId of genreIds) {
      // Fetch a random page for variety
      const page = Math.floor(Math.random() * 5) + 1;
      const response = await this.fetchFromTMDB<TMDBResponse<Movie>>('/discover/movie', {
        with_genres: genreId.toString(),
        page: page,
      });
  
      // If no results, skip this genre
      if (response.results.length === 0) {
        console.warn(`No movies found for genre ID: ${genreId}`);
        continue;
      }
  
      // Iterate through the results to find a unique movie
      for (const movie of response.results) {
        if (!uniqueMovieIds.has(movie.id)) {
          uniqueMovieIds.add(movie.id);
          movies.push(movie);
          break; // Exit the loop once a unique movie is found
        }
      }
  
      // If no unique movie was found in the results, log a warning
      if (movies.length < genreIds.indexOf(genreId) + 1) {
        console.warn(`No unique movie found for genre ID: ${genreId}`);
      }
    }
  
    return movies;
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchFromTMDB<MovieDetails>(`/movie/${movieId}`);
  }

  async getPopularMovies(): Promise<Movie[]> {
    const response = await this.fetchFromTMDB<TMDBResponse<Movie>>('/movie/popular');
    return response.results.slice(0, 3);
  }

  async getMovieRecommendations(sentimentScore: number): Promise<Movie[]> {
    const genreRecommendation = getGenreRecommendations(sentimentScore);
    return this.getMoviesByGenres(genreRecommendation.genres);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await this.fetchFromTMDB<TMDBResponse<Movie>>('/search/movie', {
      query: encodeURIComponent(query)
    });
    return response.results;
  }
}

export const tmdbService = new TMDBService();