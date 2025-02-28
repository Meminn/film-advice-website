import React from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';
import { Movie } from '../../services/tmdb/types';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading }) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
        No movies found
      </Typography>
    );
  }

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4}>
          <MovieCard
            title={movie.title}
            description={movie.overview}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;