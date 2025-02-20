import { Suspense } from 'react';
import SearchBar from '@/components/ui/SearchBar';


/*export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
})  */

  
export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar />
      </div>
      
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Movie cards will be rendered here */}
        </div>
      </Suspense>
    </div>
  );
}

// src/app/recommendations/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MovieGrid } from '@/components/movies/MovieGrid';
import SearchBar from '@/components/ui/SearchBar';
import { tmdbService } from '@/services/tmdb/tmdb';
import { analyzeUserMood } from '@/services/sentiment/analyzer';
import type { Movie } from '@/types';

export default function RecommendationsPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt');

  const fetchRecommendations = async (userPrompt: string) => {
    setIsLoading(true);
    try {
      const sentiment = await analyzeUserMood(userPrompt);
      const recommendations = await tmdbService.getMovieRecommendations(
        sentiment.sentimentScore
      );
      setMovies(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (prompt) {
      fetchRecommendations(prompt);
    }
  }, [prompt]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar 
          onSearch={(newPrompt) => fetchRecommendations(newPrompt)}
          defaultValue={prompt || ''}
          placeholder="Update your mood..."
        />
      </div>
      <MovieGrid movies={movies} isLoading={isLoading} />
      <div className="mt-8 flex justify-center">
        <RerollButton 
          onClick={() => prompt && fetchRecommendations(prompt)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

