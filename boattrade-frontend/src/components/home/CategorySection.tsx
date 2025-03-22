import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, useTheme, alpha, Button, Container, Skeleton, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Category } from '../../models/Category';
import api from '../../services/api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
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

  const getItemsToShow = isMobile ? 1 : isTablet ? 2 : 3;

  // Animation variants
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

  // Custom prev arrow component
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          left: { xs: '5px', md: '-50px' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            transform: 'translateY(-50%) translateX(-3px)',
          }
        }}
      >
        <NavigateBeforeIcon />
      </Box>
    );
  };

  // Custom next arrow component
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          right: { xs: '5px', md: '-50px' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            transform: 'translateY(-50%) translateX(3px)',
          }
        }}
      >
        <NavigateNextIcon />
      </Box>
    );
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: categories.length > getItemsToShow,
    speed: 500,
    slidesToShow: getItemsToShow,
    slidesToScroll: getItemsToShow, // Change to slidesToScroll = slidesToShow to ensure proper pagination
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    customPaging: (i: number) => ( // Add index parameter
      <Box
        component="div"
        sx={{
          width: '10px',
          height: '10px',
          margin: '0 5px',
          borderRadius: '50%',
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          transition: 'all 0.3s ease',
        }}
      />
    ),
    dotsClass: 'slick-dots custom-dots',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2, // Update to match slidesToShow for proper pagination
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    adaptiveHeight: true,
  };

  // Category card component
  const CategoryCard = ({ category }: { category: Category }) => (
    <Box sx={{ p: 1.5 }}>
      <motion.div
        whileHover={{ 
          y: -8, 
          transition: { duration: 0.3 },
          boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`
        }}
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
            transition: 'all 0.3s ease',
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
    </Box>
  );

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
        {/* Section header content */}
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
              {[...Array(getItemsToShow)].map((_, index) => (
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
          <Box 
            sx={{ 
              px: { xs: 1, md: 4 },
              '.slick-track': {
                display: 'flex',
                '.slick-slide': {
                  height: 'auto',
                  '& > div': {
                    height: '100%',
                  }
                }
              },
              '.slick-dots': {
                bottom: '-40px',
              },
              '.custom-dots li': {
                margin: '0 5px',
              },
              '.slick-dots li button:before': {
                display: 'none', // Hide default dots
              },
              '.slick-dots li.slick-active div': {
                backgroundColor: theme.palette.primary.main, // Style active dot
                transform: 'scale(1.2)',
              }
            }}
          >
            <Slider {...settings}>
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </Slider>
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
            mt: { xs: 8, md: 10 }
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
