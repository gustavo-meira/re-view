import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/types/Movie';

import { array } from 'zod';

type MovieListProps = {
  movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid h-fit w-full grid-cols-5 gap-2 p-2 text-white">
      {movies.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
}
