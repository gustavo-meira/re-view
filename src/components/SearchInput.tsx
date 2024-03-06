'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="relative flex w-full items-center justify-center">
      <Input
        className="h-11 w-1/3 bg-transparent text-white"
        placeholder="Busque por um filme aqui"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <Button
        className={cn('absolute right-[33.5%]', {
          hidden: searchValue.length < 1,
        })}
      >
        Buscar
      </Button>
    </div>
  );
}
