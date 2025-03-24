import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Grid, useTheme, useMediaQuery, CircularProgress, Button } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import api from '@services/api';
import { BoatSummary } from '@models/Boat';
import BoatCard from '@components/boatslistings/BoatCard.tsx';

// Motion components
const MotionTypography =  motion.create(Typography);
const MotionBox =  motion.create(Box);

const FeaturedListingsSection: React.FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Add state for featured boats, loading and error
  const [featuredBoats, setFeaturedBoats] = useState<BoatSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Format price helper function
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Fetch featured boats from API
  useEffect(() => {
    const fetchFeaturedBoats = async () => {
      try {
        setLoading(true);
        const response = await api.getFeaturedBoats();
        setFeaturedBoats(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured boats:', err);
        setError('Impossible de charger les bateaux en vedette. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedBoats();
  }, []);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.1 * i,
        ease: "easeOut"
      }
    })
  };

  return (
    <Box 
      id="featured-listings" 
      py={10}
      sx={{
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: `linear-gradient(180deg, transparent 0%, rgba(172, 190, 206, 0.1) 100%)`,
          zIndex: 0
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box ref={ref} sx={{ textAlign: 'center', mb: 6 }}>
          <MotionTypography 
            variant="h2" 
            initial="hidden"
            animate={controls}
            variants={titleVariants}
            sx={{
              fontWeight: 700,
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2,
              fontSize: {
                xs: '2.5rem',
                md: '3.5rem'
              }
            }}
          >
            Les coups de coeur de notre équipe
          </MotionTypography>
          
          <MotionTypography 
            variant="h5"
            initial="hidden"
            animate={controls}
            variants={subtitleVariants}
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              color: theme.palette.text.secondary,
              mb: 5,
              fontWeight: 400
            }}
          >
            Découvrez notre sélection exclusive de bateaux d'exception
          </MotionTypography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress size={60} thickness={4} color="primary" />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', my: 8 }}>
            <Typography color="error" variant="h6">{error}</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
              {featuredBoats.map((boat, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4}
                  lg={3}
                  key={boat.id}
                  component={MotionBox}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <BoatCard 
                    boat={boat} 
                    formatPrice={formatPrice} 
                    variant="square" 
                  />
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Button 
                component={Link}
                to="/boats"
                variant="contained" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: '30px',
                  fontWeight: 600,
                  boxShadow: `0 8px 20px rgba(${theme.palette.primary.main}, 0.2)`,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 12px 24px rgba(${theme.palette.primary.main}, 0.3)`,
                  }
                }}
              >
                Voir tous les bateaux
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedListingsSection;
