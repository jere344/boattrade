import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, useTheme, useMediaQuery, CircularProgress, IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BlogPost } from '@models/BlogPost';
import api from '../../services/api';

const BlogPostsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await api.getBlogPosts();
        setBlogPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1));
  };

  // Only show navigation if we have more than one post
  const showNavigation = blogPosts.length > 1;

  // Function to truncate text to a specified length
  const truncateText = (text: string, maxLength: number = 450) => {
    if (text.length <= maxLength) return { text, isTruncated: false };
    return { 
      text: text.substring(0, maxLength) + '...', 
      isTruncated: true 
    };
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box 
      id="blog-posts" 
      sx={{
        pt: { xs: 2, md: 3 },
        pb: { xs: 6, md: 8 }, 
        position: 'relative',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}CC, ${theme.palette.primary.main})`,
        borderRadius: '16px',
        boxShadow: '0 20px 80px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        mt: 6,
        color: '#fff',
        mb: 12,
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
          backgroundImage: 'url(https://images.unsplash.com/photo-1575386248693-32fc8162e0b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Animated waves */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: -20,
          left: 0,
          right: 0,
          height: '120px',
          background: 'url(/wave.svg) repeat-x',
          backgroundSize: '1000px 100px',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '3rem' }, 
                backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${theme.palette.secondary.light} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1.5, // Reduced margin
                textShadow: '0 5px 15px rgba(0,0,0,0.2)',
              }}
            >
              Notre Blog Nautique
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2, // Reduced margin
                maxWidth: '800px',
                fontWeight: 400,
                lineHeight: 1.5, // Reduced line height
                color: theme.palette.secondary.light,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' }, // Smaller font
              }}
            >
              Découvrez nos conseils, guides et récits nautiques pour enrichir votre expérience maritime
            </Typography>
          </Box>
        </motion.div>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}> {/* Reduced padding */}
            <CircularProgress sx={{ color: theme.palette.secondary.light }} />
          </Box>
        ) : blogPosts.length > 0 ? (
          <Box sx={{ position: 'relative' }}>
            {/* Navigation arrows */}
            {showNavigation && (
              <>
                <IconButton 
                  onClick={goToPrevious}
                  sx={{
                    position: 'absolute',
                    left: { xs: -10, md: -30 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    zIndex: 10,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                    display: { xs: 'none', sm: 'flex' }
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton 
                  onClick={goToNext}
                  sx={{
                    position: 'absolute',
                    right: { xs: -10, md: -30 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    zIndex: 10,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                    display: { xs: 'none', sm: 'flex' }
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}
            
            {/* Single blog post display */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={3} alignItems="center"> {/* Reduced spacing */}
                <Grid item xs={12} md={7}>
                  <Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: theme.palette.secondary.light,
                        fontSize: '0.9rem', // Smaller font
                        mb: 0.5 // Reduced margin
                      }}
                    >
                      {formatDate(blogPosts[currentIndex].published_date)}
                    </Typography>
                    <Typography 
                      variant="h3" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', md: '2.2rem' }, // Smaller font
                        backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${theme.palette.secondary.light} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        mb: 2, // Reduced margin
                        textShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      }}
                    >
                      {blogPosts[currentIndex].title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2, // Reduced margin
                        maxWidth: '600px',
                        fontWeight: 400,
                        lineHeight: 1.6, // Reduced line height
                        color: theme.palette.secondary.light,
                        fontSize: '1.2rem', // Smaller font
                        pr: 2,
                      }}
                    >
                      {expanded 
                        ? blogPosts[currentIndex].content 
                        : truncateText(blogPosts[currentIndex].content).text}
                      
                      {!expanded && truncateText(blogPosts[currentIndex].content).isTruncated && (
                        <Button 
                          onClick={handleToggleExpand}
                          sx={{
                            color: theme.palette.secondary.main,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            ml: 1,
                            p: 0,
                            minWidth: 'auto',
                            verticalAlign: 'baseline',
                            '&:hover': {
                              background: 'none',
                              textDecoration: 'underline',
                            }
                          }}
                        >
                          Lire plus
                        </Button>
                      )}
                      
                      {expanded && (
                        <Button 
                          onClick={handleToggleExpand}
                          sx={{
                            color: theme.palette.secondary.main,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            display: 'block',
                            mt: 1,
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': {
                              background: 'none',
                              textDecoration: 'underline',
                            }
                          }}
                        >
                          Afficher moins
                        </Button>
                      )}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: '320px', // Reduced height
                      width: '100%',
                      borderRadius: '12px', // Smaller border radius
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.25)', // Reduced shadow
                      transform: 'perspective(1000px) rotateY(-5deg)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <Box
                      component="img"
                      src={blogPosts[currentIndex].image || "https://images.unsplash.com/photo-1578591234304-92f6ea8559dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                      alt={blogPosts[currentIndex].title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </motion.div>

            {/* Pagination dots */}
            {showNavigation && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: 3, // Reduced margin
                  gap: 1
                }}
              >
                {blogPosts.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: index === currentIndex ? theme.palette.secondary.light : 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: index === currentIndex ? theme.palette.secondary.light : 'rgba(255,255,255,0.5)',
                      }
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}> {/* Reduced padding */}
            <Typography variant="h6" sx={{ color: theme.palette.secondary.light }}>
              Aucun article disponible pour le moment.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogPostsSection;
