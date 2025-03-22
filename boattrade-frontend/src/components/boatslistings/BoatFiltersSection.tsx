import React from 'react';
import { Container } from '@mui/material';
import BoatFilters from './BoatFilters';
import { Category } from '@models/Category';

interface BoatFiltersSectionProps {
  categories: Category[];
  filters: {
    category: number | string;
    search: string;
    minPrice: number;
    maxPrice: number;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  loading: boolean;
  formatPrice: (price: number) => string;
  maxPriceLimit: number;
}

const BoatFiltersSection: React.FC<BoatFiltersSectionProps> = ({
  categories,
  filters,
  onFilterChange,
  onReset,
  loading,
  formatPrice,
  maxPriceLimit
}) => {
  return (
    <Container maxWidth="lg" sx={{ mb: 2 }}>
      <BoatFilters
        categories={categories}
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onReset}
        loading={loading}
        formatPrice={formatPrice}
        maxPriceLimit={maxPriceLimit}
      />
    </Container>
  );
};

export default BoatFiltersSection;
