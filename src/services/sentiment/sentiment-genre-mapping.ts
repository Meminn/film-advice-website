import type { GenreMapping, SentimentMapping } from "./types";
// TMDB Genre IDs reference:
// Action: 28, 
// Adventure: 12, 
// Animation: 16, 
// Comedy: 35, 
// Crime: 80,
// Documentary: 99, 
// Drama: 18, 
// Family: 10751, 
// Fantasy: 14, 
// History: 36,
// Horror: 27, 
// Music: 10402,
// Mystery: 9648, 
// Romance: 10749,
// Science Fiction: 878, 
// TV Movie: 10770, 
// Thriller: 53,

const sentimentToGenreMapping: SentimentMapping[] = [
  {
    min: -Infinity,
    max: -0.8,
    mapping: {
      genres: [27, 53, 80], // Horror, Thriller, Crime
      description: "Very negative sentiment - intense, darker themes"
    }
  },
  {
    min: -0.8,
    max: -0.4,
    mapping: {
      genres: [9648, 80, 28], // Mystery, Crime, Action
      description: "Moderately negative - suspenseful, engaging content"
    }
  },
  {
    min: -0.4,
    max: -0.1,
    mapping: {
      genres: [878, 28, 53], // Science Fiction, Action, Thriller
      description: "Slightly negative - thought-provoking, high-energy content"
    }
  },
  {
    min: -0.1,
    max: 0.2,
    mapping: {
      genres: [18, 36, 10752], // Drama, History, War
      description: "Neutral sentiment - serious, contemplative content"
    }
  },
  {
    min: 0.2,
    max: 0.5,
    mapping: {
      genres: [12, 14, 878], // Adventure, Fantasy, Science Fiction
      description: "Moderately positive - imaginative, escapist content"
    }
  },
  {
    min: 0.5,
    max: 0.8,
    mapping: {
      genres: [35, 10749, 10402], // Comedy, Romance, Music
      description: "Very positive - uplifting, cheerful content"
    }
  },
  {
    min: 0.8,
    max: Infinity,
    mapping: {
      genres: [16, 10751, 35], // Animation, Family, Comedy
      description: "Extremely positive - wholesome, family-friendly content"
    }
  }
];

// Function to get genre recommendations based on sentiment score
function getGenreRecommendations(sentimentScore: number): GenreMapping {
  const mapping = sentimentToGenreMapping.find(
    range => sentimentScore > range.min && sentimentScore <= range.max
  );
  
  if (!mapping) {
    throw new Error(`Invalid sentiment score: ${sentimentScore}`);
  }
  
  return mapping.mapping;
}

export { 
  sentimentToGenreMapping, 
  getGenreRecommendations,
  type GenreMapping,
  type SentimentMapping 
};