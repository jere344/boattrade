import React from 'react';
import { Box, Typography, Container, Paper, Grid, useTheme, Button } from '@mui/material';
import { motion } from 'framer-motion';
import SellIcon from '@mui/icons-material/Sell';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupIcon from '@mui/icons-material/Group';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GavelIcon from '@mui/icons-material/Gavel';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import ServiceItem from './ServiceItem';

const BoatSalesService: React.FC = () => {
  const theme = useTheme();
  
  const serviceItems = [
    {
      icon: <SellIcon fontSize="medium" />,
      title: "Estimation du prix",
      description: "Analyse technique approfondie de votre bateau et évaluation précise basée sur les tendances actuelles du marché pour déterminer le prix optimal."
    },
    {
      icon: <CameraAltIcon fontSize="medium" />,
      title: "Mise en valeur",
      description: "Reportage photo et vidéo professionnel, rédaction d'une annonce attractive et précise qui met en avant les atouts de votre embarcation."
    },
    {
      icon: <GroupIcon fontSize="medium" />,
      title: "Gestion des visites",
      description: "Sélection rigoureuse des prospects sérieux et solvables, organisation et accompagnement lors des visites pour une présentation optimale."
    },
    {
      icon: <VisibilityIcon fontSize="medium" />,
      title: "Diffusion ciblée",
      description: "Publication stratégique sur les plateformes spécialisées et diffusion privilégiée auprès de notre réseau qualifié d'acheteurs potentiels."
    },
    {
      icon: <HandshakeIcon fontSize="medium" />,
      title: "Négociation professionnelle",
      description: "Défense de vos intérêts à chaque étape des discussions, maximisation de la valeur et sécurisation des conditions de vente."
    },
    {
      icon: <GavelIcon fontSize="medium" />,
      title: "Accompagnement juridique",
      description: "Gestion complète des aspects administratifs et juridiques pour une transaction sécurisée, transparente et conforme à la réglementation."
    }
  ];

  return (
    <Box 
      component="section" 
      id="vente-bateaux"
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: 'linear-gradient(135deg,rgb(86, 117, 167) 0%,rgb(62, 74, 148) 50%,rgb(52, 52, 96) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
          top: '-300px',
          right: '-200px',
          zIndex: 0,
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}10 0%, transparent 70%)`,
          bottom: '-200px',
          left: '-100px',
          zIndex: 0,
        }}
      />
      
      {/* Rising bubbles animation */}
      {[...Array(10)].map((_, index) => {
        // Randomize size, position and animation duration for each bubble
        const size = 20 + Math.random() * 60;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 15 + Math.random() * 20;
        
        return (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              bottom: -100,
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `rgba(255, 255, 255, ${0.03 + Math.random() * 0.07})`,
              zIndex: 0,
            }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -1000],
              x: [0, Math.sin(index) * 50, -Math.sin(index) * 50, 0],
              opacity: [0, 0.7, 0.7, 0]
            }}
            transition={{ 
              duration: duration,
              ease: "easeInOut",
              delay: delay,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.2, 0.8, 1]
            }}
          />
        );
      })}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={8}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              NOS SERVICES
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, #ffffff 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Vous souhaitez vendre votre bateau ?
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 8,
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}30 0%, transparent 70%)`,
                borderBottomLeftRadius: '100%',
                zIndex: 0,
              }}
            />
            
            <Box position="relative" zIndex={1}>
              <Typography 
                variant="h4" 
                component="h3" 
                gutterBottom
                sx={{ 
                  color: theme.palette.secondary.light,
                  fontWeight: 600,
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                Confiez-nous la vente de votre bateau
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ 
                  fontSize: '1.2rem', 
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '800px'
                }}
              >
                Nous prenons en charge l'ensemble du processus, de l'estimation à la finalisation de la vente, 
                vous permettant ainsi de vendre rapidement, sereinement et au meilleur prix du marché. 
                Notre expertise et notre réseau vous garantissent une transaction optimisée et sécurisée.
              </Typography>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href="#sell-form"
                  startIcon={<DirectionsBoatIcon />}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    px: 4,
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
                    '&:hover': {
                      boxShadow: `0 12px 20px rgba(0,0,0,0.3)`,
                    }
                  }}
                >
                  Vendre mon bateau maintenant
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>

        <Box mb={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h5" 
              component="h3" 
              sx={{ 
                mb: 5, 
                color: theme.palette.secondary.light,
                textAlign: 'center',
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '80px',
                  height: '3px',
                  background: theme.palette.secondary.main,
                  bottom: -10,
                  left: 'calc(50% - 40px)',
                }
              }}
            >
              Notre accompagnement inclut :
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={3}>
          {serviceItems.map((item, index) => (
            <ServiceItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box 
            sx={{ 
              mt: 8, 
              p: 4, 
              borderLeft: `4px solid ${theme.palette.secondary.main}`,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0 12px 12px 0'
            }}
          >
            <Typography 
              paragraph 
              sx={{ 
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.2rem',
                lineHeight: 1.8,
                margin: 0
              }}
            >
              Notre objectif : structurer la vente de votre bateau de manière méthodique et personnalisée, 
              en vous apportant un accompagnement rigoureux, une valorisation cohérente et une gestion 
              complète jusqu'à la finalisation de la transaction.
            </Typography>
          </Box>
        </motion.div>

        {/* Add a prominent call-to-action at the bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="#sell-form"
              startIcon={<DirectionsBoatIcon />}
              sx={{
                py: 2,
                px: 6,
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 500,
                textTransform: 'none',
                boxShadow: `0 10px 20px rgba(0,0,0,0.25)`,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                '&:hover': {
                  boxShadow: `0 15px 25px rgba(0,0,0,0.3)`,
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 10%, ${theme.palette.secondary.dark} 90%)`,
                }
              }}
            >
              Démarrer la vente de mon bateau
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default BoatSalesService;
