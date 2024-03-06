'use client';

import MovieList from '@/components/MovieList';
import MoviesPagination from '@/components/MoviesPagination';
import Navbar from '@/components/Navbar';
import { Movie } from '@/types/Movie';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type URLResponse = {
  movies: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams();
  const actualPage = searchParams.get('page');

  // console.log(searchParams.get('page'));

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get<URLResponse>('/api/movie', {
        params: { page: actualPage },
      });
      setMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
    };
    getMovies();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 bg-black">
      <Navbar />
      <MovieList movies={movies} />
      <MoviesPagination
        totalPages={totalPages}
        actualPage={Number(actualPage)}
      />
    </main>
  );
}
