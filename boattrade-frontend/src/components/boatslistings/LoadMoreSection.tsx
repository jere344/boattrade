import React from 'react';
import { Box, Typography, CircularProgress, Container, Fade } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadMoreSectionProps {
  loadMoreRef: React.RefObject<HTMLDivElement>;
  hasMoreToShow: boolean;
  boatsCount: number;
  loading?: boolean;
}

const LoadMoreSection: React.FC<LoadMoreSectionProps> = ({
  loadMoreRef,
  hasMoreToShow,
  boatsCount,
  loading = false
}) => {
  return (
    <Container maxWidth="lg">
      {/* Intersection observer target for lazy loading */}
      {hasMoreToShow && (
        <motion.div 
          ref={loadMoreRef} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ margin: "30px 0" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Fade in={loading} timeout={800}>
              <CircularProgress size={30} thickness={4} />
            </Fade>
            {!loading && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ fontStyle: 'italic' }}
              >
                Scroll pour voir plus de bateaux...
              </Typography>
            )}
          </Box>
        </motion.div>
      )}
      
      {/* Message when all boats are visible */}
      {!hasMoreToShow && boatsCount > 0 && (
        <Fade in={true} timeout={1000}>
          <Box sx={{ 
            textAlign: "center", 
            color: "text.secondary", 
            my: 4, 
            py: 2,
            borderTop: '1px solid #eaeaea'
          }}>
            <Typography variant="body2" fontWeight={500}>
              {boatsCount === 1 
                ? "1 bateau affiché" 
                : `Tous les ${boatsCount} bateaux sont affichés`}
            </Typography>
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default LoadMoreSection;
