import { Container, Typography, Grid, Box, Paper, Button, Divider, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AnchorIcon from "@mui/icons-material/Anchor";
import WavesIcon from "@mui/icons-material/Waves";
import SailingIcon from "@mui/icons-material/Sailing";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat } from "../../models/Boat";
import { useEffect, useState } from "react";

const MotionTypography = motion.create(Typography);
const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);
const MotionDivider = motion.create(Divider);
const MotionButton = motion.create(Button);

interface OverviewSectionProps {
    boat: Boat;
    onInquiryClick: () => void;
}

const OverviewSection = ({ boat, onInquiryClick }: OverviewSectionProps) => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    
    // Ensure animations trigger properly when component is mounted
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Animation variants to ensure consistent animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8,
                ease: [0.1, 0.6, 0.3, 1]
            }
        }
    };

    return (
        <ScrollAnimatedSection id="overview">
            <Container maxWidth="xl">
                {/* Heading Section with Animation */}
                <MotionBox 
                    sx={{ 
                        mb: 8, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "60px",
                            height: "3px",
                            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`
                        }
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <SailingIcon sx={{ 
                            fontSize: 48, 
                            color: "primary.main", 
                            mr: 2,
                            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" 
                        }} />
                        <Typography variant="h3" component="h2" sx={{ 
                            fontWeight: 300,
                            letterSpacing: "0.05em",
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            MozBackgroundClip: "text",
                            MozTextFillColor: "transparent",
                            msBackgroundClip: "text",
                            msTextFillColor: "transparent",
                        }}>
                            VUE D'ENSEMBLE
                        </Typography>
                    </Box>
                    <MotionTypography
                        variant="subtitle1"
                        sx={{
                            fontStyle: "italic",
                            opacity: 0.8,
                            textAlign: "center",
                            maxWidth: "600px",
                            letterSpacing: "0.05em",
                        }}
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        En Partenariat avec BoatTrade Consulting
                    </MotionTypography>
                </MotionBox>

                <Grid container spacing={8}>
                    {/* Description Section with Animation */}
                    <Grid item xs={12} md={7}>
                        <MotionBox
                            variants={containerVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            sx={{ 
                                position: "relative",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    left: -20,
                                    top: 0,
                                    width: "4px",
                                    height: "100px",
                                    background: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, rgba(0,0,0,0) 100%)`,
                                    borderRadius: "4px"
                                }
                            }}
                        >
                            <MotionTypography
                                variants={itemVariants}
                                variant="h5"
                                sx={{
                                    fontWeight: 500,
                                    mb: 3,
                                    color: "text.primary",
                                    letterSpacing: "0.02em",
                                }}
                            >
                                {boat.title || "Artisanat Extraordinaire"}
                            </MotionTypography>
                            <MotionTypography
                                variants={itemVariants}
                                variant="body1"
                                sx={{
                                    lineHeight: 2.2,
                                    fontSize: "1.1rem",
                                    color: alpha(theme.palette.text.primary, 0.85),
                                    whiteSpace: "pre-line",
                                    mb: 5,
                                    fontWeight: 300,
                                    "& strong, & b": {
                                        color: theme.palette.primary.main,
                                        fontWeight: 500
                                    }
                                }}
                            >
                                {boat.description}
                            </MotionTypography>
                            
                            <MotionBox
                                variants={itemVariants}
                                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 5 }}
                            >
                                <AnchorIcon sx={{ color: alpha(theme.palette.primary.main, 0.8), fontSize: "1.2rem" }} />
                                <WavesIcon sx={{ color: alpha(theme.palette.secondary.main, 0.8), fontSize: "1.2rem" }} />
                                <MotionDivider 
                                    sx={{ flexGrow: 1 }} 
                                    initial={{ width: 0 }}
                                    animate={isVisible ? { width: "100%" } : {}}
                                    transition={{ delay: 0.8, duration: 1 }}
                                />
                            </MotionBox>
                        </MotionBox>
                    </Grid>

                    {/* Specifications Card with Animation */}
                    <Grid item xs={12} md={5}>
                        <MotionPaper
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            elevation={3}
                            sx={{
                                p: 4,
                                pt: 5,
                                pb: 5,
                                borderRadius: 4,
                                background: "#ffffff",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "hidden",
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                                boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: "150px",
                                    height: "150px",
                                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)}, transparent 70%)`,
                                    borderRadius: "50%",
                                    transform: "translate(50%, -50%)"
                                }
                            }}
                        >
                            <Typography 
                                variant="h5" 
                                component="h3" 
                                sx={{ 
                                    fontWeight: 600, 
                                    mb: 4,
                                    position: "relative",
                                    display: "inline-block",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -10,
                                        left: 0,
                                        width: "40px",
                                        height: "3px",
                                        background: theme.palette.primary.main
                                    }
                                }}
                            >
                                Specifications
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
                                {/* Feature items with staggered animation */}
                                {boat.year_built && (
                                    <MotionBox 
                                        sx={{ display: "flex", alignItems: "center" }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        <Box 
                                            sx={{ 
                                                display: "flex", 
                                                alignItems: "center", 
                                                justifyContent: "center",
                                                background: alpha(theme.palette.primary.light, 0.15),
                                                borderRadius: "50%",
                                                p: 1.25,
                                                mr: 2.5,
                                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`
                                            }}
                                        >
                                            <DateRangeIcon sx={{ color: theme.palette.primary.main, fontSize: "1.4rem" }} />
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                sx={{
                                                    color: alpha(theme.palette.text.secondary, 0.8),
                                                    fontWeight: 500,
                                                    letterSpacing: "0.03em",
                                                    textTransform: "uppercase",
                                                    fontSize: "0.75rem",
                                                    mb: 0.5
                                                }}
                                            >
                                                Année de Construction
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.year_built}
                                            </Typography>
                                        </Box>
                                    </MotionBox>
                                )}

                                {boat.engine_power && (
                                    <MotionBox 
                                        sx={{ display: "flex", alignItems: "center" }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        <Box 
                                            sx={{ 
                                                display: "flex", 
                                                alignItems: "center", 
                                                justifyContent: "center",
                                                background: alpha(theme.palette.secondary.light, 0.15),
                                                borderRadius: "50%",
                                                p: 1.25,
                                                mr: 2.5,
                                                boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.15)}`
                                            }}
                                        >
                                            <SpeedIcon sx={{ color: theme.palette.secondary.main, fontSize: "1.4rem" }} />
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                sx={{
                                                    color: alpha(theme.palette.text.secondary, 0.8),
                                                    fontWeight: 500,
                                                    letterSpacing: "0.03em",
                                                    textTransform: "uppercase",
                                                    fontSize: "0.75rem",
                                                    mb: 0.5
                                                }}
                                            >
                                                Moteur
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.engine_power}
                                            </Typography>
                                        </Box>
                                    </MotionBox>
                                )}

                                {boat.fuel_type && (
                                    <MotionBox 
                                        sx={{ display: "flex", alignItems: "center" }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.6, duration: 0.6 }}
                                    >
                                        <Box 
                                            sx={{ 
                                                display: "flex", 
                                                alignItems: "center", 
                                                justifyContent: "center",
                                                background: alpha(theme.palette.error.light, 0.15),
                                                borderRadius: "50%",
                                                p: 1.25,
                                                mr: 2.5,
                                                boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.15)}`
                                            }}
                                        >
                                            <LocalGasStationIcon sx={{ color: theme.palette.error.main, fontSize: "1.4rem" }} />
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                sx={{
                                                    color: alpha(theme.palette.text.secondary, 0.8),
                                                    fontWeight: 500,
                                                    letterSpacing: "0.03em",
                                                    textTransform: "uppercase",
                                                    fontSize: "0.75rem",
                                                    mb: 0.5
                                                }}
                                            >
                                                Type de Carburant
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.fuel_type}
                                            </Typography>
                                        </Box>
                                    </MotionBox>
                                )}

                                {boat.location && (
                                    <MotionBox 
                                        sx={{ display: "flex", alignItems: "center" }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                    >
                                        <Box 
                                            sx={{ 
                                                display: "flex", 
                                                alignItems: "center", 
                                                justifyContent: "center",
                                                background: alpha(theme.palette.success.light, 0.15),
                                                borderRadius: "50%",
                                                p: 1.25,
                                                mr: 2.5,
                                                boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.15)}`
                                            }}
                                        >
                                            <LocationOnIcon sx={{ color: theme.palette.success.main, fontSize: "1.4rem" }} />
                                        </Box>
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                sx={{
                                                    color: alpha(theme.palette.text.secondary, 0.8),
                                                    fontWeight: 500,
                                                    letterSpacing: "0.03em",
                                                    textTransform: "uppercase",
                                                    fontSize: "0.75rem",
                                                    mb: 0.5
                                                }}
                                            >
                                                Emplacement
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.location}
                                            </Typography>
                                        </Box>
                                    </MotionBox>
                                )}

                                {/* Call to action button with hover animation */}
                                <MotionButton
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.9, duration: 0.6 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={onInquiryClick}
                                    sx={{ 
                                        py: 1.8, 
                                        mt: 5,
                                    }}
                                >
                                    Demander des Informations
                                </MotionButton>
                            </Box>
                        </MotionPaper>
                    </Grid>
                </Grid>
            </Container>
        </ScrollAnimatedSection>
    );
};

export default OverviewSection;
