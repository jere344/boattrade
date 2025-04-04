import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Grid, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import api from '@services/api';
import { Testimonial } from '@models/Testimonial';
import TestimonialCard from './TestimonialCard';

// Motion components
const MotionTypography =  motion.create(Typography);

const TestimonialsSection: React.FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Add state for testimonials, loading and error
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.getTestimonials();
        setTestimonials(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
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

  return (
    <Box 
      id="testimonials" 
      py={10}
      sx={{
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(172, 190, 206, 0.15) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(172, 190, 206, 0.15) 0%, transparent 70%)',
          zIndex: 0
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box ref={ref} sx={{ textAlign: 'center', mb: 8 }}>
          <MotionTypography 
            variant="h2" 
            initial="hidden"
            animate={controls}
            variants={titleVariants}
            sx={{
              fontWeight: 700,
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
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
            Expériences des clients
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
            Découvrez ce que nos clients disent de leur expérience avec nous
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
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid 
                item 
                xs={12} 
                sm={isTablet ? 12 : 6} 
                md={6} 
                lg={testimonial.quote.length > 200 ? 6 : 3}
                key={testimonial.id}
              >
                <TestimonialCard testimonial={testimonial} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
