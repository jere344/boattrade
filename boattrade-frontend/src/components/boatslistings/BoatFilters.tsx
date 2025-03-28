import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Container,
  useTheme,
  alpha,
  Tooltip,
  IconButton,
  Fade,
  Chip,
  Avatar,
  Card,
  CardActionArea,
  Collapse
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Category } from '../../models/Category';
import SearchIcon from '@mui/icons-material/Search';
import EuroIcon from '@mui/icons-material/Euro';
import TuneIcon from '@mui/icons-material/Tune';
import SailingIcon from '@mui/icons-material/Sailing';
import ClearIcon from '@mui/icons-material/Clear';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';

const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);

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

// Track which input field is currently focused
type ActiveInput = null | 'search' | 'minPrice' | 'maxPrice';

const BoatFilters = forwardRef<unknown, BoatFiltersProps>(({
  categories,
  filters,
  onFilterChange,
  onReset,
  loading,
  formatPrice,
  maxPriceLimit
}, ref) => {
  const theme = useTheme();
  
  // Local state for inputs
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);
  const [showCategories, setShowCategories] = useState(true);
  
  // Refs for input elements to maintain focus
  const searchInputRef = useRef<HTMLInputElement>(null);
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);
  
  // Track active input to restore focus after filter changes
  const [activeInput, setActiveInput] = useState<ActiveInput>(null);
  
  // Create debounced versions of the filter values
  const debouncedSearch = useDebounce(localSearch, 300);
  const debouncedMinPrice = useDebounce(localMinPrice, 300);
  const debouncedMaxPrice = useDebounce(localMaxPrice, 300);
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    focusSearch: () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  }));
  
  // Effect to check for category in URL query parameters when component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && categoryParam !== filters.category.toString()) {
      const categoryId = parseInt(categoryParam, 10);
      // Verify this is a valid category ID
      if (!isNaN(categoryId) && categories.some(cat => cat.id === categoryId)) {
        onFilterChange({ category: categoryId });
        
        // Remove it from the URL after applying the filter
        params.delete('category');
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
      }
    }
  }, [categories, filters.category, onFilterChange]); // Include dependencies
  
  // Effect to restore focus after render
  useEffect(() => {
    // Restore focus based on activeInput
    if (activeInput === 'search' && searchInputRef.current) {
      searchInputRef.current.focus();
    } else if (activeInput === 'minPrice' && minPriceInputRef.current) {
      minPriceInputRef.current.focus();
    } else if (activeInput === 'maxPrice' && maxPriceInputRef.current) {
      maxPriceInputRef.current.focus();
    }
  });
  
  // Effect to apply debounced values to actual filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, onFilterChange]);
  
  useEffect(() => {
    if (debouncedMinPrice !== filters.minPrice) {
      onFilterChange({ minPrice: debouncedMinPrice });
    }
  }, [debouncedMinPrice, filters.minPrice, onFilterChange]);
  
  useEffect(() => {
    if (debouncedMaxPrice !== filters.maxPrice) {
      onFilterChange({ maxPrice: debouncedMaxPrice });
    }
  }, [debouncedMaxPrice, filters.maxPrice, onFilterChange]);
  
  // Update local state when filters change from outside (e.g., reset)
  useEffect(() => {
    // Only update if we didn't just have focus - prevents losing input value mid-type
    if (!activeInput) {
      setLocalSearch(filters.search);
      setLocalMinPrice(filters.minPrice);
      setLocalMaxPrice(filters.maxPrice);
    }
  }, [
    filters.search, 
    filters.minPrice, 
    filters.maxPrice,
    activeInput
  ]);
  
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
  
  const handleCategoryChange = (categoryId: number | string) => {
    onFilterChange({ category: categoryId });
  };
  
  const clearSearch = () => {
    setLocalSearch('');
    setActiveInput('search');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleReset = () => {
    setActiveInput(null);
    onReset();
  };
  
  // Track focus state to know which input needs focus restoration
  const handleFocus = (input: ActiveInput) => {
    setActiveInput(input);
  };
  
  // Calculate if any filters are applied
  const isFiltered = 
    filters.category !== "" || 
    filters.search !== "" || 
    filters.minPrice > 0 || 
    filters.maxPrice < maxPriceLimit;
  
  // Get the selected category name for the filter chip
  const selectedCategory = categories.find(cat => cat.id === filters.category)?.name;

  return (
    <Container maxWidth="lg" sx={{ mb: 2 }}>
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

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Search, Price Filters, and Reset Button Row */}
            <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Recherche"
                  value={localSearch}
                  onChange={handleSearchChange}
                  onFocus={() => handleFocus('search')}
                  inputRef={searchInputRef}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                    endAdornment: localSearch ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="clear search"
                          onClick={clearSearch}
                          edge="end"
                          size="small"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ) : null
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

              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Prix Min"
                  type="number"
                  value={localMinPrice}
                  onChange={handleMinPriceChange}
                  onFocus={() => handleFocus('minPrice')}
                  inputRef={minPriceInputRef}
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

              <Grid size={{ xs: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Prix Max"
                  type="number"
                  value={localMaxPrice}
                  onChange={handleMaxPriceChange}
                  onFocus={() => handleFocus('maxPrice')}
                  inputRef={maxPriceInputRef}
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
                <Tooltip title={isFiltered ? "Réinitialiser tous les filtres" : "Aucun filtre appliqué"}>
                  <span>
                    <Button 
                      variant="contained" 
                      onClick={handleReset}
                      disabled={loading || !isFiltered}
                      fullWidth
                      sx={{ 
                        borderRadius: 1.5,
                        background: isFiltered 
                          ? 'linear-gradient(135deg, #071B2F 0%, #134074 100%)' 
                          : 'rgba(0,0,0,0.05)',
                        boxShadow: isFiltered ? '0 4px 10px rgba(19, 64, 116, 0.3)' : 'none',
                        py: 1,
                        color: isFiltered ? 'white' : 'text.secondary'
                      }}
                    >
                      Réinitialiser
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
            
            {/* Category Grid Section */}
            <Box sx={{ 
              borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              pt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1.5,
                  width: '100%',
                  maxWidth: 'md'
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CategoryIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                  Catégories
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={() => setShowCategories(!showCategories)}
                  sx={{ color: 'primary.main' }}
                >
                  {showCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              
              <Collapse in={showCategories} sx={{ width: '100%', maxWidth: 'md' }}>
                <Grid container spacing={1} justifyContent="center">
                  {/* All Categories Option */}
                  <Grid size={{ xs: 2.4, sm: 2, md: 1.5 }}>
                    <MotionCard
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      sx={{ 
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: filters.category === "" 
                          ? `2px solid ${theme.palette.primary.main}` 
                          : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        boxShadow: filters.category === ""
                          ? `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`
                          : '0 2px 8px rgba(0,0,0,0.05)'
                      }}
                    >
                      <CardActionArea 
                        onClick={() => handleCategoryChange("")}
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center',
                          p: 1.5,
                          height: '100%'
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            mb: 1,
                            bgcolor: filters.category === "" ? 'primary.main' : 'action.selected',
                            color: 'white'
                          }}
                        >
                          <SailingIcon />
                        </Avatar>
                        <Typography 
                          variant="body2" 
                          align="center"
                          sx={{ 
                            fontWeight: filters.category === "" ? 600 : 400,
                            color: filters.category === "" ? 'primary.main' : 'text.primary' 
                          }}
                        >
                          Toutes
                        </Typography>
                      </CardActionArea>
                    </MotionCard>
                  </Grid>
                  
                  {/* Individual Category Cards */}
                  {categories.map(category => (
                    <Grid key={category.id} size={{ xs: 2.4, sm: 2, md: 1.5 }}>
                      <MotionCard
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        sx={{ 
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: filters.category === category.id 
                            ? `2px solid ${theme.palette.primary.main}` 
                            : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          boxShadow: filters.category === category.id
                            ? `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`
                            : '0 2px 8px rgba(0,0,0,0.05)',
                        }}
                      >
                        <CardActionArea 
                          onClick={() => handleCategoryChange(category.id)}
                          sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 1.5,
                            height: '100%'
                          }}
                        >
                          <Avatar
                            src={category.image}
                            alt={category.name}
                            variant="rounded"
                            sx={{
                              width: 50,
                              height: 50,
                              mb: 1,
                              border: filters.category === category.id 
                                ? `2px solid ${theme.palette.primary.main}` 
                                : 'none',
                              boxShadow: filters.category === category.id
                                ? `0 3px 10px ${alpha(theme.palette.primary.main, 0.3)}`
                                : 'none'
                            }}
                          />
                          <Typography 
                            variant="body2" 
                            align="center"
                            sx={{ 
                              fontWeight: filters.category === category.id ? 600 : 400,
                              color: filters.category === category.id ? 'primary.main' : 'text.primary' 
                            }}
                          >
                            {category.name}
                          </Typography>
                        </CardActionArea>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>
          </form>
          
          {/* Active filters display */}
          {isFiltered && (
            <Fade in={true}>
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
                <Typography variant="body2" sx={{ mr: 1, display: 'inline-block', color: 'text.secondary' }}>
                  Filtres actifs:
                </Typography>
                
                {selectedCategory && (
                  <Chip 
                    label={`Catégorie: ${selectedCategory}`}
                    size="small"
                    onDelete={() => onFilterChange({ category: "" })}
                    sx={{ m: 0.5 }}
                  />
                )}
                
                {filters.search && (
                  <Chip 
                    label={`Recherche: "${filters.search}"`}
                    size="small"
                    onDelete={() => {
                      setLocalSearch("");
                      onFilterChange({ search: "" });
                    }}
                    sx={{ m: 0.5 }}
                  />
                )}
                
                {filters.minPrice > 0 && (
                  <Chip 
                    label={`Prix min: ${formatPrice(filters.minPrice)}`}
                    size="small"
                    onDelete={() => {
                      setLocalMinPrice(0);
                      onFilterChange({ minPrice: 0 });
                    }}
                    sx={{ m: 0.5 }}
                  />
                )}
                
                {filters.maxPrice < maxPriceLimit && (
                  <Chip 
                    label={`Prix max: ${formatPrice(filters.maxPrice)}`}
                    size="small"
                    onDelete={() => {
                      setLocalMaxPrice(maxPriceLimit);
                      onFilterChange({ maxPrice: maxPriceLimit });
                    }}
                    sx={{ m: 0.5 }}
                  />
                )}
              </Box>
            </Fade>
          )}
        </MotionPaper>
      </Container>
    </Container>
  );
});

// Apply memoization to prevent unnecessary re-renders
export default React.memo(BoatFilters);
