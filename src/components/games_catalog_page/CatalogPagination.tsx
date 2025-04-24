import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  itemsPerPage?: number;
  totalItems?: number;
}

// Helper to generate page numbers for pagination
const generatePageNumbers = (currentPage: number, totalPages: number, pageNeighbours: number = 1) => {
  const totalNumbers = pageNeighbours * 2 + 3; // Number of elements to show (current + neighbours + first + last + 2 ellipsis)
  const totalBlocks = totalNumbers + 2; // Including ellipsis potentially

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const startPage = Math.max(2, currentPage - pageNeighbours);
  const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
  let pages: (number | '...')[] = [1];

  if (startPage > 2) {
    pages.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push('...');
  }

  pages.push(totalPages);
  return pages;
};

const CatalogPagination: React.FC<CatalogPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  // Optional props for displaying item count
  itemsPerPage,
  totalItems,
}) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const firstItem = totalItems !== undefined && itemsPerPage !== undefined ? (currentPage - 1) * itemsPerPage + 1 : null;
  const lastItem = totalItems !== undefined && itemsPerPage !== undefined ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  return (
    <nav className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 mt-6 ${className}`} aria-label="Game catalog pagination">
      {totalItems !== undefined && firstItem !== null && lastItem !== null && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{firstItem}</span> to <span className="font-medium text-foreground">{lastItem}</span> of <span className="font-medium text-foreground">{totalItems}</span> results
        </div>
      )}
      <Pagination className="mx-auto sm:mx-0"> {/* Centered on mobile, right-aligned on larger */} 
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => { e.preventDefault(); handlePrevious(); }}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {pageNumbers.map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => { e.preventDefault(); onPageChange(page as number); }}
                  isActive={currentPage === page}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => { e.preventDefault(); handleNext(); }}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </nav>
  );
};

export default CatalogPagination;
