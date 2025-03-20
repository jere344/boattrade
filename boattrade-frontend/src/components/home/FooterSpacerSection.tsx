import React from 'react';
import { Box, Container } from '@mui/material';
import AnchorIcon from '../../assets/anchor.svg'; // Import the anchor SVG

const FooterSpacerSection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mb: "-50px" }}>
      <Box sx={{ my: 4, opacity: 0.5 }}>
        <img src={AnchorIcon} alt="Anchor" width="250" height="auto"/>
      </Box>
    </Container>
  );
};

export default FooterSpacerSection;
