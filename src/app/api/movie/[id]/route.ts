import axios from 'axios';
import { NextResponse } from 'next/server';
import { prisma } from '../../_database/prisma';
import { MovieDetailsFromTMDB } from '../../_types/movie';

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  let movie = await prisma.movie.findUnique({
    where: {
      id,
    },
  });

  if (!movie) {
    const url = new URL('https://api.themoviedb.org/3/movie/' + id);
    url.searchParams.append('language', 'pt-BR');

    const movieDetailsFromTMDB = await axios.get<MovieDetailsFromTMDB>(
      url.toString(),
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    movie = await prisma.movie.create({
      data: {
        id,
        adult: movieDetailsFromTMDB.data.adult,
        releaseDate: new Date(movieDetailsFromTMDB.data.release_date),
        title: movieDetailsFromTMDB.data.title,
        overview: movieDetailsFromTMDB.data.overview,
        posterPath: movieDetailsFromTMDB.data.poster_path,
        backdropPath: movieDetailsFromTMDB.data.backdrop_path,
        genres: {
          create: movieDetailsFromTMDB.data.genres.map((genre) => ({
            Genre: {
              connectOrCreate: {
                where: {
                  id: genre.id.toString(),
                },
                create: {
                  id: genre.id.toString(),
                  name: genre.name,
                },
              },
            },
          })),
        },
      },
    });
  }

  const movieRating = await prisma.rating.aggregate({
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      movieId: id,
    },
  });

  return NextResponse.json({
    movie: {
      ...movie,
      averageRating: movieRating._avg.rating,
      ratingsCount: movieRating._count.rating,
    },
  });
};
