import { useEffect, useRef, useState } from "react";
import { Box, Typography, Container, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Boat } from "../../models/Boat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StraightenIcon from "@mui/icons-material/Straighten";
import waterVideo from "@assets/vecteezy-water-surface.mp4";
import { useTransform, useScroll } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionChip = motion.create(Chip);

interface HeroSectionProps {
    boat: Boat;
    selectedImage: string | null;
}

const HeroSection = ({ boat, selectedImage }: HeroSectionProps) => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const { scrollYProgress } = useScroll();
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
    };

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                height: "100vh", // Extra height to allow for parallax effect
                width: "100%",
                overflow: "hidden",
            }}
        >
            {/* Video Background */}
            <Box
                sx={{
                    position: "absolute",
                    height: "100%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Darkening
                        backdropFilter: "blur(4px)", // Blurring
                        zIndex: 2,
                    }}
                />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlayThrough={handleVideoLoaded}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: videoLoaded ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    <source src={waterVideo} type="video/mp4" />
                    Votre navigateur ne supporte pas la balise vidéo.
                </video>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40vh",
                        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                        zIndex: 3,
                    }}
                />
            </Box>

            {/* Boat Image Floating Over Video */}
            {selectedImage && (
                <MotionBox
                    style={{
                        scale: heroScale,
                        opacity: heroOpacity,
                    }}
                    sx={{
                        position: "absolute",
                        // top: "40%",
                        // left: "50%",
                        top: { xs: "15%", md: "40%", lg:"35%" },
                        left: { xs: "10%", md: "40%", lg:"50%" },
                        transform: "translate(-50%, -50%)",
                        width: { xs: "80%", sm: "80%", md: "60%", lg:"45%" },
                        // maxWidth: "950px",
                        height: "auto",
                        zIndex: 3,
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <img
                        src={selectedImage}
                        alt={boat.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </MotionBox>
            )}

            <Container
                maxWidth="xl"
                sx={{
                    position: "relative",
                    height: "100%",
                    zIndex: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    pt: 8,
                }}
            >
                <MotionBox
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    sx={{
                        maxWidth: "800px",
                        color: "white",
                        position: "relative",
                        top: { xs: "15%", md: "25%" }, // Position below the centered boat image
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {boat.category_detail?.name || "Bateau"} • {boat.year_built || "Année N/A"}
                    </Typography>

                    <Typography variant="h2" component="h1" sx={{ mb: 3, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                        {boat.title}
                    </Typography>

                    <Typography variant="h3" sx={{ mb: 4, color: "#acbece", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                        ${boat.price.toLocaleString()}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                        <MotionChip
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            label={boat.location || "Lieu non spécifié"}
                            color="secondary"
                            size="medium"
                            icon={<LocationOnIcon />}
                            sx={{ fontSize: "1rem", py: 3 }}
                        />

                        <MotionChip
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            label={`${boat.length || "N/A"} ft`}
                            variant="outlined"
                            size="medium"
                            icon={<StraightenIcon />}
                            sx={{ color: "white", borderColor: "white", fontSize: "1rem", py: 3 }}
                        />
                    </Box>
                </MotionBox>
            </Container>

            {/* Scroll indicator */}
            <MotionBox
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                sx={{
                    position: "absolute",
                    bottom: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 5,
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    Faites défiler pour explorer
                </Typography>
                <Box sx={{ fontSize: "2rem" }}>↓</Box>
            </MotionBox>

            {/* Wave transition effect */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: -50, // Slight overlap to prevent any gaps
                    left: 0,
                    width: "100%",
                    zIndex: 5,
                    overflow: "hidden",
                    lineHeight: 0,
                }}
            ></Box>
        </Box>
    );
};

export default HeroSection;
