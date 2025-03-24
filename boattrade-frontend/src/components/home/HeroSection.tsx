import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Container, Grid, useTheme, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, useTransform, useScroll, useMotionValue, useSpring } from "framer-motion";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import SellIcon from "@mui/icons-material/Sell";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import boatVideo from "@assets/vecteezy-boat.mp4";
import marseilleVideo from "@assets/veteezy-marseille.mp4"; // Add this file to your assets
// import logoImage from "@assets/logo.webp";
import { companyInfo } from "../../config/siteConfig";

const MotionBox =  motion.create(Box);
const MotionTypography =  motion.create(Typography);
const MotionButton =  motion.create(Button);
const MotionChip =  motion.create(Chip);

const HeroSection: React.FC = () => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isFirstVideo, setIsFirstVideo] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
    const [isFading, setIsFading] = useState(false);
    
    const videoRef1 = useRef<HTMLVideoElement>(null) as React.RefObject<HTMLVideoElement>;
    const videoRef2 = useRef<HTMLVideoElement>(null) as React.RefObject<HTMLVideoElement>;
    
    const theme = useTheme();
    const { scrollYProgress } = useScroll();
    const rotation = useMotionValue(0);
    const smoothRotation = useSpring(rotation, { damping: 50, stiffness: 100 });

    // Video sources array
    const videoSources = [boatVideo, marseilleVideo];

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

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [rotation]);

    const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const subtitleY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);
    const buttonsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const buttonsY = useTransform(scrollYProgress, [0, 0.3], [0, -20]);

    // Track which videos have been loaded to avoid duplicate network requests
    const loadVideo = (index: number, videoRef: React.RefObject<HTMLVideoElement>) => {
        const videoSrc = videoSources[index];
        
        // Only load if not already loaded
        if (!loadedVideos.includes(videoSrc) && videoRef.current) {
            console.log(`Loading video ${index}: ${videoSrc}`);
            videoRef.current.src = videoSrc;
            videoRef.current.load();
            setLoadedVideos(prev => [...prev, videoSrc]);
        }
    };

    // Initialize first video on mount
    useEffect(() => {
        if (videoRef1.current) {
            loadVideo(0, videoRef1);
            videoRef1.current.play().catch(e => console.error("Video playback error:", e));
        }
        
        // Preload the second video shortly after the first starts playing
        const timer = setTimeout(() => {
            loadVideo(1, videoRef2);
        }, 3000); // Wait 3 seconds before loading second video
        
        return () => clearTimeout(timer);
    }, []);

    const handleVideoEnded = () => {
        // Start crossfade transition
        setIsFading(true);
        
        // Calculate next video index
        const nextIndex = (activeVideoIndex + 1) % videoSources.length;
        setActiveVideoIndex(nextIndex);
        
        // Toggle which video element is active
        setIsFirstVideo(prev => !prev);
        
        // Determine which video refs to use
        const currentRef = isFirstVideo ? videoRef1 : videoRef2;
        const nextRef = isFirstVideo ? videoRef2 : videoRef1;
        
        // Make sure next video is ready
        if (nextRef.current) {
            // Only load if not already loaded
            loadVideo(nextIndex, nextRef);
            
            // Play the next video
            nextRef.current.play().catch(e => console.error("Video playback error:", e));
            
            // Calculate the next video to preload (but don't load it yet)
            const preloadIndex = (nextIndex + 1) % videoSources.length;
            
            // After transition is complete
            setTimeout(() => {
                setIsFading(false);
                
                // Reset the current video to the beginning but don't play it
                if (currentRef.current) {
                    currentRef.current.currentTime = 0;
                }
                
                // Preload the next video in sequence if needed
                if (!loadedVideos.includes(videoSources[preloadIndex])) {
                    // Wait a bit after transition before preloading next video
                    setTimeout(() => {
                        loadVideo(preloadIndex, currentRef);
                    }, 3000);
                }
            }, 1000); // Match this to the CSS transition time
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
        },
    };

    const buttonHoverEffect = {
        scale: 1.05,
        transition: { duration: 0.3 },
    };

    // Animated wave SVG path
    const wavePath = {
        initial: {
            d: "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        },
        animate: {
            d: "M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,117.3C672,85,768,75,864,90.7C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        },
    };

    return (
        <Box
            sx={{
                position: "relative",
                height: "100vh",
                width: "100%",
                overflow: "hidden",
            }}
        >
            {/* Video Background */}
            <Box
                sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    }}
                />
                
                {/* First video element */}
                <video
                    ref={videoRef1}
                    muted
                    playsInline
                    onEnded={isFirstVideo ? handleVideoEnded : undefined}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isFirstVideo ? 1 : isFading ? 0 : 0,
                        transition: "opacity 1s ease-in-out",
                        zIndex: 0,
                    }}
                />
                
                {/* Second video element */}
                <video
                    ref={videoRef2}
                    muted
                    playsInline
                    onEnded={!isFirstVideo ? handleVideoEnded : undefined}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: !isFirstVideo ? 1 : isFading ? 0 : 0,
                        transition: "opacity 1s ease-in-out",
                        zIndex: 0,
                    }}
                />
                
                {/* Gradient overlay at bottom for smoother text visibility */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "30%",
                        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
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
                        ease: "easeInOut",
                    },
                }}
                sx={{
                    position: "absolute",
                    bottom: -5,
                    left: 0,
                    width: "100%",
                    height: "200px",
                    zIndex: 2,
                    opacity: 0.8,
                }}
            >
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
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
                            ease: "easeInOut",
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
                    position: "absolute",
                    top: "15%",
                    left: "5%",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${theme.palette.primary.light} 0%, transparent 70%)`,
                    filter: "blur(60px)",
                    zIndex: 1,
                    display: { xs: "none", md: "block" },
                }}
            />

            <MotionBox
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 0.15, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                sx={{
                    position: "absolute",
                    bottom: "20%",
                    right: "10%",
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
                    filter: "blur(50px)",
                    zIndex: 1,
                    display: { xs: "none", md: "block" },
                }}
            />

            {/* Video attribution - hidden visually but accessible to screen readers */}
            <Box 
                sx={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: 0,
                    zIndex: 10,
                }}
                aria-hidden="false"
            >
                <a href="https://www.vecteezy.com/free-videos/boat">Boat Stock Videos by Vecteezy</a>
            </Box>

            {/* Logo Image - Fixed visibility issues */}
            {/* <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}  // Changed from 0.9 to 1 for full visibility
                transition={{ duration: 1, delay: 0.5 }}
                sx={{
                    position: "absolute",
                    top: { xs: "20px", md: "30px" },
                    left: { xs: "20px", md: "40px" },
                    zIndex: 20,  // Increased z-index to ensure it appears above other elements
                    width: { xs: "100px", sm: "120px", md: "140px" },  // Increased size
                    height: "auto",
                    filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.5))",  // Enhanced shadow
                    backgroundColor: "rgba(255, 255, 255, 0.2)",  // Added visible background
                    padding: "8px",
                    borderRadius: "6px",
                }}
            >
                <img 
                    src={logoImage} 
                    alt="Boat Trade Logo" 
                    style={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block',  // Ensures proper rendering
                    }} 
                    onError={(e) => {
                        console.error("Failed to load logo image");
                        // Fallback text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.height = "50px";
                        target.style.background = "#1976d2";
                        target.style.display = "flex";
                        target.style.alignItems = "center";
                        target.style.justifyContent = "center";
                        target.style.color = "white";
                        target.style.padding = "10px";
                        target.style.fontWeight = "bold";
                        target.style.fontSize = "16px";
                        target.outerHTML = `<div style="height:50px;background:#1976d2;color:white;display:flex;align-items:center;justify-content:center;padding:10px;font-weight:bold;width:100%;">BOAT TRADE</div>`;
                    }}
                    onLoad={() => console.log("Logo image loaded successfully")}
                />
            </MotionBox> */}

            {/* Interactive Compass Element - THE MEMORABLE ELEMENT */}
            <MotionBox
                style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotate: smoothRotation,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    delay: 0.8,
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "8%", md: "2%", lg: "6%", xl: "13%" },
                    right: { xs: "10%", md: "7%", lg: "7%", xl: "15%" },
                    width: { xs: "100px", sm: "140px", md: "160px", lg: "180px" },
                    height: { xs: "100px", sm: "140px", md: "160px", lg: "180px" },
                    zIndex: 5,
                    filter: "drop-shadow(0px 0px 15px rgba(172, 190, 206, 0.7))",
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
                            rotateZ: { duration: 3, delay: 2, repeat: Infinity, repeatType: "reverse" },
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
                        <tspan x="100" dy="-5">BOAT TRADE</tspan>
                        <tspan x="100" dy="12">CONSULTING</tspan>
                    </motion.text>
                </svg>
            </MotionBox>

            {/* Content */}
            <Container
                maxWidth="lg"
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 3,
                }}
            >
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10} lg={8} textAlign="center">
                        <MotionBox variants={containerVariants} initial="hidden" animate="visible">
                            <MotionTypography
                                variant="overline"
                                style={{ opacity: subtitleOpacity, y: subtitleY }}
                                color="secondary.light"
                                sx={{
                                    mb: 1,
                                    fontWeight: 600,
                                    letterSpacing: 3,
                                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                                }}
                                variants={itemVariants}
                            >
                                
                            </MotionTypography>

                            <MotionTypography
                                variant="h2"
                                style={{ opacity: titleOpacity, y: titleY }}
                                color="white"
                                sx={{
                                    fontWeight: 700,
                                    mb: 4,
                                    fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" },
                                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                                    lineHeight: 1.1,
                                }}
                                variants={itemVariants}
                            >
                                BOAT TRADE CONSULTING
                            </MotionTypography>

                            <MotionTypography
                                variant="h5"
                                style={{ opacity: subtitleOpacity, y: subtitleY }}
                                color="white"
                                sx={{
                                    mb: 3,
                                    maxWidth: "800px",
                                    mx: "auto",
                                    opacity: 0.9,
                                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                                }}
                                variants={itemVariants}
                            >
                                Votre allié au service de votre transaction nautique
                            </MotionTypography>

                            {/* Enhanced Location Display */}
                            <MotionBox
                                style={{ opacity: subtitleOpacity, y: subtitleY }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 5,
                                    mt: 2,
                                }}
                                variants={itemVariants}
                            >
                                <MotionChip
                                    icon={<LocationOnIcon />}
                                    label={companyInfo.city}
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(10px)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        py: 2,
                                        px: 1,
                                        '& .MuiChip-icon': {
                                            color: theme.palette.secondary.light,
                                        },
                                        fontSize: { xs: "0.9rem", md: "1.1rem" },
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        fontWeight: 500,
                                    }}
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                                    }}
                                />
                            </MotionBox>

                            <MotionBox
                                style={{ opacity: buttonsOpacity, y: buttonsY }}
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "center",
                                    mt: 5,
                                }}
                                variants={itemVariants}
                            >
                                <Link to="/boats" style={{ textDecoration: "none" }}>
                                    <MotionButton
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        whileHover={buttonHoverEffect}
                                        whileTap={{ scale: 0.98 }}
                                        startIcon={<DirectionsBoatIcon />}
                                        sx={{
                                            px: 4,
                                            py: 1.8,
                                            minWidth: { xs: "80%", sm: "200px" },
                                            alignSelf: { xs: "center", sm: "auto" },
                                        }}
                                    >
                                        Explorez Notre Flotte
                                    </MotionButton>
                                </Link>

                                <Link to="/services" style={{ textDecoration: "none" }}>
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
                                            minWidth: { xs: "80%", sm: "200px" },
                                            alignSelf: { xs: "center", sm: "auto" },
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
        </Box>
    );
};

export default HeroSection;
