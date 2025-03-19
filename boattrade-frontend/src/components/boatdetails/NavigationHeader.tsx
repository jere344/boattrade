import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTransform, useScroll } from "framer-motion";
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import { animate } from "framer-motion";
import React from "react";

const MotionBox = motion(Box);

interface NavigationHeaderProps {
    boatTitle: string;
    onInquiryClick: () => void;
}

const NavigationHeader = ({ boatTitle, onInquiryClick }: NavigationHeaderProps) => {
    const { scrollYProgress } = useScroll();
    
    // Enhanced animations based on scroll
    const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -10]);
    const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.97]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
    
    // Dynamic effects based on scroll
    const gradientOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 0.9]);
    const blurStrength = useTransform(scrollYProgress, [0, 0.1], [10, 15]);
    
    // Wave animation for the decorative elements
    const waveY = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
    const wave2Y = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
    
    // Dynamic background using useMotionTemplate
    const backgroundDark = useMotionTemplate`rgba(20, 28, 45, ${gradientOpacity})`;
    const backdropBlur = useMotionTemplate`blur(${blurStrength}px)`;
    
    // Boat icon floating animation
    const floatY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        [0, 3, 0, -3, 0, 3]
    );
    const rotateBoat = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        [0, 3, 0, -3, 0, 3]
    );

    // Water fill animation
    const waterHeight = useTransform(
        scrollYProgress,
        [0, 0.8], // Range from start to almost end of scroll
        ["0%", "120%"] // Water height from 0% to 100%
    );
    
    // Multiple wave offsets for smoother animations
    const waveOffsetX1 = useMotionValue(0);
    const waveOffsetX2 = useMotionValue(0);
    const waveOffsetY1 = useMotionValue(0);
    const waveOffsetY2 = useMotionValue(0);
    
    // Animate waves continuously with different timings for natural effect
    React.useEffect(() => {
        // First wave horizontal movement (slower)
        const animationX1 = animate(waveOffsetX1, -400, {
            duration: 15,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
        });
        
        // Second wave horizontal movement (faster)
        const animationX2 = animate(waveOffsetX2, -400, {
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
        });
        
        // First wave vertical movement
        const animationY1 = animate(waveOffsetY1, [0, -2, 0, 2, 0], {
            duration: 3.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
        });
        
        // Second wave vertical movement (different timing)
        const animationY2 = animate(waveOffsetY2, [0, 2, 0, -2, 0], {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
        });
        
        return () => {
            animationX1.stop();
            animationX2.stop();
            animationY1.stop();
            animationY2.stop();
        };
    }, []);

    // Create wave SVG elements for more natural waves
    const waveStrength = 20; // Adjust for stronger/weaker waves
    const generateWaveSvg = (color: string, opacity: number) => {
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 40' preserveAspectRatio='none'%3E%3Cpath d='M0,20 Q200,${20-waveStrength} 400,20 T800,20 T1200,20 V40 H0 Z' fill='${color}' fill-opacity='${opacity}'/%3E%3C/svg%3E")`;
    }

    return (
        <MotionBox
            style={{ 
                y: headerY, 
                scale: headerScale, 
                opacity: headerOpacity,
                backdropFilter: backdropBlur,
                background: backgroundDark
            }}
            sx={{
                position: "fixed",
                top: 10,
                left: { xs: 16, sm: 32, md: 48 },
                right: { xs: 16, sm: 32, md: 48 },
                zIndex: 100,
                py: 2.5,
                px: 4,
                borderRadius: "24px",
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0px rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transform: 'translateZ(0)', // Force GPU acceleration
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(20, 28, 45, 0.9) 0%, rgba(18, 35, 60, 0.9) 100%)',
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            {/* Blue glow accent */}
            <Box 
                sx={{
                    position: 'absolute',
                    top: -100,
                    left: -100,
                    width: 200, 
                    height: 200,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(65, 105, 225, 0.15) 0%, transparent 70%)',
                }}
            />
            
            {/* Water fill container */}
            <MotionBox
                style={{
                    height: waterHeight,
                }}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, rgba(30, 144, 255, 0.2) 0%, rgba(0, 119, 190, 0.4) 100%)',
                    zIndex: 1,
                    borderBottomLeftRadius: '24px',
                    borderBottomRightRadius: '24px',
                }}
            >
                {/* First animated wave at top of water */}
                <MotionBox
                    style={{ 
                        x: waveOffsetX1,
                        y: waveOffsetY1
                    }}
                    sx={{
                        position: 'absolute',
                        top: -15,
                        left: -400,
                        right: -400,
                        height: '40px',
                        backgroundImage: generateWaveSvg('rgb(30,144,255)', 0.4),
                        backgroundRepeat: 'repeat-x',
                        backgroundSize: '800px 40px',
                        zIndex: 2,
                    }}
                />
                
                {/* Second animated wave with different timing/offset */}
                <MotionBox
                    style={{ 
                        x: waveOffsetX2,
                        y: waveOffsetY2
                    }}
                    sx={{
                        position: 'absolute',
                        top: -10,
                        left: -400,
                        right: -400,
                        height: '30px',
                        backgroundImage: generateWaveSvg('rgb(30,144,255)', 0.3),
                        backgroundRepeat: 'repeat-x',
                        backgroundSize: '600px 30px',
                        zIndex: 3,
                    }}
                />
                
                {/* Water surface reflection */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '15px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                        opacity: 0.3,
                    }}
                />
                
                {/* Improved water bubbles */}
                <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    overflow: 'hidden'
                }}>
                    {[...Array(12)].map((_, i) => {
                        // Calculate random but stable positions and sizes
                        const size = React.useMemo(() => Math.random() * 8 + 4, []);
                        const leftPos = React.useMemo(() => Math.random() * 100, []);
                        const topPos = React.useMemo(() => Math.random() * 100, []);
                        const duration = React.useMemo(() => Math.random() * 5 + 4, []);
                        const delay = React.useMemo(() => Math.random() * 8, []);
                        
                        return (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    width: size,
                                    height: size,
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 70%)',
                                    left: `${leftPos}%`,
                                    top: `${topPos}%`,
                                }}
                                animate={{
                                    y: [0, -100 - Math.random() * 50],
                                    x: [0, (Math.random() - 0.5) * 20],
                                    opacity: [0, 0.7, 0],
                                    scale: [0.3, 1, 0.8],
                                }}
                                transition={{
                                    duration: duration,
                                    repeat: Infinity,
                                    delay: delay,
                                    ease: "easeInOut",
                                    times: [0, 0.8, 1]
                                }}
                            />
                        );
                    })}
                </Box>
            </MotionBox>
            
            {/* Animated wave decorations */}
            <MotionBox
                style={{ y: waveY }}
                sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -10,
                    right: -10,
                    height: '40px',
                    opacity: 0.07,
                    background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23ffffff\'%3E%3C/path%3E%3C/svg%3E")',
                    backgroundSize: 'cover',
                    zIndex: 0,
                }}
            />
            
            <MotionBox
                style={{ y: wave2Y }}
                sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -10,
                    right: -10,
                    height: '30px',
                    opacity: 0.05,
                    background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z\' fill=\'%23ffffff\'%3E%3C/path%3E%3C/svg%3E")',
                    backgroundSize: 'cover',
                    zIndex: 0,
                }}
            />
            
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: 'relative', zIndex: 2 }}>
                <MotionBox
                    whileHover={{ x: -5, color: "#7CB9E8" }}
                    whileTap={{ scale: 0.97 }}
                    sx={{
                        color: "#B0E0E6",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        textShadow: '0 0 10px rgba(176, 224, 230, 0.3)',
                    }}
                    onClick={() => window.history.back()}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                    <motion.div
                        whileHover={{ 
                            rotate: -20,
                            scale: 1.1,
                            transition: { duration: 0.2 } 
                        }}
                    >
                        <ArrowBackIcon />
                    </motion.div>
                    <motion.span>Back to listings</motion.span>
                </MotionBox>

                <MotionBox
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <MotionBox 
                        style={{ y: floatY, rotate: rotateBoat }}
                        sx={{ color: "#7CB9E8", marginRight: 1 }}
                    >
                        <DirectionsBoatIcon fontSize="small" />
                    </MotionBox>
                    
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600,
                            backgroundImage: 'linear-gradient(90deg, #B0E0E6, #7CB9E8)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 10px rgba(124, 185, 232, 0.3)',
                        }}
                    >
                        {boatTitle}
                    </Typography>
                </MotionBox>

                <MotionBox
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(124, 185, 232, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    sx={{ display: { xs: "none", md: "block" } }}
                >
                    <Button
                        variant="contained"
                        onClick={onInquiryClick}
                        sx={{ 
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #4682B4 0%, #1E3A5F 100%)',
                            boxShadow: '0 4px 15px rgba(30, 58, 95, 0.5)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5693C5 0%, #2F4B70 100%)',
                            }
                        }}
                    >
                        Contact Seller
                    </Button>
                </MotionBox>
            </Box>
        </MotionBox>
    );
};

export default NavigationHeader;