import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, useTransform, useScroll, useMotionValue, useSpring, color } from 'framer-motion';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import SellIcon from '@mui/icons-material/Sell';
import ExploreIcon from '@mui/icons-material/Explore';

// You'll need to add this video to your assets folder
import luxuryBoatVideo from '@assets/luxury-yachts-ocean.mp4';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const HeroSection: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { scrollYProgress } = useScroll();
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { damping: 50, stiffness: 100 });
  
  // Create a floating effect for the compass
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
      
      // Update rotation based on mouse movement
      rotation.set(x * 2);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rotation]);
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const buttonsY = useTransform(scrollYProgress, [0, 0.3], [0, -20]);
  
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  };

  const buttonHoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  // Animated wave SVG path
  const wavePath = {
    initial: {
      d: "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    },
    animate: {
      d: "M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,117.3C672,85,768,75,864,90.7C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    }
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <Box
        sx={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
            zIndex: 1,
          }}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={handleVideoLoaded}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          <source src={luxuryBoatVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay at bottom for smoother text visibility */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 2,
          }}
        />
      </Box>

      {/* Animated Wave Overlay */}
      <MotionBox
        initial="initial"
        animate={{
          d: [wavePath.initial.d, wavePath.animate.d, wavePath.initial.d],
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        sx={{
          position: 'absolute',
          bottom: -5,
          left: 0,
          width: '100%',
          height: '200px',
          zIndex: 2,
          opacity: 0.8,
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <motion.path
            // fill={theme.palette.primary.dark}
            fillOpacity="0.4"
            initial={wavePath.initial}
            animate={{
              d: [wavePath.initial.d, wavePath.animate.d, wavePath.initial.d],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </MotionBox>

      {/* Floating Elements - Decorative */}
      <MotionBox
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' }
        }}
      />
      
      <MotionBox
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' }
        }}
      />

      {/* Interactive Compass Element - THE MEMORABLE ELEMENT */}
      <MotionBox
        style={{ 
          x: mousePosition.x, 
          y: mousePosition.y,
          rotate: smoothRotation 
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 30,
          delay: 0.8
        }}
        sx={{
          position: 'absolute',
          top: { xs: '10%', md: '15%' },
          right: { xs: '10%', md: '15%' },
          width: { xs: '100px', sm: '140px', md: '180px' },
          height: { xs: '100px', sm: '140px', md: '180px' },
          zIndex: 5,
          filter: 'drop-shadow(0px 0px 15px rgba(172, 190, 206, 0.7))',
        }}
      >
        {/* Compass/Logo Design */}
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer ring */}
          <motion.circle 
            cx="100" 
            cy="100" 
            r="90" 
            stroke="white" 
            strokeWidth="3" 
            fill="rgba(255,255,255,0.05)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Inner ring */}
          <motion.circle 
            cx="100" 
            cy="100" 
            r="75" 
            stroke={theme.palette.secondary.light} 
            strokeWidth="2" 
            fill="rgba(255,255,255,0.05)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
          
          {/* Compass points */}
          <motion.path 
            d="M100 10 L100 30 M100 170 L100 190 M10 100 L30 100 M170 100 L190 100"
            stroke="white"
            strokeWidth="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          
          {/* Diagonal lines */}
          <motion.path 
            d="M30 30 L45 45 M170 30 L155 45 M30 170 L45 155 M170 170 L155 155"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="1 2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
          
          {/* Compass needle */}
          <motion.path 
            d="M100 40 L85 100 L100 160 L115 100 Z"
            fill={theme.palette.primary.main}
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotateZ: [0, 5, -5, 0] }}
            transition={{ 
              scale: { duration: 1, delay: 1.5 },
              rotateZ: { duration: 3, delay: 2, repeat: Infinity, repeatType: "reverse" }
            }}
          />
          
          {/* Center dot */}
          <motion.circle
            cx="100"
            cy="100"
            r="12"
            fill={theme.palette.secondary.main}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 1, delay: 1.8 }}
          />
          
          {/* Boat Trade text */}
          <motion.text
            x="100"
            y="100"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="white"
            fontWeight="bold"
            fontSize="10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            BOAT TRADE
          </motion.text>
        </svg>
      </MotionBox>

      {/* Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          position: 'relative', 
          zIndex: 3 
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8} textAlign="center">
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <MotionTypography
                variant="overline"
                style={{ opacity: subtitleOpacity, y: subtitleY }}
                color="secondary.light"
                sx={{ 
                  mb: 1, 
                  fontWeight: 600, 
                  letterSpacing: 3,
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
                variants={itemVariants}
              >
                BOAT TRADE • EXCELLENCE EN COMMERCE MARITIME
              </MotionTypography>
              
              <MotionTypography
                variant="h2"
                style={{ opacity: titleOpacity, y: titleY }}
                color="white"
                sx={{ 
                  fontWeight: 700, 
                  mb: 4,
                  fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4rem' },
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                  lineHeight: 1.1
                }}
                variants={itemVariants}
              >
                Naviguez Vos Rêves Maritimes
              </MotionTypography>
              
              <MotionTypography
                variant="h5"
                style={{ opacity: subtitleOpacity, y: subtitleY }}
                color="white"
                sx={{ 
                  mb: 5, 
                  maxWidth: '800px', 
                  mx: 'auto',
                  opacity: 0.9,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  fontSize: { xs: '1.1rem', md: '1.3rem' }
                }}
                variants={itemVariants}
              >
                Depuis plus d'une décennie, Boat Trade a connecté des marins passionnés avec des navires exceptionnels. Des yachts de luxe aux voiliers classiques, nous sommes votre boussole de confiance sur le marché maritime.
              </MotionTypography>
              
              <MotionBox
                style={{ opacity: buttonsOpacity, y: buttonsY }}
                sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'center',
                  mt: 5,
                }}
                variants={itemVariants}
              >
                <Link to="/boats" style={{ textDecoration: 'none' }}>
                  <MotionButton
                    variant="contained"
                    color="primary"
                    size="large"
                    whileHover={buttonHoverEffect}
                    whileTap={{ scale: 0.98 }}
                    startIcon={<DirectionsBoatIcon />}
                    sx={{ 
                      px: 4, 
                      py: 1.8,
                      minWidth: { xs: '80%', sm: '200px' },
                      alignSelf: { xs: 'center', sm: 'auto' }
                    }}
                  >
                    Explorez Notre Flotte
                  </MotionButton>
                </Link>
                
                <Link to="/sell" style={{ textDecoration: 'none' }}>
                  <MotionButton
                    variant="contained"
                    color="secondary"
                    size="large"
                    whileHover={buttonHoverEffect}
                    whileTap={{ scale: 0.98 }}
                    startIcon={<SellIcon />}
                    sx={{ 
                      px: 4, 
                      py: 1.8,
                      minWidth: { xs: '80%', sm: '200px' },
                      alignSelf: { xs: 'center', sm: 'auto' }
                    }}
                  >
                    Nos services
                  </MotionButton>
                </Link>
              </MotionBox>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll indicator */}
      <MotionBox
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          color: 'white',
          textAlign: 'center',
          opacity: 0.8,
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Faites défiler pour tracer votre parcours
        </Typography>
        <Box sx={{ fontSize: '1.5rem' }}>↓</Box>
      </MotionBox>
    </Box>
  );
};

export default HeroSection;
