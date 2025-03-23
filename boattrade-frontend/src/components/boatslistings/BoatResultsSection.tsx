import React from 'react';
import { Container, Alert, Box, CircularProgress, Fade, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BoatSummary } from '@models/Boat';
import BoatCard from './BoatCard';
import { motion, AnimatePresence } from 'framer-motion';

interface BoatResultsSectionProps {
  boats: BoatSummary[];
  visibleBoats: BoatSummary[];
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
  formatPrice: (price: number) => string;
  isFilterChange: boolean;
}

const BoatResultsSection: React.FC<BoatResultsSectionProps> = ({
  boats,
  visibleBoats,
  loading,
  initialLoading,
  error,
  formatPrice,
  isFilterChange
}) => {
  // Render skeleton loaders during initial loading
  if (initialLoading) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 12, md: 12 }}>
              <Skeleton 
                variant="rectangular" 
                height={200} 
                animation="wave" 
                sx={{ borderRadius: 2, mb: 1 }} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Central loading indicator when filtering */}
      {loading && isFilterChange && (
        <Fade in={true} timeout={300}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexDirection: "column",
            my: 8 
          }}>
            <CircularProgress size={40} thickness={4} />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 2 }}
            >
              Recherche en cours...
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Error message */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            my: 3,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          {error}
        </Alert>
      )}

      {/* No results message */}
      {!loading && boats.length === 0 && !error && (
        <Fade in={true} timeout={500}>
          <Alert 
            severity="info" 
            sx={{ 
              my: 3,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            Aucun bateau ne correspond à vos critères. Essayez d'ajuster vos filtres.
          </Alert>
        </Fade>
      )}

      {/* Boat results */}
      {boats.length > 0 && !isFilterChange && (
        <AnimatePresence>
          <Grid container spacing={3}>
            {visibleBoats.map((boat: BoatSummary, index: number) => (
              <Grid key={boat.id} size={{ xs: 12, sm: 12, md: 12 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <BoatCard boat={boat} formatPrice={formatPrice} variant="full" />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>
      )}
    </Container>
  );
};

export default BoatResultsSection;
