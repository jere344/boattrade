import React from 'react';
import { Box, Typography, useTheme, Container, Paper } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { companyInfo } from '../../config/siteConfig';

const MapSection: React.FC = () => {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const yPos = useTransform(scrollYProgress, [0.6, 0.8], [100, 0]);
  
  // Format address for Google Maps URL (replace spaces with + for URL encoding)
  const formattedAddress = encodeURIComponent(companyInfo.address);
  
  return (
    <Box
      component={motion.div}
      sx={{
        width: '100%',
        minHeight: '600px',
        position: 'relative',
        bgcolor: theme.palette.background.paper,
        pt: 12,
        pb: 8,
      }}
    >
      {/* Background texture - world map */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          backgroundImage: `url('/world-map-texture.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      
      {/* transition from previous section with curves */}
      <Box
        sx={{
          position: 'absolute',
          top: "-1px",
          right: 0,
          width: '30%',
          height: '50px',
          // bgcolor: theme.palette.background.default,
          bgcolor: "black",
          zIndex: 1,
          borderBottomLeftRadius: '30px',
        }}>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: "-30px",
          left: 0,
          width: '70%',
          height: '50px',
          // bgcolor: theme.palette.background.default,
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          borderTopRightRadius: '30px',
        }}>
      </Box>
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            color="text.primary"
            fontWeight="bold"
            sx={{ mb: 5 }}
          >
            Trouvez-nous ici
          </Typography>
        </motion.div>
        
        <Box
          component={motion.div}
          style={{ opacity, y: yPos }}
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'center'
          }}
        >
          <Paper
            elevation={8}
            component={motion.div}
            whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            sx={{
              width: { xs: '100%', md: '60%' },
              height: 400,
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ width: '100%', height: '100%' }}>
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=fr&amp;q=${formattedAddress}+(${encodeURIComponent(companyInfo.name)})&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
                style={{ border: 0 }}
                title="Google Maps"
                aria-label="Google Maps showing company location"
              />
            </Box>
          </Paper>
          
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            sx={{ 
              width: { xs: '100%', md: '40%' },
              p: 3 
            }}
          >
            <Typography variant="h4" component="h3" gutterBottom color="text.primary">
              {companyInfo.name}
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 2 }}>
              {companyInfo.description}
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              color="text.secondary"
              sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                mb: 1 
              }}
            >
              <Box component="span" sx={{ mr: 1, color: theme.palette.primary.main }}>📍</Box>
              {companyInfo.address}
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              color="text.secondary"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 1 
              }}
            >
              <Box component="span" sx={{ mr: 1, color: theme.palette.primary.main }}>📞</Box>
              {companyInfo.phone}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                display: 'flex', 
                alignItems: 'center' 
              }}
            >
              <Box component="span" sx={{ mr: 1, color: theme.palette.primary.main }}>✉️</Box>
              {companyInfo.email}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MapSection;
