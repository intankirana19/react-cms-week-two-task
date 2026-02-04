import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';
import { cn } from '../lib/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  className?: string;
}

const MAX_VISIBLE_PAGES = 7;

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (currentPage <= 3) {
    pages.push(2, 3, 4, '...', totalPages);
    return pages;
  }

  if (currentPage >= totalPages - 2) {
    pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    return pages;
  }

  pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
  return pages;
};


export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  className,
}: Readonly<PaginationProps>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-primary-200 pt-5 pb-6 px-6',
        className
      )}
    >
      {/* Left side - Rows per page selector */}
      {onItemsPerPageChange && (
        <div className="flex items-center gap-3">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-auto gap-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <p>Rows per page</p>
        </div>
      )}

      {/* Right side - Page navigation */}
      <div className="flex items-center gap-3">
        {/* Previous button */}
        <button
          onClick={() => {if (currentPage > 1) {onPageChange(currentPage - 1);}}}
          disabled={currentPage === 1}
          className={cn(
            'flex items-center justify-center w-10 h-10 p-2.5 rounded-bl-lg rounded-tl-lg transition-colors',
            currentPage === 1
              ? 'text-disabled cursor-not-allowed'
              : 'hover:bg-primary-100'
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-0.5">
          {getPageNumbers(currentPage, totalPages).map((page, index) => (
            <button
              key={`${page}-${index}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={cn(
                'w-10 h-10 flex items-center justify-center p-3 rounded-lg font-medium text-sm leading-5 transition-colors',
                page === currentPage
                  ? 'bg-primary-300 text-white'
                  : page === '...'
                    ? 'text-disabled cursor-default'
                    : 'hover:bg-primary-100'
              )}
              style={{ fontFamily: 'Roboto, sans-serif', fontVariationSettings: "'wdth' 100" }}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'flex items-center justify-center w-10 h-10 p-2.5 rounded-br-lg rounded-tr-lg transition-colors',
            currentPage === totalPages
              ? 'text-disabled cursor-not-allowed'
              : 'hover:bg-primary-100'
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
