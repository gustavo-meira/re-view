import axios from 'axios';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../_database/prisma';
import { MovieFromTMDB } from '../_types/movie';

const getGenres = async () => {
  let genres = await prisma.genre.findMany();

  if (genres.length === 0) {
    const url = new URL('https://api.themoviedb.org/3/genre/movie/list');
    url.searchParams.set('language', 'pt-BR');

    type URLResponse = {
      genres: { id: number; name: string }[];
    };
    const response = await axios.get<URLResponse>(url.toString(), {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });

    genres = await prisma.$transaction(
      response.data.genres.map((genre) =>
        prisma.genre.create({
          data: { name: genre.name, id: genre.id.toString() },
        })
      )
    );
  }

  return genres;
};

export const GET = async (req: Request) => {
  const genres = await getGenres();
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
    results: MovieFromTMDB[];
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

  const moviesWithRatings = await Promise.all(
    response.data.results.map(async (movie) => {
      const movieRating = await prisma.rating.aggregate({
        _avg: {
          rating: true,
        },
        where: {
          movieId: movie.id.toString(),
        },
      });

      const movieGenres = movie.genre_ids.map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId.toString());
        if (!genre) throw new Error('Genre not found');
        return genre;
      });

      return {
        adult: movie.adult,
        genres: movieGenres,
        id: movie.id,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        title: movie.title,
        averageRating: movieRating._avg.rating,
      };
    })
  );

  return NextResponse.json({
    movies: moviesWithRatings,
    page: response.data.page,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
  });
};
