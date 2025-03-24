import React from 'react';
import { Box } from '@mui/material';
import SellBoatForm from './SellBoatForm';
import HeroSection from './HeroSection';
import MapSection from './MapSection';

const SellMyBoatPage: React.FC = () => {
    
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
            <title>Vendez Votre Bateau - BoatTrade Consulting</title>
            <meta name="title" content="Vendez Votre Bateau - BoatTrade Consulting" />
            <meta name="description" content="Vendez votre bateau rapidement et au meilleur prix avec BoatTrade Consulting. Processus simple, estimation gratuite et réseau d'acheteurs qualifiés." />
            <meta name="keywords" content="vente bateau, vendre mon bateau, estimation bateau, courtier nautique, BoatTrade, Palavas-les-Flots, Hérault, France" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.boattradeconsulting.fr/sell" />
            <meta property="og:title" content="Vendez Votre Bateau - BoatTrade Consulting" />
            <meta property="og:description" content="Vendez votre bateau rapidement et au meilleur prix avec BoatTrade Consulting. Processus simple, estimation gratuite et réseau d'acheteurs qualifiés." />
            <meta property="og:image" content="/assets/images/sell-boat-banner.webp" />
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.boattradeconsulting.fr/sell" />
            <meta property="twitter:title" content="Vendez Votre Bateau - BoatTrade Consulting" />
            <meta property="twitter:description" content="Vendez votre bateau rapidement et au meilleur prix avec BoatTrade Consulting. Processus simple, estimation gratuite et réseau d'acheteurs qualifiés." />
            <meta property="twitter:image" content="/assets/images/sell-boat-banner.webp" />
            
            {/* Additional */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://www.boattradeconsulting.fr/sell" />

            <HeroSection />
            <SellBoatForm />
            <MapSection />
        </Box>
    );
};

export default SellMyBoatPage;
