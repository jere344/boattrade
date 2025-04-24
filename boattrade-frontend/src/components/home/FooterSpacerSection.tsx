import React from 'react';
import { Box, Container } from '@mui/material';
// import AnchorIcon from '../../assets/anchor.svg';
import logo from '../../assets/logo-reversed.webp';


const FooterSpacerSection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mb: "-35px" }}>
      <Box sx={{ my: 4}}>
        {/* <img src={AnchorIcon} alt="Anchor" width="250" height="auto"/> */}
        <img 
          src={logo} 
          alt="BoatTrade consulting"
          width="230" 
          height="auto"
          style={{ 
            opacity: 1
          }}
        />
      </Box>
    </Container>
  );
};

export default FooterSpacerSection;
