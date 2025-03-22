import React from 'react';
import { Box, Typography } from '@mui/material';

const FeaturedListingsSection: React.FC = () => {
  return (
    <Box id="featured-listings" py={6}>
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Les coups de coeur de notre équipe
      </Typography>
      {/* Featured boat listings will go here */}
    </Box>
  );
};

export default FeaturedListingsSection;
