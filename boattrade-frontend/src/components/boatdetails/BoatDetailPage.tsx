import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Import components
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import HeroSection from "./HeroSection";
import QuickInfoSection from "./QuickInfoSection";
import GallerySection from "./GallerySection";
import OverviewSection from "./OverviewSection";
import SpecificationsSection from "./SpecificationsSection";
import ContactSection from "./ContactSection";
import NavigationHeader from "./NavigationHeader";
import AmenitiesTechnicalSection from "./AmenitiesTechnicalSection";

// Import video background
import waterVideo from "@assets/vecteezy-water-surface.mp4";

import api from "../../services/api";
import { Boat } from "../../models/Boat";
import BoatInquiryForm from "./BoatInquiryForm";
import { useTheme } from '@mui/material/styles';

const MotionBox = motion(Box);

const BoatDetailPage = () => {
    const theme = useTheme();
    const { boatId } = useParams();
    const [boat, setBoat] = useState<Boat | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Scroll progress for parallax effects
    const { scrollYProgress } = useScroll();
    const headerY = useTransform(scrollYProgress, [0, 1], [0, -150]);

    useEffect(() => {
        const fetchBoat = async () => {
            try {
                if (boatId) {
                    const data = await api.getBoat(parseInt(boatId));
                    setBoat(data);
                    // Set the main image as selected image by default
                    const mainImg = data.images.find((img) => img.is_main) || data.images[0];
                    if (mainImg) {
                        setSelectedImage(mainImg.image);
                    }
                }
            } catch (err) {
                setError("Failed to load boat details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBoat();
    }, [boatId]);

    const handleInquiryClick = () => {
        setShowInquiryForm(true);
    };

    const handleThumbnailClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{ background: theme.palette.background.default }}
            >
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <CircularProgress size={80} sx={{ color: theme.palette.primary.main }} />
                </motion.div>
            </Box>
        );
    }

    if (error || !boat) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{ background: theme.palette.background.default }}
            >
                <Typography
                    variant="h6"
                    color="error"
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {error || "Boat not found"}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #f7f9fc 0%, #e8eef6 100%)",
                overflow: "hidden",
                scrollBehavior: "smooth",
            }}
        >
            {/* Navigation Header */}
            <NavigationHeader 
                boatTitle={boat.title}
                onInquiryClick={handleInquiryClick} 
            />

            {/* Hero Section with Video Background */}
            <HeroSection 
                boat={boat}
                selectedImage={selectedImage}
            />

            {/* Quick Info Section - new section for smooth transition */}
            <QuickInfoSection 
                boat={boat}
                onInquiryClick={handleInquiryClick}
            />

            {/* Gallery Section */}
            <ScrollAnimatedSection id="gallery">
                <GallerySection 
                    boat={boat} 
                    onThumbnailClick={handleThumbnailClick} 
                />
            </ScrollAnimatedSection>

            {/* Overview Section */}
            <ScrollAnimatedSection id="overview">
                <OverviewSection 
                    boat={boat} 
                    onInquiryClick={handleInquiryClick} 
                />
            </ScrollAnimatedSection>

            {/* Specifications Section */}
            <ScrollAnimatedSection id="specs">
                <SpecificationsSection boat={boat} />
            </ScrollAnimatedSection>

            {/* New Amenities & Technical Section */}
            <ScrollAnimatedSection id="amenities-technical">
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <AmenitiesTechnicalSection boat={boat} />
                </Container>
            </ScrollAnimatedSection>

            {/* Contact Section */}
            <ScrollAnimatedSection id="contact">
                <ContactSection 
                    boat={boat} 
                    onInquiryClick={handleInquiryClick} 
                />
            </ScrollAnimatedSection>

            {/* Inquiry Form Dialog */}
            <AnimatePresence>
                {showInquiryForm && (
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(8px)",
                            zIndex: 1000,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MotionBox
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            sx={{ width: "100%", maxWidth: "700px", m: 3 }}
                        >
                            <BoatInquiryForm boat={boat} open={showInquiryForm} onClose={() => setShowInquiryForm(false)} />
                        </MotionBox>
                    </MotionBox>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default BoatDetailPage;
