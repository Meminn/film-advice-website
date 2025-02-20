import { getGenreRecommendations, GenreMapping } from './sentiment-genre-mapping';
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

  private analyzeSentiment(text: string): SentimentAnalysisResult {
    const cleanedText = this.cleanText(text);
    return this.sentiment.analyze(cleanedText);
  }

  private generateExplanation(score: number, genres: GenreMapping): string {
    const mood = this.getMoodDescription(score);
    return `Based on your ${mood} mood, we recommend movies from genres that match your current emotional state: ${genres.description}`;
  }

  private getMoodDescription(score: number): string {
    if (score <= -0.8) return "very negative";
    if (score <= -0.4) return "negative";
    if (score <= -0.1) return "slightly negative";
    if (score <= 0.2) return "neutral";
    if (score <= 0.5) return "positive";
    if (score <= 0.8) return "very positive";
    return "extremely positive";
  }

  public getMovieRecommendations(userInput: string): MovieRecommendation {
    const analysis = this.analyzeSentiment(userInput);
    const genreRecommendation = getGenreRecommendations(analysis.comparative);

    return {
      genreIds: genreRecommendation.genres,
      sentimentScore: analysis.comparative,
      explanation: this.generateExplanation(
        analysis.comparative,
        genreRecommendation
      )
    };
  }
}

// Example usage in your application:
const sentimentService = new SentimentAnalysisService();

export const analyzeUserMood = async (userInput: string) => {
  try {
    const recommendation = sentimentService.getMovieRecommendations(userInput);
    return recommendation;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw new Error('Failed to analyze sentiment and get recommendations');
  }
};

export type { MovieRecommendation, SentimentAnalysisResult };
export { SentimentAnalysisService };