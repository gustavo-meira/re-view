import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Movie } from '@/types/Movie';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

type MovieCardProps = {
  movie: Movie;
};

type Liked = 'Unset' | 'Liked' | 'Disliked';

export default function MovieCard({ movie }: MovieCardProps) {
  const {
    title,
    adult,
    averageRating,
    genres,
    id,
    posterPath,
    releaseDate,
    overview,
  } = movie;

  const [liked, setLiked] = useState<Liked>('Unset');

  return (
    <div className="relative flex h-[40vh] w-full flex-col">
      <div
        className="relative flex h-full w-full items-end bg-cover"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${posterPath}')`,
        }}
      >
        <div className="flex h-fit w-full flex-col bg-gradient-to-b from-transparent to-blue-500 p-2">
          <p>{title}</p>
          <div className="flex gap-1">
            <p>{releaseDate.split('-')[0]}</p>
            {genres.map((g) => (
              <Badge>{g.name}</Badge>
            ))}
          </div>

          {/* Rating */}
          <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-4 border-green-300 bg-black">
            <p className="">{averageRating === null ? 'N/A' : averageRating}</p>
          </div>

          <Popover>
            <PopoverTrigger>
              {liked === 'Unset' ? (
                <ThumbsUp />
              ) : liked === 'Disliked' ? (
                <ThumbsDown fill="red" />
              ) : (
                <ThumbsUp fill="orange" />
              )}
            </PopoverTrigger>
            <PopoverContent
              align="start"
              alignOffset={-50}
              className="flex h-fit w-fit gap-2 border-0 bg-none p-2"
            >
              <Button
                onClick={() => setLiked(liked === 'Liked' ? 'Unset' : 'Liked')}
                variant="ghost"
              >
                <ThumbsUp fill={liked === 'Liked' ? 'orange' : ''} />
              </Button>
              <Button
                onClick={() =>
                  setLiked(liked === 'Disliked' ? 'Unset' : 'Disliked')
                }
                variant="ghost"
              >
                <ThumbsDown fill={liked === 'Disliked' ? 'red' : ''} />
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
