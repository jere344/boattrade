import React from 'react';
import { Container, Alert, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BoatSummary } from '@models/Boat';
import BoatCard from './BoatCard';

interface BoatResultsSectionProps {
  boats: BoatSummary[];
  visibleBoats: BoatSummary[];
  loading: boolean;
  error: string | null;
  formatPrice: (price: number) => string;
}

const BoatResultsSection: React.FC<BoatResultsSectionProps> = ({
  boats,
  visibleBoats,
  loading,
  error,
  formatPrice
}) => {
  return (
    <Container maxWidth="lg">
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && boats.length === 0 && (
        <Alert severity="info" sx={{ my: 2 }}>
          No boats found. Try adjusting your filters.
        </Alert>
      )}

      {boats.length > 0 && (
        <Grid container spacing={3}>
          {visibleBoats.map((boat: BoatSummary) => (
            <Grid key={boat.id} size={{ xs: 12, sm: 12, md: 12 }}>
              <BoatCard boat={boat} formatPrice={formatPrice} variant="full" />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BoatResultsSection;
