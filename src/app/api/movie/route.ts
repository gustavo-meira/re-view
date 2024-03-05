import axios from 'axios';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../_database/prisma';
import { Movie } from '../_types/movie';

export const GET = async (req: Request) => {
  const searchParamsSchema = z.object({
    page: z.coerce
      .number()
      .default(1)
      .transform((value) => (value < 1 ? 1 : value)),
  });

  const requestUrl = new URL(req.url);

  const { page } = searchParamsSchema.parse({
    page: requestUrl.searchParams.get('page'),
  });

  const url = new URL('https://api.themoviedb.org/3/movie/popular');
  url.searchParams.set('page', page.toString());
  url.searchParams.set('language', 'pt-BR');

  type URLResponse = {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
  };
  const response = await axios.get<URLResponse>(url.toString(), {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  const moviesRatings = await prisma.rating.findMany({
    where: {
      movieId: {
        in: response.data.results.map((movie) => movie.id.toString()),
      },
    },
  });

  const moviesWithRatings = response.data.results.map((movie) => {
    const ratings = moviesRatings.filter(
      (rating) => rating.movieId === movie.id.toString()
    );

    if (ratings.length === 0) return { ...movie, averageRating: 0 };

    const averageRating =
      ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

    return {
      ...movie,
      averageRating,
    };
  });

  return NextResponse.json({
    movies: moviesWithRatings,
    page: response.data.page,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
  });
};
