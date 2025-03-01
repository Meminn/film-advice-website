'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieGrid from '@/components/movies/MovieGrid';
import SearchBar from '@/components/ui/SearchBar';
import { analyzeUserMood } from '@/services/sentiment/sentiment';
import type { Movie } from '@/services/tmdb/types';
import RerollButton from '@/components/ui/RerollButton';

// Component to handle the search params and content
function RecommendationsContent() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prompt, setPrompt] = useState('');
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || '';

  const fetchRecommendations = async (userPrompt: string) => {
    // console.log('Fetching recommendations for prompt:', userPrompt);
    setIsLoading(true);
    
    try {
      const sentiment = await analyzeUserMood(userPrompt);
      // console.log('Sentiment analysis result:', sentiment);
      
      const response = await fetch(`/api/movies?sentimentScore=${sentiment.sentimentScore}&genreIds=${sentiment.genreIds.join(',')}`);
      // console.log('API Response:', response);

      const recommendations = await response.json();
      
      setMovies(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setIsLoading(false);
      // console.log('Finished fetching recommendations');
    }
  };

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      fetchRecommendations(initialPrompt);
    }
  }, [initialPrompt]);

  return (
    <>
      <div className="mb-8">
        <SearchBar 
          onSearch={(newPrompt) => {
            setPrompt(newPrompt);
            fetchRecommendations(newPrompt);
          }}
          defaultValue={initialPrompt}
          placeholder="Update your mood..."
        />
      </div>
      {movies.length > 0 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Movies that match your mood</h2>
          <p className="text-gray-600 dark:text-gray-400">Based on how you&apos;re feeling, we think you might enjoy these</p>
        </div>
      )}
      <MovieGrid movies={movies} isLoading={isLoading} />
      <div className="flex justify-center">
        <RerollButton 
          onReroll={() => prompt && fetchRecommendations(prompt)}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg">Loading recommendations...</p>
    </div>
  );
}

// Main page component with suspense boundary
export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingFallback />}>
        <RecommendationsContent />
      </Suspense>
    </div>
  );
}