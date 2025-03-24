import React from 'react';
import { Box, Typography, Container, Paper, Grid, useTheme, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ServiceItem from './ServiceItem';

const PurchaseAssistanceService: React.FC = () => {
  const theme = useTheme();
  
  const serviceItems = [
    {
      icon: <AssignmentIcon fontSize="medium" />,
      title: "Définition de votre projet",
      description: "Nous prenons le temps de comprendre votre programme de navigation, vos exigences techniques, votre expérience, votre budget, pour cibler des bateaux réellement adaptés à votre usage."
    },
    {
      icon: <SearchIcon fontSize="medium" />,
      title: "Recherche et sélection personnalisée",
      description: "Nous identifions des unités pertinentes sur le marché, visibles ou confidentielles, et vous évitons de perdre du temps dans des visites inutiles ou mal ciblées."
    },
    {
      icon: <FactCheckIcon fontSize="medium" />,
      title: "Analyse approfondie des bateaux",
      description: "Nous examinons leur historique, leur entretien, leur cohérence technique, leurs points de vigilance. Vous avancez avec une vision claire et objective."
    },
    {
      icon: <HandshakeIcon fontSize="medium" />,
      title: "Conseil à la négociation",
      description: "Nous vous accompagnons dans l'évaluation de la valeur réelle du bateau et vous aidons à défendre votre intérêt avec justesse et tact."
    },
    {
      icon: <SupportAgentIcon fontSize="medium" />,
      title: "Encadrement administratif et logistique",
      description: "Nous vous assistons dans les démarches administratives, les vérifications essentielles et vous mettons en relation avec les bons professionnels (experts maritimes, assureurs...)."
    }
  ];

  return (
    <Box 
      component="section" 
      id="accompagnement-achat"
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: 'linear-gradient(135deg, #001424 0%, #012442 50%, #023657 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.dark}30 0%, transparent 70%)`,
          bottom: '-300px',
          right: '-200px',
          zIndex: 0,
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
          top: '-200px',
          left: '-100px',
          zIndex: 0,
        }}
      />
      
      {/* Deep water floating particles */}
      {[...Array(15)].map((_, index) => {
        const size = 10 + Math.random() * 40;
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = 25 + Math.random() * 30;
        
        return (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              top: Math.random() * 1000,
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `rgba(255, 255, 255, ${0.02 + Math.random() * 0.05})`,
              zIndex: 0,
            }}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -300, 0],
              x: [0, Math.sin(index) * 30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: duration,
              ease: "easeInOut",
              delay: delay,
              repeat: Infinity,
              repeatType: "loop"
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
                color: theme.palette.primary.light, 
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
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, #ffffff 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Accompagnement à l'achat
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
                left: 0,
                width: '150px',
                height: '150px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}30 0%, transparent 70%)`,
                borderBottomRightRadius: '100%',
                zIndex: 0,
              }}
            />
            
            <Box position="relative" zIndex={1}>
              <Typography 
                variant="h4" 
                component="h3" 
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.light,
                  fontWeight: 600,
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                Acheter un bateau, c'est plus qu'un achat.
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ 
                  fontSize: '1.2rem', 
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2
                }}
              >
                C'est un projet de vie, une envie d'ailleurs, parfois un rêve mûri depuis longtemps. 
                Mais c'est aussi une démarche complexe, technique, et parfois risquée, surtout lorsque 
                les enjeux financiers et les inconnues s'accumulent.
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ 
                  fontSize: '1.2rem', 
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2
                }}
              >
                Un environnement d'achat complexe, où l'essentiel se joue souvent dans les détails 
                techniques ou administratifs, une crainte de surpayer, d'acheter un bateau mal entretenu, 
                ou simplement peur de faire un mauvais choix…
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ 
                  fontSize: '1.2rem', 
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500
                }}
              >
                Nous sommes là pour transformer ce parcours en une expérience sereine, structurée et maîtrisée.
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        <Divider sx={{ 
          my: 6, 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '50px',
            height: '3px',
            backgroundColor: theme.palette.primary.main,
            top: '-1px',
            left: 'calc(50% - 25px)'
          }
        }} />

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
                color: theme.palette.primary.light,
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
                  background: theme.palette.primary.main,
                  bottom: -10,
                  left: 'calc(50% - 40px)',
                }
              }}
            >
              Notre accompagnement comprend :
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
              maxHeight={260}
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
              borderLeft: `4px solid ${theme.palette.primary.main}`,
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
              Notre objectif : vous guider pas à pas dans votre projet d'achat, en apportant notre expertise, 
              notre regard critique et notre méthodologie pour vous permettre de concrétiser votre rêve nautique 
              dans les meilleures conditions.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PurchaseAssistanceService;
