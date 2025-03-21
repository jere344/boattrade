import React from 'react';
import { Box, Typography, Grid, Container, Paper, useTheme, Icon, Divider, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import PersonIcon from '@mui/icons-material/Person';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const ContentSection: React.FC<{
  icon?: React.ReactNode;
  title?: string;
  content: string | React.ReactNode;
  index: number;
  divider?: boolean;
}> = ({ icon, title, content, index, divider = false }) => {
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
        {icon && (
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
        )}
        
        {title && (
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
        )}
        
        {typeof content === 'string' ? (
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.8 
            }}
          >
            {content}
          </Typography>
        ) : content}

        {divider && (
          <Divider 
            sx={{ 
              my: 3, 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              width: '100%',
              '&::before': {
                content: '"⸻"',
                display: 'block',
                textAlign: 'center',
                color: theme.palette.secondary.light,
                letterSpacing: 2,
              }
            }} 
          />
        )}
      </Paper>
    </motion.div>
  );
};

const AboutCompanySection: React.FC = () => {
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
  
  // Company content
  const founderIntroContent = (
    <Box 
      sx={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)`,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}30 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}20 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* Content wrapper */}
      <Grid container sx={{ position: 'relative', zIndex: 1 }}>
        {/* Founder image section */}
        <Grid 
          item 
          xs={12} 
          md={4}
          sx={{
            background: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 4, md: 6 },
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '20%',
              height: '60%',
              width: '1px',
              background: `linear-gradient(to bottom, transparent, ${theme.palette.secondary.main}, transparent)`,
            }
          }}
        >
          <Avatar 
            sx={{ 
              width: 120, 
              height: 120, 
              border: `3px solid ${theme.palette.secondary.main}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              mb: 3
            }}
            alt="Stephen"
            src="/images/founder.jpg" // Add a real image path if available
          />
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: theme.palette.secondary.light,
              textAlign: 'center',
              mb: 1,
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Stephen
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mb: 3,
              fontSize: '0.75rem'
            }}
          >
            Fondateur & Consultant
          </Typography>
          
          <Box 
            sx={{ 
              width: '40px', 
              height: '2px', 
              background: theme.palette.secondary.main,
              mb: 3
            }}
          />
          
          <FormatQuoteIcon 
            sx={{ 
              fontSize: 60, 
              color: theme.palette.secondary.main,
              opacity: 0.4,
            }} 
          />
        </Grid>
        
        {/* Quote section */}
        <Grid 
          item 
          xs={12} 
          md={8}
          sx={{
            p: { xs: 4, md: 6 },
            pt: { md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              fontStyle: 'italic',
              color: theme.palette.secondary.light,
              letterSpacing: '0.02em',
              fontWeight: 500,
              position: 'relative',
              pl: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: -8,
                top: -20,
                width: 40,
                height: 40,
              }
            }}
          >
            Je suis Stephen, fondateur de Boat Trade Consulting.
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 2,
              fontSize: '1.05rem',
              mb: 3,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Depuis toujours, la pêche hauturière et les sorties en mer animent ma vie. C'est cette passion pour la mer et le nautisme qui m'a permis de comprendre les défis uniques de la vente et de l'achat de bateaux.
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 2,
              fontSize: '1.05rem',
              mb: 3,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Dans ce domaine, tant les vendeurs que les acheteurs rencontrent souvent des obstacles. Les vendeurs, parfois absents ou difficilement disponibles sur place, et les acheteurs, souvent mal préparés face à un marché complexe, se retrouvent fréquemment désemparés.
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 2,
              fontSize: '1.05rem',
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Boat Trade Consulting a été créé pour répondre à ces défis. Mon équipe et moi vous offrons un service fluide, professionnel et parfaitement adapté aux exigences du marché.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
  
  const missionContent = (
    <Box>
      <Typography variant="h6" sx={{ color: theme.palette.secondary.light, mb: 2 }}>
        Notre mission :
      </Typography>
      <Typography 
        variant="body1" 
        component="div"
        sx={{ 
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: 1.8,
          fontStyle: 'italic',
          borderLeft: `4px solid ${theme.palette.secondary.main}`,
          pl: 3,
          py: 1
        }}
      >
        "Nous accompagnons nos clients avec un service de qualité, à la hauteur de leurs attentes. Grâce à notre expertise, nous vous guidons à chaque étape du processus, anticipons vos besoins et garantissons une gestion proactive et efficace. Chaque transaction est conçue pour être transparente et optimisée, afin de vous permettre de prendre des décisions en toute confiance."
      </Typography>
    </Box>
  );
  
  const whyChooseUs = (
    <Box>
      <Typography variant="h6" sx={{ color: theme.palette.secondary.light, mb: 2 }}>
        Pourquoi nous choisir?
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: 1.8 
        }}
      >
        Chez Boat Trade Consulting, chaque vente de bateau est bien plus qu'une simple transaction. Nous croyons en la valeur du service sur mesure, la réussite de votre projet, et la relation de confiance. Si vous souhaitez vendre ou acheter un bateau, contactez-nous et offrez à votre projet nautique l'exigence et la rigueur qu'il mérite.
      </Typography>
    </Box>
  );

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
              BOAT TRADE CONSULTING
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
              Notre expertise à votre service
            </Typography>
          </motion.div>
        </Box>

        {/* Founder section - directly in the container, not using ContentSection */}
        <Box mb={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {founderIntroContent}
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContentSection 
              icon={<TaskAltIcon sx={{ fontSize: 36 }} />}
              content={missionContent}
              index={1}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <ContentSection 
              icon={<HandshakeIcon sx={{ fontSize: 36 }} />}
              content={whyChooseUs}
              index={2}
            />
          </Grid>
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

export default AboutCompanySection;
