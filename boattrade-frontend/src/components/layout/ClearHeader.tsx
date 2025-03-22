import React, { useState, useEffect } from "react";
import { Button, Box, IconButton, useTheme, Typography, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import SailingIcon from '@mui/icons-material/Sailing';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { contactInfo, socialMedia, companyInfo } from "../../config/siteConfig";
import logoImage from "@assets/logo.webp";

// Motion-enhanced components
const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);

const Header = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Add scroll listener to detect when user has scrolled past 1 viewport height
    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            setScrolled(window.scrollY > viewportHeight);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animation variants for the menu overlay with circular/diagonal opening
    const overlayVariants = {
        closed: {
            clipPath: "circle(0% at 95% 5%)",
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "afterChildren",
                duration: 0.5,
            },
        },
        open: {
            clipPath: "circle(150% at 95% 5%)",
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 20,
                staggerChildren: 0.07,
                delayChildren: 0.3,
                duration: 0.7,
            },
        },
    };

    // Simplified animation variants for menu items - only fade, no movement
    const menuItemVariants = {
        closed: {
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
        open: {
            opacity: 1,
            transition: {
                duration: 0.4,
            },
        },
    };

    return (
        <>
            {/* Floating Menu Button */}
            <MotionIconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                    position: "fixed",
                    top: 16,
                    right: 16,
                    zIndex: 1300,
                    color: theme.palette.primary.main,
                    bgcolor: open ? "transparent" : scrolled ? theme.palette.background.paper : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(5px)",
                    boxShadow: open ? "none" : "0 2px 10px rgba(0,0,0,0.1)",
                    "&:hover": {
                        bgcolor: open ? "transparent" : scrolled ? theme.palette.background.paper : "rgba(255,255,255,0.9)",
                    },
                    transition: "background-color 0.3s ease",
                    fontSize: "1.2rem", // Increased icon size
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.5rem', // Larger icons
                    }
                }}
            >
                {open ? <CloseIcon /> : <MenuIcon />}
            </MotionIconButton>

            {/* Home Button */}
            <MotionIconButton
                component={RouterLink}
                to="/"
                aria-label="home"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                    position: "fixed",
                    top: 70, // Positioned below the menu button
                    right: 16,
                    zIndex: 1300,
                    color: theme.palette.primary.main,
                    bgcolor: scrolled ? theme.palette.background.paper : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(5px)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    "&:hover": {
                        bgcolor: scrolled ? theme.palette.background.paper : "rgba(255,255,255,0.9)",
                    },
                    transition: "background-color 0.3s ease",
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.5rem', // Larger icons
                    }
                }}
            >
                <Box sx={{ 
                    width: "28px", // Increased from 24px
                    height: "28px", // Increased from 24px
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                }}>
                    <img 
                        src={logoImage} 
                        alt={`${companyInfo.name} logo`} 
                        style={{ 
                            width: "100%", 
                            height: "auto", 
                            objectFit: "contain" 
                        }} 
                    />
                </Box>
            </MotionIconButton>

            {/* Menu Overlay */}
            <AnimatePresence>
                {open && (
                    <MotionBox
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        sx={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            zIndex: 1200,
                            background: "linear-gradient(135deg, #7f8c9f 0%,rgb(163, 172, 184) 90%)",
                            display: "flex",
                            flexDirection: "column",
                            p: 4,
                            pt: 6,
                            overflow: "hidden",
                            transformOrigin: "top right",
                        }}
                    >
                        {/* Wave decoration */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0.1,
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 25C20 25 20 75 40 75C60 75 60 25 80 25C100 25 100 75 120 75' stroke='%23FFFFFF' fill='none' stroke-width='3'/%3E%3C/svg%3E")`,
                                backgroundSize: "100px 100px",
                                zIndex: 0,
                            }}
                        />

                        {/* Logo */}
                        <MotionBox
                            variants={menuItemVariants}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 4,
                                justifyContent: "center",
                            }}
                        >
                            <Box sx={{ 
                                width: { xs: "50px", sm: "70px" }, // Increased from 40px/60px
                                height: "auto", 
                                mr: 2,
                                display: "flex"
                            }}>
                                <img 
                                    src={logoImage} 
                                    alt={`${companyInfo.name} logo`} 
                                    style={{ 
                                        width: "100%", 
                                        height: "auto", 
                                        objectFit: "contain" 
                                    }} 
                                />
                            </Box>
                            <RouterLink 
                                to="/" 
                                onClick={toggleDrawer}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography
                                    variant="h3" // Increased from h4
                                    sx={{
                                        fontWeight: 700,
                                        background: "linear-gradient(90deg, #283746, #415569)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        cursor: "pointer",
                                    }}
                                >
                                    {companyInfo.name}
                                </Typography>
                            </RouterLink>
                        </MotionBox>

                        {/* Main Content Container */}
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                zIndex: 1,
                                width: "100%",
                                maxWidth: "1000px",
                                mx: "auto",
                            }}
                        >
                            {/* Description text */}
                            <MotionBox
                                variants={menuItemVariants}
                                sx={{
                                    mb: 6,
                                    textAlign: "center",
                                    maxWidth: "600px",
                                    px: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: "#1a2533",
                                        lineHeight: 1.6,
                                        fontWeight: 500,
                                        fontSize: "1.2rem", 
                                    }}
                                >
                                    {companyInfo.description}
                                </Typography>
                            </MotionBox>

                            {/* Home Button */}
                            <MotionBox variants={menuItemVariants} sx={{ mb: 3 }}>
                                <Button
                                    variant="contained"
                                    component={RouterLink}
                                    to="/"
                                    onClick={toggleDrawer}
                                    startIcon={<DirectionsBoatIcon />}
                                    sx={{
                                        background: "linear-gradient(90deg, #283746, #415569)",
                                        color: "white",
                                        fontWeight: 600,
                                        py: 1.5, // Increased from 1.2
                                        px: 4.5, // Increased from 4
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                                        fontSize: "1.15rem", // Increased from 1rem
                                        minWidth: "260px", // Increased from 240px
                                        "&:hover": {
                                            background: "linear-gradient(90deg, #33465a, #4c6379)",
                                            transform: "translateY(-2px)",
                                            transition: "all 0.3s ease",
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1.3rem', // Larger icons
                                        }
                                    }}
                                >
                                    Accueil
                                </Button>
                            </MotionBox>

                            {/* Partner Boats Button */}
                            <MotionBox variants={menuItemVariants} sx={{ mb: 3 }}>
                                <Button
                                    variant="contained"
                                    component={RouterLink}
                                    to="/boats"
                                    onClick={toggleDrawer}
                                    startIcon={<SailingIcon />}
                                    sx={{
                                        background: "linear-gradient(90deg, #415569, #596c7d)",
                                        color: "white",
                                        fontWeight: 600,
                                        py: 1.5, // Increased from 1.2
                                        px: 4.5, // Increased from 4
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                                        fontSize: "1.15rem", // Increased from 1rem
                                        minWidth: "260px", // Increased from 240px
                                        "&:hover": {
                                            background: "linear-gradient(90deg, #4c6379, #677a8d)",
                                            transform: "translateY(-2px)",
                                            transition: "all 0.3s ease",
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1.3rem', // Larger icons
                                        }
                                    }}
                                >
                                    Les bateaux de nos partenaires
                                </Button>
                            </MotionBox>

                            {/* Our Services Button */}
                            <MotionBox variants={menuItemVariants} sx={{ mb: 4 }}>
                                <Button
                                    variant="outlined"
                                    component={RouterLink}
                                    to="/sell-my-boat"
                                    onClick={toggleDrawer}
                                    endIcon={<HandshakeIcon />}
                                    sx={{
                                        color: "#283746",
                                        fontWeight: 600,
                                        py: 1.5, // Increased from 1.2
                                        px: 4.5, // Increased from 4
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        borderColor: "#283746",
                                        borderWidth: "2px",
                                        minWidth: "260px", // Increased from 240px
                                        fontSize: "1.15rem", // Increased from 1rem
                                        backdropFilter: "blur(4px)",
                                        background: "rgba(255, 255, 255, 0.15)",
                                        "&:hover": {
                                            borderColor: "#415569",
                                            background: "rgba(255, 255, 255, 0.25)",
                                            transform: "translateY(-2px)",
                                            transition: "all 0.3s ease",
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1.3rem', // Larger icons
                                        }
                                    }}
                                >
                                    Nos services
                                </Button>
                            </MotionBox>

                        </Box>

                        {/* Footer with Contact and Social Media */}
                        <MotionBox
                            variants={menuItemVariants}
                            sx={{
                                mt: "auto",
                                py: 3,
                                borderTop: "1px solid rgba(40, 55, 70, 0.3)",
                                width: "100%",
                            }}
                        >
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                {contactInfo.slice(0, 2).map((contact, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: {
                                                    xs: "center",
                                                    sm: "flex-start",
                                                    md: index === 1 ? "center" : "flex-start",
                                                },
                                                mb: { xs: 2, sm: 0 },
                                            }}
                                        >
                                            {React.cloneElement(contact.icon, { sx: { color: "#283746", mr: 1, fontSize: '1.3rem' } })}
                                            <Typography variant="body2" sx={{ color: "#283746", fontWeight: 500, fontSize: '1rem' }}>
                                                {contact.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                                <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
                                    {socialMedia.map((social, index) => (
                                        <IconButton
                                            key={index}
                                            component="a"
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ 
                                                color: "#283746",
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: '1.5rem', // Larger social media icons
                                                }
                                            }}
                                        >
                                            {social.icon}
                                        </IconButton>
                                    ))}
                                </Grid>
                            </Grid>
                        </MotionBox>
                    </MotionBox>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
