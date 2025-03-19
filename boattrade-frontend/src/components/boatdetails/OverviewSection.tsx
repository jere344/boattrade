import { Container, Typography, Grid, Box, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import InfoIcon from "@mui/icons-material/Info";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat } from "../../models/Boat";

const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

interface OverviewSectionProps {
    boat: Boat;
    onInquiryClick: () => void;
}

const OverviewSection = ({ boat, onInquiryClick }: OverviewSectionProps) => {
    return (
        <ScrollAnimatedSection id="overview">
            <Container maxWidth="xl">
                <Box sx={{ mb: 6, display: "flex", alignItems: "center" }}>
                    <InfoIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                    <Typography variant="h3" component="h2">
                        Overview
                    </Typography>
                </Box>

                <Grid container spacing={6}>
                    <Grid item xs={12} md={7}>
                        <MotionTypography
                            variant="body1"
                            sx={{
                                lineHeight: 2,
                                fontSize: "1.2rem",
                                color: "text.primary",
                                whiteSpace: "pre-line",
                                mb: 4,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {boat.description}
                        </MotionTypography>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <MotionPaper
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                background: "rgba(255, 255, 255, 0.9)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
                                Key Features
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {boat.year_built && (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <DateRangeIcon sx={{ color: "primary.main", mr: 2, fontSize: "1.5rem" }} />
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Year Built
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.year_built}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                {boat.engine_power && (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <SpeedIcon sx={{ color: "primary.main", mr: 2, fontSize: "1.5rem" }} />
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Engine
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.engine_power}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                {boat.fuel_type && (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <LocalGasStationIcon sx={{ color: "primary.main", mr: 2, fontSize: "1.5rem" }} />
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Fuel Type
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.fuel_type}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                {boat.location && (
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <LocationOnIcon sx={{ color: "primary.main", mr: 2, fontSize: "1.5rem" }} />
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                Location
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {boat.location}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>

                            <MotionBox whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} sx={{ mt: "auto", pt: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    sx={{ py: 2, fontSize: "1.1rem" }}
                                    onClick={onInquiryClick}
                                >
                                    Get in touch
                                </Button>
                            </MotionBox>
                        </MotionPaper>
                    </Grid>
                </Grid>
            </Container>
        </ScrollAnimatedSection>
    );
};

export default OverviewSection;
