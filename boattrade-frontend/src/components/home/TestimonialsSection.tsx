import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Avatar, Rating, Grid, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import api from '@services/api';
import { Testimonial } from '@models/Testimonial';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionAvatar = motion(Avatar);

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        delay: index * 0.1 + 0.2
      } 
    }
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      sx={{
        position: 'relative',
        p: 4,
        borderRadius: 4,
        height: '100%',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${theme.palette.background.paper} 100%)`,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.07)',
        }
      }}
    >
      <Box sx={{ position: 'absolute', top: 20, right: 20, opacity: 0.07, transform: 'rotate(5deg)' }}>
        <FormatQuoteIcon sx={{ fontSize: 120, color: theme.palette.primary.main }} />
      </Box>
      
      <MotionBox
        variants={quoteVariants}
        sx={{ mb: 3, position: 'relative', zIndex: 1 }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: 'italic', 
            fontSize: '1.1rem',
            color: theme.palette.text.primary,
            lineHeight: 1.8,
            mb: 3,
            fontWeight: 400,
          }}
        >
          "{testimonial.quote}"
        </Typography>
        
        <Rating 
          value={testimonial.rating} 
          precision={0.5} 
          readOnly 
          sx={{ 
            '& .MuiRating-iconFilled': {
              color: theme.palette.secondary.dark,
            },
            mb: 3
          }} 
        />
      </MotionBox>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MotionAvatar
          src={testimonial.avatar}
          alt={testimonial.name}
          sx={{ 
            width: 64, 
            height: 64, 
            mr: 2,
            border: `3px solid ${theme.palette.primary.light}`,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3, delay: index * 0.1 + 0.3 }
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        />
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.primary.dark,
              mb: 0.5
            }}
          >
            {testimonial.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.secondary.dark,
              fontWeight: 500
            }}
          >
            {testimonial.role}
          </Typography>
        </Box>
      </Box>
    </MotionBox>
  );
};

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
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid 
                item 
                xs={12} 
                sm={isTablet ? 12 : 6} 
                md={6} 
                lg={3} 
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
