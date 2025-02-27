// src/services/sentiment/sentiment.ts
import { getGenreRecommendations } from './sentiment-genre-mapping';
import Sentiment from 'sentiment';
import type { SentimentAnalysisResult, MovieRecommendation } from './types';

class SentimentAnalysisService {
  private sentiment: Sentiment;

  constructor() {
    this.sentiment = new Sentiment();
  }

  private cleanText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();
  }

  private analyzeSentiment(text: string): { score: number, comparative: number } {
    const cleanedText = this.cleanText(text);
    const result = this.sentiment.analyze(cleanedText);
    
    // Normalize the comparative score to be between -1 and 1
    // The 'comparative' value accounts for text length
    return {
      score: result.score,
      comparative: result.comparative
    };
  }

  private generateExplanation(score: number, genres: string[]): string {
    const mood = this.getMoodDescription(score);
    return `Based on your ${mood} mood, we recommend movies from genres that match your current emotional state: ${genres.join(', ')}`;
  }

  private getMoodDescription(score: number): string {
    if (score <= -0.6) return "very negative";
    if (score <= -0.2) return "negative";
    if (score <= 0.2) return "neutral";
    if (score <= 0.6) return "positive";
    return "very positive";
  }

  private getGenreNames(genreIds: number[]): string[] {
    const genreMap = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      10752: "War",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller"
    };
    
    return genreIds.map(id => genreMap[id as keyof typeof genreMap] || "Unknown");
  }

  public getMovieRecommendations(userInput: string): MovieRecommendation {
    console.log('Analyzing user input:', userInput);
    const analysis = this.analyzeSentiment(userInput);
    const genreRecommendation = getGenreRecommendations(analysis.comparative);
    const genreNames = this.getGenreNames(genreRecommendation.genres);

    console.log('Sentiment analysis results:', analysis);
    console.log('Recommended genres:', genreRecommendation.genres);

    return {
      genreIds: genreRecommendation.genres,
      sentimentScore: analysis.comparative,
      explanation: this.generateExplanation(
        analysis.comparative,
        genreNames
      )
    };
  }
}

// Create a singleton instance
const sentimentService = new SentimentAnalysisService();

export const analyzeUserMood = async (userInput: string): Promise<MovieRecommendation> => {
  try {
    console.log('Analyzing mood for:', userInput);
    const recommendation = sentimentService.getMovieRecommendations(userInput);
    return recommendation;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    // Return a default recommendation in case of error
    return {
      genreIds: [28, 12, 35], // Action, Adventure, Comedy as fallback
      sentimentScore: 0,
      explanation: "We've selected some popular movies for you to enjoy."
    };
  }
};

export type { MovieRecommendation, SentimentAnalysisResult };
export { SentimentAnalysisService };