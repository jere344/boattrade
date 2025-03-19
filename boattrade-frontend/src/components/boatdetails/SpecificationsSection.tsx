import { Container, Typography, Grid, Box, Paper, alpha } from "@mui/material";
import { motion } from "framer-motion";
import DiamondIcon from "@mui/icons-material/Diamond";
import StraightenIcon from "@mui/icons-material/Straighten";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat } from "../../models/Boat";

const MotionPaper = motion.create(Paper);

interface SpecificationsSectionProps {
    boat: Boat;
}

const SpecificationsSection = ({ boat }: SpecificationsSectionProps) => {
    // Define specifications with more modest language
    const specifications = [
        {
            label: "Longueur",
            value: boat.length ? `${boat.length} m` : "Non spécifié",
            icon: <StraightenIcon sx={{ fontSize: 48 }} />,
            description: "Dimensions totales du navire"
        },
        {
            label: "Largeur",
            value: boat.width ? `${boat.width} m` : "Non spécifié",
            icon: <StraightenIcon sx={{ fontSize: 48 }} />,
            description: "Espace intérieur confortable"
        },
        { 
            label: "Année", 
            value: boat.year_built || "Non spécifié", 
            icon: <DateRangeIcon sx={{ fontSize: 48 }} />,
            description: "Année de construction"
        },
        { 
            label: "Puissance", 
            value: boat.engine_power || "Non spécifié", 
            icon: <SpeedIcon sx={{ fontSize: 48 }} />,
            description: "Performance du moteur"
        },
        { 
            label: "Carburant", 
            value: boat.fuel_type || "Non spécifié", 
            icon: <LocalGasStationIcon sx={{ fontSize: 48 }} />,
            description: "Type de propulsion"
        },
        {
            label: "Catégorie",
            value: boat.category_detail?.name || "Non spécifié",
            icon: <DirectionsBoatIcon sx={{ fontSize: 48 }} />,
            description: "Classification du bateau"
        },
    ];

    return (
        <ScrollAnimatedSection id="specs">
            <Box sx={{ 
                background: "linear-gradient(135deg, #f8f9fa 0%, #edf2f7 100%)",
                py: 12,
                borderRadius: 4,
                boxShadow: "0 20px 80px rgba(0,0,0,0.08)",
                mb: 8
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ 
                        mb: 10, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center" 
                    }}>
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            mb: 3 
                        }}>
                            <DiamondIcon sx={{ 
                                fontSize: 54, 
                                color: "primary.main", 
                                mr: 2,
                                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.18))"
                            }} />
                            <Typography 
                                variant="h2" 
                                component="h2"
                                sx={{ 
                                    fontWeight: 300,
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase",
                                    background: "linear-gradient(90deg, #0d47a1 0%, #1976d2 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Spécifications
                            </Typography>
                        </Box>
                        <Typography 
                            variant="h6" 
                            color="text.secondary" 
                            sx={{ 
                                maxWidth: 700, 
                                textAlign: "center",
                                fontWeight: 300,
                                fontStyle: "italic",
                                mb: 4
                            }}
                        >
                            Caractéristiques techniques du bateau
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {specifications.map((spec, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <MotionPaper
                                    whileHover={{
                                        y: -15,
                                        boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
                                        background: "rgb(255, 255, 255)",
                                    }}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        delay: 0.15 * index,
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}
                                    sx={{
                                        p: 5,
                                        borderRadius: 4,
                                        height: "100%",
                                        width: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        background: "white",
                                        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                        border: "1px solid rgba(0,0,0,0.03)",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            background: `linear-gradient(135deg, ${alpha('#1976d2', 0.05)} 0%, transparent 100%)`,
                                            zIndex: 0
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mb: 3,
                                            p: 2.5,
                                            borderRadius: "50%",
                                            bgcolor: alpha('#1976d2', 0.08),
                                            color: "primary.main",
                                            boxShadow: "0 10px 30px rgba(25, 118, 210, 0.2)",
                                            zIndex: 1,
                                        }}
                                    >
                                        {spec.icon}
                                    </Box>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            mb: 1.5, 
                                            fontWeight: 600,
                                            letterSpacing: "0.03em",
                                            color: "#0d47a1",
                                            zIndex: 1,
                                        }}
                                    >
                                        {spec.label}
                                    </Typography>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            fontWeight: 700,
                                            mb: 2,
                                            zIndex: 1,
                                        }}
                                    >
                                        {spec.value}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{ 
                                            fontStyle: "italic",
                                            zIndex: 1,
                                        }}
                                    >
                                        {spec.description}
                                    </Typography>
                                </MotionPaper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </ScrollAnimatedSection>
    );
};

export default SpecificationsSection;
