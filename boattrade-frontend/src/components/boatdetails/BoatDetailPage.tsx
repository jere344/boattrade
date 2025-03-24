import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import { motion, AnimatePresence} from "framer-motion";

// Import components
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import HeroSection from "./HeroSection";
import QuickInfoSection from "./QuickInfoSection";
import GallerySection from "./GallerySection";
import OverviewSection from "./OverviewSection";
import ContactSection from "./ContactSection";
import NavigationHeader from "./NavigationHeader";
import AmenitiesTechnicalSection from "./AmenitiesTechnicalSection";

import api from "../../services/api";
import { Boat } from "../../models/Boat";
import BoatInquiryForm from "./BoatInquiryForm";
import { useTheme } from '@mui/material/styles';
import FooterSpacerSection from "@components/home/FooterSpacerSection";

const MotionBox = motion.create(Box);

const BoatDetailPage = () => {
    const theme = useTheme();
    const { boatId } = useParams();
    const [boat, setBoat] = useState<Boat | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                setError("Échec du chargement des détails du bateau");
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
                    {error || "Bateau non trouvé"}
                </Typography>
            </Box>
        );
    }

    // Find the main image URL for meta tags
    const mainImageUrl = boat.images.find(img => img.is_main)?.image || boat.images[0]?.image || '';
    // Format price for display
    const formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(boat.price);
    // Create a more detailed meta description
    const metaDescription = `${boat.title} - ${boat.year_built} - ${formattedPrice} - ${boat.location}. ${boat.description.substring(0, 150)}...`;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #f7f9fc 0%, white 100%)",
                overflow: "hidden",
                scrollBehavior: "smooth",
            }}
        >
            <title>{`${boat.title} - ${boat.year_built} - BoatTrade Consulting`}</title>
            <meta name="title" content={`${boat.title} - ${boat.year_built} - BoatTrade Consulting`} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={`boat, ${boat.title}, ${boat.category_detail?.name}, ${boat.year_built}, ${boat.location}, vente, achat, navigation`} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="product" />
            <meta property="og:url" content={`https://www.boattradeconsulting.fr/boats/${boat.id}`} />
            <meta property="og:title" content={`${boat.title} - ${boat.year_built} - BoatTrade Consulting`} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={mainImageUrl} />
            <meta property="product:price:amount" content={`${boat.price}`} />
            <meta property="product:price:currency" content="EUR" />
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`https://www.boattradeconsulting.fr/boats/${boat.id}`} />
            <meta property="twitter:title" content={`${boat.title} - ${boat.year_built} - BoatTrade Consulting`} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={mainImageUrl} />
            
            {/* Additional */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={`https://www.boattradeconsulting.fr/boats/${boat.id}`} />

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
                />
            </ScrollAnimatedSection>

            {/* Overview Section */}
            <ScrollAnimatedSection id="overview">
                <OverviewSection 
                    boat={boat} 
                    onInquiryClick={handleInquiryClick} 
                />
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

			<FooterSpacerSection />
        </Box>
    );
};

export default BoatDetailPage;
