import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, useTheme, alpha, Button, Container, Skeleton, useMediaQuery, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Category } from '../../models/Category';
import api from '../../services/api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CircleIcon from '@mui/icons-material/Circle';

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const visibleCategories = () => {
    if (isMobile) return categories.slice(activeIndex, activeIndex + 1);
    if (isTablet) return categories.slice(activeIndex, activeIndex + 2);
    return categories.slice(activeIndex, activeIndex + 3);
  };

  const getItemsToShow = isMobile ? 1 : isTablet ? 2 : 3;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.5)} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          mb={{ xs: 6, md: 8 }} 
          textAlign="center"
        >
          <Typography 
            variant="h6" 
            color="primary" 
            fontWeight="600"
            sx={{ 
              letterSpacing: 2,
              textTransform: 'uppercase',
              mb: 1,
              display: 'inline-block',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Découvrir
          </Typography>
          
          <Typography 
            variant="h3" 
            fontWeight="700"
            sx={{ 
              mb: 2,
              fontSize: { xs: '2.2rem', md: '3rem' },
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.dark} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            NOS BATEAUX
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              maxWidth: 650, 
              mx: 'auto', 
              mb: 2,
              lineHeight: 1.8
            }}
          >
            Découvrez notre selection de bateaux.
          </Typography>
        </Box>

        {loading ? (
          <Box 
            component={motion.div}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3} justifyContent="center">
              {[...Array(3)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card sx={{ 
                      borderRadius: 3, 
                      overflow: 'hidden',
                      boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.1)}`
                    }}>
                      <Skeleton variant="rectangular" height={200} animation="wave" />
                      <CardContent>
                        <Skeleton variant="text" height={40} width="70%" animation="wave" />
                        <Skeleton variant="text" height={20} animation="wave" />
                        <Skeleton variant="text" height={20} width="80%" animation="wave" />
                        <Box sx={{ mt: 2 }}>
                          <Skeleton variant="text" height={35} width={120} animation="wave" />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box position="relative">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Grid container spacing={3} justifyContent="center">
                {visibleCategories().map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} key={category.id}>
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          borderRadius: 3,
                          bgcolor: 'background.paper',
                          boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.15)}`,
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '5px',
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          },
                          '&:hover::after': {
                            opacity: 1,
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '70%' }}>
                          <CardMedia
                            component="img"
                            image={category.image}
                            alt={category.name}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.6s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              }
                            }}
                          />
                          <Box 
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background: `linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)`,
                            }}
                          />
                          <Typography
                            variant="h4"
                            sx={{
                              position: 'absolute',
                              bottom: 20,
                              left: 20,
                              color: 'white',
                              fontWeight: 700,
                              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                            }}
                          >
                            {category.name}
                          </Typography>
                        </Box>
                        <CardContent sx={{ 
                          flexGrow: 1, 
                          p: 3,
                          background: 'white'
                        }}>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {category.description}
                          </Typography>
                          <Button 
                            component={RouterLink}
                            to={`/boats?category=${category.id}`}
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ 
                              borderRadius: '30px',
                              textTransform: 'none',
                              fontWeight: 600,
                              px: 3,
                              '&:hover': {
                                transform: 'translateX(5px)',
                              }
                            }}
                          >
                            Explorer
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
            
            {/* Navigation controls */}
            {categories.length > getItemsToShow && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  mt: 5,
                  gap: 1
                }}
              >
                <IconButton 
                  onClick={handlePrev}
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    }
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                
                <Box sx={{ display: 'flex', mx: 2 }}>
                  {categories.map((_, index) => (
                    <Box 
                      key={index}
                      component={motion.div}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => handleDotClick(index)}
                      sx={{ 
                        cursor: 'pointer',
                        mx: 0.5,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <CircleIcon 
                        sx={{ 
                          fontSize: '0.8rem',
                          color: index === activeIndex ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3),
                          transition: 'color 0.3s ease'
                        }}
                      />
                    </Box>
                  ))}
                </Box>
                
                <IconButton 
                  onClick={handleNext}
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    }
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
        
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mt: 6
          }}
        >
          <Button 
            component={RouterLink}
            to="/boats"
            variant="outlined" 
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              borderRadius: '50px',
              px: 4,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                background: alpha(theme.palette.primary.main, 0.05)
              }
            }}
          >
            Voir tous les Bateaux
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CategorySection;
