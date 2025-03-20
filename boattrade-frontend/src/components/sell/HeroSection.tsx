import { useState } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import waterVideo from "@assets/vecteezy-water-surface.mp4";
import { useTransform, useScroll } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

const HeroSection = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
    };

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                height: "100vh",
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
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(4px)",
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
                    style={{ opacity: heroOpacity }}
                    sx={{
                        maxWidth: "800px",
                        color: "white",
                        position: "relative",
                        textAlign: "center",
                        mx: "auto",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        VENDRE VOTRE BATEAU
                    </Typography>

                    <Typography variant="h2" component="h1" sx={{ mb: 3, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                        Vendez votre bateau rapidement et facilement
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 4, color: "#acbece", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                        Rejoignez nos partenaires et vendez votre bateau en toute simplicité
                    </Typography>

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
        </Box>
    );
};

export default HeroSection;
