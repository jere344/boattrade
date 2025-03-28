import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, useTheme, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, useTransform, useScroll, useMotionValue, useSpring } from "framer-motion";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import SellIcon from "@mui/icons-material/Sell";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import VideoBackground from "../common/VideoBackground";
import boatVideo from "@assets/vecteezy-boat.mp4";
import motorboat from "@assets/motoboat.mp4";
import { companyInfo } from "../../config/siteConfig";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionChip = motion(Chip);

const HeroSection: React.FC = () => {
    const videoSources = [boatVideo, motorboat];
    const theme = useTheme();
    const { scrollYProgress } = useScroll();
    const rotation = useMotionValue(0);
    const smoothRotation = useSpring(rotation, { damping: 50, stiffness: 100 });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            setMousePosition({ x, y });
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
            <VideoBackground 
                videoSources={videoSources} 
                overlayOpacity={0.5}
                showGradientOverlay={true}
            />

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
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }}
                sx={{
                    position: "absolute",
                    bottom: { xs: "8%", md: "5%" },
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "100px", sm: "120px", md: "140px", lg: "160px" },
                    height: { xs: "100px", sm: "120px", md: "140px", lg: "160px" },
                    zIndex: 5,
                    filter: "drop-shadow(0px 0px 15px rgba(172, 190, 206, 0.7))",
                    cursor: "pointer",
                    "&:hover": {
                        filter: "drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.9))",
                    }
                }}
            >
                <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <motion.path
                        d="M100 10 L100 30 M100 170 L100 190 M10 100 L30 100 M170 100 L190 100"
                        stroke="white"
                        strokeWidth="3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    />
                    <motion.path
                        d="M30 30 L45 45 M170 30 L155 45 M30 170 L45 155 M170 170 L155 155"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="1 2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    />
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
                    <motion.circle
                        cx="100"
                        cy="100"
                        r="12"
                        fill={theme.palette.secondary.main}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 1, delay: 1.8 }}
                    />
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
                    <motion.path
                        d="M100 140 L85 125 L100 125 L100 110 L100 125 L115 125 Z"
                        fill="white"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: [0, 5, 0] }}
                        transition={{
                            opacity: { duration: 1, delay: 2.2 },
                            y: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
                        }}
                    />
                </svg>
            </MotionBox>

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
                                variant="h1"
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
                                    fontSize: { xs: "1.1rem", md: "1.5rem" },
                                    letterSpacing: { xs: "0em", md: "0.1em" },
                                }}
                                variants={itemVariants}
                            >
                                Votre allié au service de votre transaction nautique
                            </MotionTypography>

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
                                        scale: 1.2
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
                                        variant="outlined"
                                        size="large"
                                        whileHover={buttonHoverEffect}
                                        whileTap={{ scale: 0.98 }}
                                        startIcon={<DirectionsBoatIcon />}
                                        sx={{
                                            px: 4,
                                            py: 1.8,
                                            minWidth: { xs: "80%", sm: "200px" },
                                            alignSelf: { xs: "center", sm: "auto" },
                                            color: "white",
                                            borderColor: "rgba(255, 255, 255, 0.5)",
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            backdropFilter: "blur(10px)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                borderColor: "white",
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
                                            }
                                        }}
                                    >
                                        Trouvez Votre Bateau
                                    </MotionButton>
                                </Link>

                                <Link to="/services" style={{ textDecoration: "none" }}>
                                    <MotionButton
                                        variant="outlined"
                                        size="large"
                                        whileHover={buttonHoverEffect}
                                        whileTap={{ scale: 0.98 }}
                                        startIcon={<SellIcon />}
                                        sx={{
                                            px: 4,
                                            py: 1.8,
                                            minWidth: { xs: "80%", sm: "200px" },
                                            alignSelf: { xs: "center", sm: "auto" },
                                            color: "white",
                                            borderColor: "rgba(255, 255, 255, 0.5)",
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            backdropFilter: "blur(10px)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                borderColor: "white",
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
                                            }
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
