// app/api/movies/routes.ts
import { NextResponse } from 'next/server';
import { tmdbService } from '@/services/tmdb/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sentimentScore = parseFloat(searchParams.get('sentimentScore') || '0');
  const genreIds = searchParams.get('genreIds')?.split(',').map(Number) || [];

  console.log('TMDB_API_KEY:', process.env.TMDB_API_KEY); // Log the API key
  console.log('Sentiment Score:', sentimentScore); // Log the sentiment score
  console.log('Genre IDs:', genreIds); // Log the genre IDs

  try {
    const recommendations = await tmdbService.getMovieRecommendations(sentimentScore, genreIds);
    console.log('Recommendations:', recommendations); // Log the recommendations
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}