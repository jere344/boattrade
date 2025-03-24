import React from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  maxHeight?: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description, index, maxHeight=230 }) => {
  const theme = useTheme();
  
  return (
    <Grid item xs={12} md={6} lg={4}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        viewport={{ once: true }}
      >
        <Paper
          elevation={0}
          component={motion.div}
          whileHover={{ 
            y: -8,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
            transition: { duration: 0.3 }
          }}
          sx={{
            p: 3,
            height: maxHeight,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'all 0.3s ease-in-out',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}15, transparent)`,
              borderRadius: '12px',
              zIndex: -1,
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                marginRight: 2,
                color: theme.palette.secondary.light,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.light}30, transparent)`,
                  top: 0,
                  left: 0,
                }
              }}
            >
              {icon}
            </Box>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ 
                color: theme.palette.secondary.light,
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            sx={{
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.7,
              fontSize: '1.05rem',
              flex: 1, // Take remaining space in flex container
              overflow: 'auto', // Allow scrolling if content is too long
            }}
          >
            {description}
          </Typography>
        </Paper>
      </motion.div>
    </Grid>
  );
};

export default ServiceItem;
