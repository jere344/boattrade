import React from 'react';
import { Box, Typography, Grid, Container, Paper, useTheme, Icon } from '@mui/material';
import { motion } from 'framer-motion';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import SearchIcon from '@mui/icons-material/Search';
import HandshakeIcon from '@mui/icons-material/Handshake';

const StepCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * index }}
      viewport={{ once: true }}
    >
      <Paper
        elevation={0}
        component={motion.div}
        whileHover={{ 
          y: -10,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          transition: { duration: 0.3 }
        }}
        sx={{
          p: 4,
          height: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}10, transparent)`,
            borderRadius: '16px',
            zIndex: -1,
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            mb: 3,
            color: theme.palette.secondary.light,
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.secondary.light}50, transparent)`,
              top: 0,
              left: 0,
            }
          }}
        >
          {icon}
        </Box>
        
        <Typography 
          variant="h5" 
          component={motion.h5}
          sx={{ 
            mb: 2, 
            color: theme.palette.secondary.light,
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '40%',
              height: '2px',
              background: theme.palette.secondary.main,
              bottom: -8,
              left: 0,
            }
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: 1.8 
          }}
        >
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const HowItWorksSection: React.FC = () => {
  const theme = useTheme();
  
  // Wave path animation data - keeping the same paths
  const wavePath = {
    initial: {
      d: "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    },
    animate: {
      d: "M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,117.3C672,85,768,75,864,90.7C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    }
  };
  
  // Steps data
  const steps = [
    {
      icon: <SearchIcon sx={{ fontSize: 36 }} />,
      title: "Rechercher des bateaux",
      description: "Parcourez notre vaste catalogue de bateaux, filtrez par type, gamme de prix, spécifications et plus encore pour trouver votre correspondance parfaite."
    },
    {
      icon: <DirectionsBoatIcon sx={{ fontSize: 36 }} />,
      title: "Contacter les vendeurs",
      description: "Une fois que vous avez trouvé le bateau de vos rêves, connectez-vous facilement avec les vendeurs directement via notre système de messagerie sécurisé."
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 36 }} />,
      title: "Conclure l'affaire",
      description: "Nous vous guidons tout au long du processus, de la négociation à la paperasse, en assurant une transaction fluide et réussie."
    }
  ];

  return (
    <Box 
      sx={{ 
        position: 'relative',
        py: 12,
        backgroundColor: '#1a2438',
        backgroundImage: `linear-gradient(135deg, #1a2438 0%, #2a3448 100%)`,
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Top blur transition */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120px',
          background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.7) 0%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      {/* Background elements */}
      <Box 
        sx={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}20 0%, transparent 70%)`,
          top: '-200px',
          right: '-100px',
          zIndex: 0,
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}20 0%, transparent 70%)`,
          bottom: '-100px',
          left: '50px',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt:12, mb: 20 }}>
        <Box textAlign="center" mb={8}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="overline" 
              component="div"
              sx={{ 
                color: theme.palette.secondary.light, 
                mb: 1,
                letterSpacing: 2,
                fontWeight: 500
              }}
            >
              EXPÉRIENCE SANS FAILLE
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, #ffffff 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}
            >
              Comment ça marche
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              sx={{ 
                maxWidth: 650, 
                mx: 'auto', 
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 6
              }}
            >
              Notre processus simplifié rend l'échange de bateaux simple et agréable,
              connectant acheteurs et vendeurs avec transparence et confiance.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StepCard 
                icon={step.icon} 
                title={step.title} 
                description={step.description}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Wave transition to next section */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: -2,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          height: '120px', // Explicit height to ensure visibility
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ 
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        >
          <motion.path 
            d={wavePath.initial.d}
            fill={theme.palette.background.default}
            animate={{
              d: [wavePath.initial.d, wavePath.animate.d, wavePath.initial.d]
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default HowItWorksSection;
