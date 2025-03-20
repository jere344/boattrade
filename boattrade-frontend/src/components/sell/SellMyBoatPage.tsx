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
            <HeroSection />
            <SellBoatForm />
            <MapSection />
        </Box>
    );
};

export default SellMyBoatPage;
