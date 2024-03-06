export interface Movie {
  adult: boolean;
  genres: { id: string; name: string }[];
  id: number;
  overview: string;
  posterPath: string;
  releaseDate: string;
  title: string;
  averageRating: number;
  backdropPath: string;
}
