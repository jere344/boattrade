import { Box, Container, Button, Typography, Divider, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Boat } from "../../models/Boat";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import StraightenIcon from "@mui/icons-material/Straighten";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

interface QuickInfoSectionProps {
    boat: Boat;
    onInquiryClick: () => void;
}

const QuickInfoSection = ({ boat, onInquiryClick }: QuickInfoSectionProps) => {
    // Smooth scroll function
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(to bottom, rgba(18, 26, 43, 1) 0%, rgba(247, 249, 252, 1) 100%)",
                py: 6,
                position: "relative",
            }}
        >
            <Container maxWidth="lg">
                {/* Section container with glass effect */}
                <Paper
                    component={motion.div}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    elevation={3}
                    sx={{
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.95)", // Increased opacity for better contrast
                        borderRadius: 4,
                        overflow: "hidden",
                        transform: "translateY(-60px)",
                    }}
                >
                    {/* Navigation buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 2,
                            p: 3,
                            borderBottom: "1px solid rgba(0,0,0,0.1)",
                        }}
                    >
                        {[
                            { id: "gallery", label: "Gallerie" },
                            { id: "overview", label: "Aperçu" },
                            { id: "specs", label: "Spécifications" },
                            { id: "contact", label: "Contact" },
                            { id: "amenities-technical", label: "Commodités et technique" },
                        ].map((section) => (
                            <Button
                                key={section.id}
                                variant="text"
                                color="primary"
                                onClick={() => scrollToSection(section.id)}
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    px: 3,
                                    textTransform: "capitalize",
                                    color: "#1a2438", // Ensure good contrast
                                    "&:hover": {
                                        backgroundColor: "rgba(95, 111, 138, 0.1)",
                                    },
                                }}
                            >
                                {section.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Quick info grid */}
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            {/* Main info with CTA */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            color: "#1a2438", // Explicitly set color for better contrast
                                        }}
                                    >
                                        {boat.title}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: "#445066", // Darker secondary text color
                                            fontWeight: 500, // Slightly bolder for better readability
                                        }}
                                    >
                                        {boat.description && boat.description.substring(0, 120)}
                                        {boat.description && boat.description.length > 120 ? "..." : ""}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={onInquiryClick}
                                        sx={{ alignSelf: "flex-start" }}
                                    >
                                        Contactez-nous
                                    </Button>
                                </Box>
                            </Grid>

                            {/* Key specs */}
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <DirectionsBoatIcon sx={{ mr: 1, color: "primary.main" }} />
                                            <Box>
                                                <Typography variant="body2" sx={{ color: "#445066", fontWeight: 500 }}>
                                                    Type
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a2438" }}>
                                                    {boat.category_detail?.name || "N/A"}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <StraightenIcon sx={{ mr: 1, color: "primary.main" }} />
                                            <Box>
                                                <Typography variant="body2" sx={{ color: "#445066", fontWeight: 500 }}>
                                                    Length
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a2438" }}>
                                                    {boat.length || "N/A"} ft
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <CalendarMonthIcon sx={{ mr: 1, color: "primary.main" }} />
                                            <Box>
                                                <Typography variant="body2" sx={{ color: "#445066", fontWeight: 500 }}>
                                                    Year
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a2438" }}>
                                                    {boat.year_built || "N/A"}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <LocalOfferIcon sx={{ mr: 1, color: "primary.main" }} />
                                            <Box>
                                                <Typography variant="body2" sx={{ color: "#445066", fontWeight: 500 }}>
                                                    Price
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a2438" }}>
                                                    ${boat.price.toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default QuickInfoSection;
