import React, { useState, useEffect } from 'react';
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Category } from '../../models/Category';

interface BoatFiltersProps {
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

const BoatFilters: React.FC<BoatFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onReset,
  loading
}) => {
  // Local state for debounced inputs
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);
  
  // Debounce search input (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFilterChange({ search: localSearch });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [localSearch, filters.search, onFilterChange]);
  
  // Debounce price inputs (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localMinPrice !== filters.minPrice) {
        onFilterChange({ minPrice: localMinPrice });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [localMinPrice, filters.minPrice, onFilterChange]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localMaxPrice !== filters.maxPrice) {
        onFilterChange({ maxPrice: localMaxPrice });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [localMaxPrice, filters.maxPrice, onFilterChange]);

  const handleCategoryChange = (event: SelectChangeEvent<number | string>) => {
    onFilterChange({ category: event.target.value });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setLocalMinPrice(value);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setLocalMaxPrice(value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  
  const handleReset = () => {
    setLocalSearch('');
    setLocalMinPrice(0);
    setLocalMaxPrice(0);
    onReset();
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={handleCategoryChange}
                disabled={loading}
              >
                <MenuItem value=""><em>All Categories</em></MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={localSearch}
              onChange={handleSearchChange}
              disabled={loading}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Min Price"
              type="number"
              value={localMinPrice}
              onChange={handleMinPriceChange}
              disabled={loading}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Max Price"
              type="number"
              value={localMaxPrice}
              onChange={handleMaxPriceChange}
              disabled={loading}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleReset}
              disabled={loading}
              fullWidth
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BoatFilters;
