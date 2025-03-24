import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SellBoatForm from './SellBoatForm';
import BoatSalesService from './BoatSalesService';
import PurchaseAssistanceService from './PurchaseAssistanceService';
import MapSection from './MapSection';
import { useTheme } from '@mui/material/styles';

// Service page scroll animated section component
const ScrollAnimatedSection: React.FC<{
    id: string;
    children: React.ReactNode;
}> = ({ id, children }) => {
    return (
        <Box
            component={motion.section}
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{ scrollMarginTop: "80px" }}
        >
            {children}
        </Box>
    );
};

const ServicesPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading for smooth page transition
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, []);
    
    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{ background: "#1a1a1a" }}
            >
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <CircularProgress size={80} sx={{ color: "#ffffff" }} />
                </motion.div>
            </Box>
        );
    }
    
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                background: "linear-gradient(180deg, #1a1a1a 0%, #2c2c2c 100%)",
                overflow: "hidden",
                scrollBehavior: "smooth",
                color: "white",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <title>Nos Services - BoatTrade Consulting</title>
            <meta name="title" content="Nos Services - BoatTrade Consulting" />
            <meta name="description" content="Découvrez nos services d'accompagnement à la vente et à l'achat de bateaux. BoatTrade Consulting vous offre une expertise complète pour tous vos projets nautiques." />
            <meta name="keywords" content="vente bateau, achat bateau, conseil nautique, estimation bateau, courtier nautique, BoatTrade, Palavas-les-Flots, Hérault, France" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.boattradeconsulting.fr/services" />
            <meta property="og:title" content="Nos Services - BoatTrade Consulting" />
            <meta property="og:description" content="Découvrez nos services d'accompagnement à la vente et à l'achat de bateaux. BoatTrade Consulting vous offre une expertise complète pour tous vos projets nautiques." />
            <meta property="og:image" content="/assets/images/services-banner.webp" />
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.boattradeconsulting.fr/services" />
            <meta property="twitter:title" content="Nos Services - BoatTrade Consulting" />
            <meta property="twitter:description" content="Découvrez nos services d'accompagnement à la vente et à l'achat de bateaux. BoatTrade Consulting vous offre une expertise complète pour tous vos projets nautiques." />
            <meta property="twitter:image" content="/assets/images/services-banner.webp" />
            
            {/* Additional */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://www.boattradeconsulting.fr/services" />

            <Box 
                component={motion.header} 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                sx={{ padding: "2rem", textAlign: "center" }}
            >
                <Typography 
                    component={motion.h1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    variant="h2"
                    sx={{ mb: 2 }}
                >
                    Nos Services
                </Typography>
                <Typography 
                    component={motion.p}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    variant="h6"
                >
                    Expertise et accompagnement personnalisés pour tous vos projets nautiques
                </Typography>
            </Box>


            <ScrollAnimatedSection id="boat-sales">
                <BoatSalesService />
            </ScrollAnimatedSection>

            <ScrollAnimatedSection id="purchase-assistance">
                <PurchaseAssistanceService />
            </ScrollAnimatedSection>

            <ScrollAnimatedSection id="sell-form">
                <SellBoatForm />
            </ScrollAnimatedSection>

            <ScrollAnimatedSection id="map">
                <MapSection />
            </ScrollAnimatedSection>
        </Box>
    );
};

export default ServicesPage;
