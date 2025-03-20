import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Paper,
  Chip,
  alpha
} from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StraightenIcon from '@mui/icons-material/Straighten';
import { BoatSummary } from '../../models/Boat';

// Motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

interface BoatCardProps {
  boat: BoatSummary;
  formatPrice: (price: number) => string;
  variant?: 'square' | 'full';
}

// Shimmer SVG component
const ShimmerEffect = () => (
  <svg
    style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      pointerEvents: 'none',
      zIndex: 3,
      opacity: 0.4
    }}
  >
    <defs>
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="20%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="80%" stopColor="rgba(255,255,255,0)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <mask id="shimmerMask">
        <rect x="0" y="0" width="100%" height="100%" fill="url(#shimmer)" />
      </mask>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#shimmerMask)" />
  </svg>
);

// Wave SVG for decoration
const WaveDecoration = ({ color = "#5d8aa8" }) => (
  <svg 
    width="100%" 
    height="50" 
    viewBox="0 0 1440 120" 
    preserveAspectRatio="none"
    style={{ 
      position: 'absolute', 
      bottom: -5, 
      left: 0, 
      zIndex: 0,
      opacity: 0.1
    }}
  >
    <path 
      d="M0,0 C320,80 420,80 720,40 C1020,0 1120,0 1440,80 L1440,120 L0,120 Z" 
      fill={color} 
    />
  </svg>
);

const BoatCard: React.FC<BoatCardProps> = ({ 
  boat, 
  formatPrice, 
  variant = 'square' 
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  // Prepare image URL with fallback
  const imageUrl = boat.main_image 
    ? `${import.meta.env.VITE_API_BASE_URL}${boat.main_image}`
    : 'https://placehold.co/600x400/e0e7ee/7d95ab?text=No+Image';

  const isPremium = boat.price > 150000;
  
  return (
    <MotionBox
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: 0.05 
      }}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <MotionBox
        whileHover={{ 
          scale: 1.02, 
          transition: { duration: 0.2 }
        }}
        sx={{
          height: '100%',
          width: '100%',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(50, 50, 93, 0.1)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,247,255,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          display: 'flex',
          flexDirection: variant === 'full' ? 'row' : 'column',
        }}
      >
        {/* Premium badge without 3D */}
        {isPremium && (
          <MotionBox
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6AB 50%, #D4AF37 100%)',
              borderRadius: '20px',
              padding: '4px 12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.5)'
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 700, 
                color: '#5B4C00',
                textTransform: 'uppercase',
                letterSpacing: 1
              }}
            >
              Elite
            </Typography>
          </MotionBox>
        )}

        {/* Image container with adjusted dimensions and bezels */}
        <MotionBox
          sx={{
            position: 'relative',
            width: variant === 'full' ? '45%' : '100%',
            height: variant === 'full' ? 'auto' : '260px', // Increased height for square variant
            borderRadius: variant === 'full' ? '16px 0 0 16px' : '16px 16px 0 0',
            overflow: 'hidden',
            padding: variant === 'full' ? '8px 0 8px 8px' : 0, // Added bezels for full variant
          }}
        >
          <MotionBox
            component="img"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }} // Reduced scale effect
            transition={{ duration: 0.7 }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(1.05) contrast(1.05)',
              borderRadius: variant === 'full' ? '12px 0 0 12px' : 'inherit',
            }}
            src={imageUrl}
            alt={boat.title}
          />
          
          {/* Static overlay gradient - removed hover effect */}
          <MotionBox 
            initial={{ opacity: 0.6 }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
              zIndex: 2
            }}
          />
          
          {/* Removed shimmer effect on hover */}
        </MotionBox>

        {/* Content section with more compact layout for square variant */}
        <MotionBox
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: variant === 'full' ? 3 : { xs: 1.5, md: 2 }, // More compact padding for square
            flexGrow: 1,
            justifyContent: 'space-between',
            zIndex: 2
          }}
        >
          {/* Top section */}
          <Box>
            {/* Category with glass effect */}
            <Chip 
              label={boat.category_detail?.name || 'Boat'} 
              sx={{ 
                mb: variant === 'square' ? 1 : 2, // Reduced margin for square
                backgroundColor: alpha('#5d8aa8', 0.2),
                backdropFilter: 'blur(4px)',
                color: '#2c4c6b',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
              size="small"
            />
            
            {/* Animated title with adjusted spacing */}
            <MotionTypography 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: '#1e3a52',
                fontSize: variant === 'full' ? '1.5rem' : '1.15rem', // Smaller font for square
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                mb: variant === 'square' ? 1 : 2 // Reduced margin for square
              }}
            >
              {boat.title}
            </MotionTypography>
            
            {/* Info row with glass effect - more compact for square */}
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: variant === 'square' ? 1 : 2, // Reduced gap for square
                my: variant === 'square' ? 1 : 2, // Reduced margin for square
                py: variant === 'square' ? 1 : 1.5, // Reduced padding for square
                px: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.6)'
              }}
            >
              {boat.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#395B75' }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" fontWeight={500}>{boat.location}</Typography>
                </Box>
              )}
              
              {boat.year_built && (
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#395B75' }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" fontWeight={500}>{boat.year_built}</Typography>
                </Box>
              )}
            </MotionBox>
          </Box>
          
          {/* Price and CTA section with adjusted spacing */}
          <MotionBox
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mt: 'auto',
              pt: variant === 'square' ? 1 : 2, // Reduced padding for square
              position: 'relative'
            }}
          >
            <MotionTypography 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              variant="h5" 
              sx={{ 
                fontWeight: 800, 
                color: isPremium ? '#1e3a52' : '#1e3a52',
                textShadow: isPremium ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                background: isPremium ? 'linear-gradient(135deg, #1e3a52 0%, #5d8aa8 100%)' : 'none',
                WebkitBackgroundClip: isPremium ? 'text' : 'none',
                WebkitTextFillColor: isPremium ? 'transparent' : 'inherit',
              }}
            >
              {formatPrice(boat.price)}
            </MotionTypography>
            
            <MotionButton
              onClick={() => navigate(`/boats/${boat.id}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              sx={{
                background: 'linear-gradient(135deg, #4a7a9c 0%, #2c4c6b 100%)',
                color: 'white',
                fontWeight: 600,
                borderRadius: '12px',
                padding: '8px 20px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(45, 78, 112, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  boxShadow: '0 6px 18px rgba(45, 78, 112, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              View Details
            </MotionButton>
          </MotionBox>
          
          {/* Decorative wave element */}
          <WaveDecoration color="#4a7a7c" />
        </MotionBox>
      </MotionBox>
    </MotionBox>
  );
};

export default BoatCard;
