import React from "react";
import { Box, Container, Typography, Grid, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import { socialMedia, navigationLinks, contactInfo, companyInfo } from "../../config/siteConfig";

// Motion-enhanced components
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionGrid = motion.create(Grid);

// Create a properly connected motion router link
const MotionRouterLink = motion(RouterLink);

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Start animations when footer comes into view
    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const socialIconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
            },
        },
        hover: {
            scale: 1.2,
            transition: {
                duration: 0.2,
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    // Boat animation for logo
    const floatAnimation = {
        y: [0, -10, 0],
        rotate: [0, -2, 0, 2, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "loop" as const,
            ease: "easeInOut",
        },
    };

    // Link hover animation
    const linkHoverAnimation = {
        initial: { width: 0 },
        hover: { 
            width: "100%", 
            transition: { duration: 0.3, ease: "easeInOut" } 
        }
    };

    return (
        <>
            {/* White card with rounded corner placed outside the animated container */}
            <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: "150px",
                        width: "100%",
                        margin: "0 auto",
                        background: "white",
                        borderRadius: "0 0 100px 100px",
                        zIndex: 4,
                        marginTop: "-1px",
                    }}
                />
            <MotionBox
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                sx={{
                    position: "relative",
                    bgcolor: "transparent",
                    color: "white",
                    mt: "auto",
                    overflow: "hidden",
                }}
            >
                {/* Main footer content with pattern background */}
                <MotionBox
                    sx={{
                        background: "linear-gradient(135deg, #1E3A5F 0%, #0E1C2F 100%)",
                        pt: 6,
                        pb: 6,
                        boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.2)",
                        position: "relative",
                        zIndex: 3,
                        overflow: "hidden", // Add overflow hidden to contain the patterns
                    }}
                >
                    {/* Compass rose pattern element */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: "15%",
                            right: "5%",
                            width: "300px",
                            height: "300px",
                            opacity: 0.04,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23B0E0E6' stroke-width='2' fill='none' /%3E%3Cpath d='M50,10 L50,90 M10,50 L90,50' stroke='%23B0E0E6' stroke-width='1' /%3E%3Cpath d='M50,10 L55,50 L50,90 L45,50 Z' fill='%23B0E0E6' /%3E%3Cpath d='M10,50 L50,45 L90,50 L50,55 Z' fill='%23B0E0E6' /%3E%3Ccircle cx='50' cy='50' r='5' fill='%23B0E0E6' /%3E%3Cpath d='M26,26 L74,74 M26,74 L74,26' stroke='%23B0E0E6' stroke-width='0.5' stroke-dasharray='2,1' /%3E%3C/svg%3E")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        transform: "rotate(15deg)",
                        zIndex: -1,
                    }}
                />
                    {/* Waves pattern element */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0.05,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 25C20 25 20 75 40 75C60 75 60 25 80 25C100 25 100 75 120 75' stroke='%23B0E0E6' fill='none' stroke-width='3'/%3E%3C/svg%3E")`,
                        backgroundSize: "100px 100px",
                        zIndex: 0,
                    }}
                />

                    <Container maxWidth="lg" sx={{ marginTop: "180px", position: "relative", zIndex: 5 }}>
                    <Grid container spacing={4}>
                        {/* Logo and about section */}
                        <MotionGrid item xs={12} sm={6} md={4} variants={itemVariants}>
                            <MotionBox
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <MotionBox
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#4682B4",
                                        mr: 1,
                                    }}
                                    animate={floatAnimation}
                                >
                                    <DirectionsBoatIcon sx={{ fontSize: "2rem" }} />
                                </MotionBox>
                                <MotionTypography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        backgroundImage: "linear-gradient(90deg, #B0E0E6, #4682B4)",
                                        backgroundClip: "text",
                                        textFillColor: "transparent",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {companyInfo.name}
                                </MotionTypography>
                            </MotionBox>

                            <MotionTypography variant="body2" sx={{ mb: 2, maxWidth: "90%" }}>
                                {companyInfo.description}
                            </MotionTypography>

                            {/* Social media icons */}
                            <MotionBox
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    mt: 3,
                                }}
                            >
                                {socialMedia.map((social, index) => (
                                    <MotionBox key={index} variants={socialIconVariants} whileHover="hover" whileTap="tap" custom={index}>
                                        <IconButton
                                            sx={{
                                                bgcolor: "rgba(255, 255, 255, 0.1)",
                                                backdropFilter: "blur(8px)",
                                                color: "white",
                                                transition: "0.3s",
                                                "&:hover": {
                                                    bgcolor: "rgba(255, 255, 255, 0.15)",
                                                    color: social.color,
                                                    boxShadow: `0 0 15px ${social.color}80`,
                                                },
                                            }}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {social.icon}
                                        </IconButton>
                                    </MotionBox>
                                ))}
                            </MotionBox>
                        </MotionGrid>

                        {/* Quick Links */}
                        <MotionGrid item xs={12} sm={6} md={4} variants={itemVariants}>
                            <MotionTypography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    position: "relative",
                                    display: "inline-block",
                                    fontWeight: 600,
                                    "&:after": {
                                        content: '""',
                                        position: "absolute",
                                        width: "40px",
                                        height: "3px",
                                        left: 0,
                                        bottom: -5,
                                        background: "linear-gradient(90deg, #4682B4, transparent)",
                                        borderRadius: "2px",
                                    },
                                }}
                            >
                                Navigation
                            </MotionTypography>

                            <MotionBox
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr",
                                    gap: 1,
                                    mt: 3,
                                    position: "relative",
                                    zIndex: 10, // Ensure links are above decorative elements
                                }}
                            >
                                {navigationLinks.map((link, index) => (
                                    <MotionRouterLink
                                        key={index}
                                        to={link.path}
                                        style={{ 
                                            textDecoration: "none",
                                            color: "white" 
                                        }}
                                        sx={{
                                            color: "white !important", // Override any inherited colors
                                            textDecoration: "none !important", // Force no underline
                                            display: "block",
                                            mb: 1.5,
                                            transition: "all 0.3s ease",
                                            position: "relative",
                                            cursor: "pointer",
                                            paddingLeft: "8px",
                                            fontWeight: 400,
                                            fontSize: "0.9rem",
                                            letterSpacing: "0.02em",
                                            "&:hover": {
                                                color: theme.palette.secondary.light + " !important",
                                                transform: "translateX(5px)",
                                            },
                                            "&:visited": {
                                                color: "white !important", // Override visited link color
                                            },
                                            // Create a custom underline effect
                                            "&::after": {
                                                content: '""',
                                                position: "absolute",
                                                bottom: "-2px",
                                                left: 0,
                                                width: 0,
                                                height: "2px",
                                                backgroundColor: theme.palette.secondary.light,
                                                transition: "width 0.3s ease",
                                                borderRadius: "1px",
                                                opacity: 0.8,
                                            },
                                            "&:hover::after": {
                                                width: "100%"
                                            }
                                        }}
                                        whileHover={{
                                            x: 5,
                                            transition: { type: "spring", stiffness: 300 },
                                        }}
                                    >
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontWeight: 400,
                                                color: "inherit", 
                                                transition: "inherit" 
                                            }}>
                                            {link.name}
                                        </Typography>
                                    </MotionRouterLink>
                                ))}
                            </MotionBox>
                        </MotionGrid>

                        {/* Contact Section */}
                        <MotionGrid item xs={12} md={4} variants={itemVariants}>
                            <MotionTypography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    position: "relative",
                                    display: "inline-block",
                                    fontWeight: 600,
                                    "&:after": {
                                        content: '""',
                                        position: "absolute",
                                        width: "40px",
                                        height: "3px",
                                        left: 0,
                                        bottom: -5,
                                        background: "linear-gradient(90deg, #4682B4, transparent)",
                                        borderRadius: "2px",
                                    },
                                }}
                            >
                                Contactez-nous
                            </MotionTypography>

                            <MotionBox sx={{ mt: 3 }}>
                                {contactInfo.map((contact, index) => (
                                    <MotionBox
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                            gap: 1.5,
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <MotionBox
                                            sx={{
                                                bgcolor: "rgba(70, 130, 180, 0.2)",
                                                borderRadius: "8px",
                                                width: 36,
                                                height: 36,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#B0E0E6",
                                            }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            {contact.icon}
                                        </MotionBox>
                                        <Typography variant="body2">{contact.text}</Typography>
                                    </MotionBox>
                                ))}
                            </MotionBox>
                        </MotionGrid>
                    </Grid>

                    {/* Back to top button */}
                    <MotionBox
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                            position: "relative",
                            zIndex: 5,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <MotionBox
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={scrollToTop}
                            sx={{
                                cursor: "pointer",
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(70, 130, 180, 0.2)",
                                border: "1px solid rgba(176, 224, 230, 0.3)",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                                color: "#B0E0E6",
                                transition: "0.3s",
                                "&:hover": {
                                    backgroundColor: "rgba(70, 130, 180, 0.3)",
                                    boxShadow: "0 6px 25px rgba(70, 130, 180, 0.4)",
                                },
                                background: "radial-gradient(circle at center, rgba(70, 130, 180, 0.3) 0%, rgba(70, 130, 180, 0.1) 70%)",
                            }}
                        >
                            <KeyboardArrowUpIcon />
                        </MotionBox>
                    </MotionBox>

                    {/* Copyright and extra links */}
                    <MotionGrid
                        container
                        sx={{
                            mt: 4,
                            pt: 4,
                            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                            position: "relative",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "1px",
                                background: "linear-gradient(90deg, transparent, rgba(70, 130, 180, 0.3), transparent)",
                            },
                        }}
                        variants={itemVariants}
                    >
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2">
                                © {new Date().getFullYear()} {companyInfo.name}. Tous droits réservés.
                            </Typography>
                        </Grid>
                    </MotionGrid>
                </Container>
            </MotionBox>

            {/* Floating bubbles */}
            <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, top: 0, pointerEvents: "none", overflow: "hidden", zIndex: 4 }}>
                {[...Array(10)].map((_, i) => {
                    const size = Math.random() * 30 + 10;
                    const left = Math.random() * 100;
                    const animationDuration = Math.random() * 10 + 15;
                    const delay = Math.random() * 5;

                    return (
                        <MotionBox
                            key={i}
                            sx={{
                                position: "absolute",
                                bottom: -100,
                                left: `${left}%`,
                                width: size,
                                height: size,
                                borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(176, 224, 230, 0.2) 0%, rgba(70, 130, 180, 0.05) 70%)",
                                boxShadow: "0 0 10px rgba(176, 224, 230, 0.1)",
                            }}
                            animate={{
                                y: [0, -300 - Math.random() * 300],
                                x: [0, (Math.random() - 0.5) * 100],
                                opacity: [0, 0.7, 0],
                                scale: [0.3, 1, 0.8],
                            }}
                            transition={{
                                duration: animationDuration,
                                repeat: Infinity,
                                delay: delay,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </Box>
        </MotionBox>
        </>
    );
};

export default Footer;
