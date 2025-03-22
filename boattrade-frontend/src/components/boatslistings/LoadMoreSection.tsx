import React from 'react';
import { Box, Typography, CircularProgress, Container } from '@mui/material';

interface LoadMoreSectionProps {
  loadMoreRef: React.RefObject<HTMLDivElement>;
  hasMoreToShow: boolean;
  boatsCount: number;
}

const LoadMoreSection: React.FC<LoadMoreSectionProps> = ({
  loadMoreRef,
  hasMoreToShow,
  boatsCount
}) => {
  return (
    <Container maxWidth="lg">
      {/* Intersection observer target for lazy loading */}
      {hasMoreToShow && (
        <div ref={loadMoreRef} style={{ height: "20px", margin: "20px 0" }}>
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={30} />
          </Box>
        </div>
      )}
      
      {/* Message when all boats are visible */}
      {!hasMoreToShow && boatsCount > 0 && (
        <Box sx={{ textAlign: "center", color: "text.secondary", my: 2 }}>
          <Typography variant="body2">All boats loaded</Typography>
        </Box>
      )}
    </Container>
  );
};

export default LoadMoreSection;
