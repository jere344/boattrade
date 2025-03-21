import React from 'react';
import { Box, Container } from '@mui/material';
// import AnchorIcon from '../../assets/anchor.svg';
import logo from '../../assets/logo.webp';


const FooterSpacerSection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mb: "-30px" }}>
      <Box sx={{ my: 4}}>
        {/* <img src={AnchorIcon} alt="Anchor" width="250" height="auto"/> */}
        <img 
          src={logo} 
          alt="BoatTrade consulting"
          width="230" 
          height="auto"
          style={{ 
            filter: `
              drop-shadow(1px 0 0 black) 
              drop-shadow(-1px 0 0 black)
              drop-shadow(0 1px 0 black)
              drop-shadow(0 -1px 0 black)
              drop-shadow(1px 1px 0 black)
              drop-shadow(-1px -1px 0 black)
              drop-shadow(1px -1px 0 black)
              drop-shadow(-1px 1px 0 black)
            `,
            opacity: 0.5
          }}
        />
      </Box>
    </Container>
  );
};

export default FooterSpacerSection;
