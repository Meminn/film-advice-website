// Type definitions for sentiment analysis and movie recommendation
export interface SentimentAnalysisResult {
  score: number;
  comparative: number;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
}

export interface MovieRecommendation {
  genreIds: number[];
  sentimentScore: number;
  explanation: string;
}

// Types for sentiment mapping
export interface GenreMapping {
  genres: number[];  // TMDB genre IDs
  description: string;
}

export interface SentimentMapping {
  min: number;
  max: number;
  mapping: GenreMapping;
}