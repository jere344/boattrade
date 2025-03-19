import { Container, Typography, Grid, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import BuildIcon from "@mui/icons-material/Build";
import StraightenIcon from "@mui/icons-material/Straighten";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat } from "../../models/Boat";

const MotionPaper = motion(Paper);

interface SpecificationsSectionProps {
    boat: Boat;
}

const SpecificationsSection = ({ boat }: SpecificationsSectionProps) => {
    // Define specifications
    const specifications = [
        {
            label: "Length",
            value: boat.length ? `${boat.length} ft` : "N/A",
            icon: <StraightenIcon sx={{ fontSize: 40 }} />,
        },
        {
            label: "Width",
            value: boat.width ? `${boat.width} ft` : "N/A",
            icon: <StraightenIcon sx={{ fontSize: 40 }} />,
        },
        { 
            label: "Year Built", 
            value: boat.year_built || "N/A", 
            icon: <DateRangeIcon sx={{ fontSize: 40 }} /> 
        },
        { 
            label: "Engine Power", 
            value: boat.engine_power || "N/A", 
            icon: <SpeedIcon sx={{ fontSize: 40 }} /> 
        },
        { 
            label: "Fuel Type", 
            value: boat.fuel_type || "N/A", 
            icon: <LocalGasStationIcon sx={{ fontSize: 40 }} /> 
        },
        {
            label: "Category",
            value: boat.category_detail?.name || "N/A",
            icon: <DirectionsBoatIcon sx={{ fontSize: 40 }} />,
        },
    ];

    return (
        <ScrollAnimatedSection id="specs">
            <Container maxWidth="xl">
                <Box sx={{ mb: 8, display: "flex", alignItems: "center" }}>
                    <BuildIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                    <Typography variant="h3" component="h2">
                        Detailed Specifications
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {specifications.map((spec, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <MotionPaper
                                whileHover={{
                                    y: -10,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                    background: "linear-gradient(135deg, #ffffff 0%, #f0f4f9 100%)",
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    height: "100%",
                                    width: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    background: "white",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2,
                                        p: 2,
                                        borderRadius: "50%",
                                        bgcolor: "rgba(172, 190, 206, 0.2)",
                                        color: "primary.main",
                                    }}
                                >
                                    {spec.icon}
                                </Box>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                    {spec.label}
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {spec.value}
                                </Typography>
                            </MotionPaper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ScrollAnimatedSection>
    );
};

export default SpecificationsSection;
