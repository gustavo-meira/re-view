import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type MoviesPaginationProps = {
  totalPages: number;
  actualPage: number;
};

export default function MoviesPagination({
  totalPages,
  actualPage,
}: MoviesPaginationProps) {
  // const pages = Array.from({ length: 10 }, (_, i) => {
  //   if (actualPage > 4 && actualPage < totalPages) {
  //     return i + (actualPage - 4);
  //   }
  //   if (actualPage >= totalPages - 4) {
  //     // return i + (actualPage - totalPages);
  //     return i + (actualPage - 9);
  //   } else return i;
  // });
  const leftOffset = 6;
  const rightOffset = 4;
  const pages = Array.from({ length: 10 }, (_, i) => {
    if (actualPage < leftOffset) return i + 1;
    if (actualPage > totalPages - rightOffset - 1) return totalPages - 9 + i;
    return actualPage - rightOffset + i;
  });

  return (
    <div className="mb-3 bg-white">
      <Pagination>
        <PaginationContent>
          {/* Previous Page */}
          {actualPage >= 2 ? (
            <PaginationItem>
              <PaginationPrevious href={`/?page=${actualPage - 1}`} />
            </PaginationItem>
          ) : null}

          {/* Pages */}
          {pages.map((i) => (
            <PaginationItem className={i === actualPage ? 'bg-red-300' : ''}>
              <PaginationLink href={`/?page=${i}`}>{i}</PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis */}
          {actualPage < totalPages - 6 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          {/* Last Page */}
          {actualPage < totalPages - 5 ? (
            <PaginationItem>
              <PaginationLink href={`/?page=${totalPages}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          ) : null}

          {/* Next Page */}
          {actualPage < totalPages ? (
            <PaginationItem>
              <PaginationNext
                href={`/?page=${Math.min(actualPage + 1, totalPages)}`}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
