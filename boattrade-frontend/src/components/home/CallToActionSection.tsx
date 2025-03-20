import React from 'react';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import WavesIcon from '@mui/icons-material/Waves';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import { Link } from 'react-router-dom';

const CallToActionSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      id="call-to-action" 
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}CC, ${theme.palette.primary.main}CC)`,
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
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h2" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${theme.palette.secondary.light} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2,
                    textShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  }}
                >
                  Élevez Votre Voyage Maritime
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    maxWidth: '600px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: theme.palette.secondary.light,
                  }}
                >
                  Que vous cherchiez votre bateau de rêve ou que vous soyez prêt à libérer votre bateau pour sa prochaine aventure, nous offrons une expérience aussi luxueuse que vos aspirations nautiques.
                </Typography>
              </motion.div>

              <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.03, translateY: -5 }}
                >
                  <Button 
                    component={Link}
                    to="/boats"
                    variant="contained" 
                    size="large"
                    startIcon={<DirectionsBoatFilledIcon />}
                    sx={{ 
                      minWidth: '200px',
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                      color: theme.palette.primary.dark,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      py: 1.5,
                      boxShadow: '0 10px 25px rgba(172, 190, 206, 0.5)',
                    }}
                  >
                    Trouver Mon Bateau
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.03, translateY: -5 }}
                >
                  <Button 
                    component={Link}
                    to="/sell-my-boat"
                    variant="outlined" 
                    size="large"
                    startIcon={<WavesIcon />}
                    sx={{ 
                      minWidth: '200px',
                      borderColor: 'rgba(255,255,255,0.5)',
                      borderWidth: '2px',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      py: 1.5,
                      backdropFilter: 'blur(10px)',
                      background: 'rgba(255,255,255,0.05)',
                      '&:hover': {
                        borderColor: '#fff',
                        background: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    Nos Services
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: '400px',
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury yacht on crystal blue water"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                    Des bateaux de luxe vous attendent pour être découverts
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
