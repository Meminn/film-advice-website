# Moodvice 🎬 🎭

> *Tell us your mood, we'll advice you a movie to watch...*

## Overview

Moodvice is an innovative web application that recommends movies based on your current emotional state. Using sentiment analysis, Moodvice interprets how you're feeling and suggests films that complement your mood.

![Moodvice Banner](https://placehold.co/600x200/3498db/FFFFFF?text=Moodvice)

## Features

- **Intuitive Interface**: Clean, Google-like search experience for expressing your mood
- **Sentiment Analysis**: Advanced mood detection that understands emotional nuances 
- **Personalized Recommendations**: Custom movie suggestions tailored to your emotional state
- **Diverse Genre Mapping**: Thoughtful connections between emotions and film genres
- **Reroll Option**: Not satisfied? Get new suggestions with a single click

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **UI Framework**: React with Tailwind CSS
- **API Integration**: TMDB (The Movie Database) for rich movie data
- **Natural Language Processing**: Sentiment analysis library for mood detection
- **Deployment**: Ready for Vercel deployment

## How It Works

1. **Enter Your Mood**: Type how you're feeling in the search bar ("I'm feeling excited about my new job!")
2. **Analysis**: Our sentiment engine determines your emotional state
3. **Recommendation**: Based on your mood, we present three movie suggestions
4. **Discovery**: Explore movies that resonate with your current emotional state

## Mood-Genre Mapping

The app intelligently maps emotional states to appropriate film genres:

- **Very Positive**: Animation, Music, Comedy (Uplifting, joyful content)
- **Positive**: Comedy, Romance, Family (Light-hearted, warm content)  
- **Neutral**: Action, Adventure, Fantasy (Escapist entertainment)
- **Negative**: Drama, Mystery, Sci-Fi (Thought-provoking, reflective content)
- **Very Negative**: Thriller, Horror, Crime (Intense, cathartic content)

## Project Structure

```
moodvice/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage with search interface
│   │   └── recommendation/
│   │       └── page.tsx        # Results page with movie recommendations
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx      # Reusable button component
│   │   │   ├── Input.tsx       # Reusable input component
│   │   │   └── SearchBar.tsx   # Search bar component
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Header component
│   │   │   └── Footer.tsx      # Footer component
│   │   │
│   │   └── movies/
│   │       ├── MovieCard.tsx   # Individual movie card
│   │       ├── MovieGrid.tsx   # Grid layout for movies
│   │       └── RerollButton.tsx # Reroll functionality button
│   │
│   ├── services/
│   │   ├── tmdb/
│   │   │   ├── types.ts        # TMDB related types
│   │   │   └── api.ts          # TMDB API functions
│   │   │
│   │   └── sentiment/
│   │       ├── types.ts                  # Sentiment analysis types
│   │       ├── analyzer.ts               # Sentiment analysis logic
│   │       └── sentiment-genre-mapping.ts # Maps moods to genres
│   │
│   ├── styles/
│   │   └── globals.css         # Global styles and Tailwind imports
│   │
│   └── types/
│       └── index.ts            # Shared TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- TMDB API key (register at [https://www.themoviedb.org/](https://www.themoviedb.org/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/moodvice.git
   cd moodvice
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future Enhancements

- User accounts and favorite storage
- More detailed mood analysis
- Genre preference customization
- Movie trailer integration
- Streaming service availability information

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their comprehensive movie database
- [Sentiment](https://www.npmjs.com/package/sentiment) for text sentiment analysis
- Next.js and React communities for their excellent documentation

---

*Created with 🍿 and ❤️ for movie lovers everywhere*