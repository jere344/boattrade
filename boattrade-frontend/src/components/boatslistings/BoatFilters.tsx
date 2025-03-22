import React, { useState, useEffect } from 'react';
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
  Box,
  Typography,
  InputAdornment,
  Container,
  useTheme,
  alpha
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Category } from '../../models/Category';
import SearchIcon from '@mui/icons-material/Search';
import EuroIcon from '@mui/icons-material/Euro';
import TuneIcon from '@mui/icons-material/Tune';
import SailingIcon from '@mui/icons-material/Sailing';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

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
  formatPrice?: (price: number) => string;
  maxPriceLimit?: number;
}

const BoatFilters: React.FC<BoatFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onReset,
  loading
}) => {
  const theme = useTheme();
  
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
    <Container maxWidth="xl" sx={{ mt: -6, position: "relative", zIndex: 3 }}>
      <MotionPaper 
        elevation={6} 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{ 
          p: 3,
          borderRadius: 2,
          background: "linear-gradient(to right, rgba(255,255,255,0.98), rgba(255,255,255,0.95))",
          backdropFilter: "blur(10px)",
          boxShadow: `0 10px 40px -10px ${alpha(theme.palette.primary.dark, 0.3)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          overflow: "visible",
          position: "relative"
        }}
      >
        {/* Decorative element */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -15, 
            left: '50%', 
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #071B2F 0%, #134074 100%)',
            px: 3,
            py: 0.8,
            borderRadius: 4,
            color: 'white',
            zIndex: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TuneIcon fontSize="small" />
            <Typography variant="subtitle2" fontWeight={600}>
              Filtres de recherche
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={filters.category}
                  label="Catégorie"
                  onChange={handleCategoryChange}
                  disabled={loading}
                  startAdornment={
                    <InputAdornment position="start">
                      <SailingIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  }
                  sx={{ 
                    borderRadius: 1.5,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.primary.main, 0.2)
                    }
                  }}
                >
                  <MenuItem value=""><em>Toutes les catégories</em></MenuItem>
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
                label="Recherche"
                value={localSearch}
                onChange={handleSearchChange}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  borderRadius: 1.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.2)
                    }
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Prix Min"
                type="number"
                value={localMinPrice}
                onChange={handleMinPriceChange}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.2)
                    }
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Prix Max"
                type="number"
                value={localMaxPrice}
                onChange={handleMaxPriceChange}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.2)
                    }
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleReset}
                disabled={loading}
                fullWidth
                sx={{ 
                  borderRadius: 1.5,
                  background: 'linear-gradient(135deg, #071B2F 0%, #134074 100%)',
                  boxShadow: '0 4px 10px rgba(19, 64, 116, 0.3)',
                  py: 1
                }}
              >
                Réinitialiser
              </Button>
            </Grid>
          </Grid>
        </form>
      </MotionPaper>
    </Container>
  );
};

export default BoatFilters;
