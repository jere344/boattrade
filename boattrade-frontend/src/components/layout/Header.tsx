import React, { useState, useEffect } from "react";
import { Button, Box, IconButton, useTheme, Typography, Grid } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Handle navigation and scroll to top
    const handleHomeClick = (event) => {
        event.preventDefault();
        navigate("/");
        window.scrollTo(0, 0);
        if (open) {
            toggleDrawer();
        }
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
                    bgcolor: open ? "transparent" : scrolled ? theme.palette.background.paper : theme.palette.text.primary,
                    backdropFilter: "blur(5px)",
                    boxShadow: open ? "none" : "0 2px 10px rgba(0,0,0,0.1)",
                    "&:hover": {
                        bgcolor: open ? "transparent" : scrolled ? theme.palette.background.paper : theme.palette.text.primary,
                    },
                    transition: "background-color 0.3s ease",
                }}
            >
                {open ? <CloseIcon /> : <MenuIcon />}
            </MotionIconButton>

            {/* Home Button */}
            <MotionIconButton
                aria-label="home"
                onClick={handleHomeClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                    position: "fixed",
                    top: 70, // Positioned below the menu button
                    right: 16,
                    zIndex: 1300,
                    color: theme.palette.primary.main,
                    bgcolor: scrolled ? theme.palette.background.paper : theme.palette.text.primary,
                    backdropFilter: "blur(5px)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    "&:hover": {
                        bgcolor: scrolled ? theme.palette.background.paper : theme.palette.text.primary,
                    },
                    transition: "background-color 0.3s ease",
                }}
            >
                <Box sx={{ 
                    width: "24px", 
                    height: "24px", 
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
                            background: "linear-gradient(135deg, #1E3A5F 0%, #0E1C2F 100%)",
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
                                opacity: 0.06,
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l100 100M25 0l75 100M50 0l50 100M75 0l25 100M0 25l75 100M0 50l50 100M0 75l25 100' stroke='%23B0E0E6' fill='none' stroke-width='1' stroke-opacity='0.5'/%3E%3C/svg%3E")`,
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
                                width: { xs: "40px", sm: "60px" }, 
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
                            <Box 
                                onClick={handleHomeClick}
                                style={{ textDecoration: 'none', cursor: 'pointer' }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        background: "linear-gradient(90deg, #B0E0E6, #4682B4)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        cursor: "pointer",
                                    }}
                                >
                                    {companyInfo.name}
                                </Typography>
                            </Box>
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
                                        color: "rgba(255,255,255,0.7)",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {companyInfo.description}
                                </Typography>
                            </MotionBox>

                            {/* Home Button */}
                            <MotionBox variants={menuItemVariants} sx={{ mb: 3 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleHomeClick}
                                    startIcon={<DirectionsBoatIcon />}
                                    sx={{
                                        background: "linear-gradient(90deg, #1E3A5F, #4682B4)",
                                        color: "white",
                                        fontWeight: 600,
                                        py: 1.2,
                                        px: 4,
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                                        fontSize: "1rem",
                                        minWidth: "240px",
                                        "&:hover": {
                                            background: "linear-gradient(90deg, #2F4B70, #5793C5)",
                                            transform: "translateY(-2px)",
                                            transition: "all 0.3s ease",
                                        },
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
                                        background: "linear-gradient(90deg, #4682B4, #87CEEB)",
                                        color: "white",
                                        fontWeight: 600,
                                        py: 1.2,
                                        px: 4,
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                                        fontSize: "1rem",
                                        minWidth: "240px",
                                        "&:hover": {
                                            background: "linear-gradient(90deg, #5793C5, #98DFFC)",
                                            transform: "translateY(-2px)",
                                            transition: "all 0.3s ease",
                                        },
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
                                    to="/services"
                                    onClick={toggleDrawer}
                                    endIcon={<HandshakeIcon />}
                                    sx={{
                                        color: "#B0E0E6",
                                        fontWeight: 600,
                                        py: 1.2,
                                        px: 4,
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        borderColor: "#B0E0E6",
                                        borderWidth: "2px",
                                        minWidth: "240px",
                                        fontSize: "1rem",
                                        backdropFilter: "blur(4px)",
                                        background: "rgba(255, 255, 255, 0.07)",
                                        "&:hover": {
                                            borderColor: "#87CEEB",
                                            background: "rgba(255, 255, 255, 0.15)",
                                            transform: "translateY(-2px)",
                                            transition: "all 0.3s ease",
                                        },
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
                                borderTop: "1px solid rgba(255,255,255,0.1)",
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
                                            {React.cloneElement(contact.icon, { sx: { color: "#B0E0E6", mr: 1 } })}
                                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
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
                                            sx={{ color: "#B0E0E6" }}
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
