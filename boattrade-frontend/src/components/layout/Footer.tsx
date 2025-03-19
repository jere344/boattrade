import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              BoatTrade
            </Typography>
            <Typography variant="body2">
              The premier marketplace for buying and selling boats.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link component={RouterLink} to="/boats" color="inherit" display="block" sx={{ mb: 1 }}>
                Boats
              </Link>
              <Link component={RouterLink} to="/sell-my-boat" color="inherit" display="block" sx={{ mb: 1 }}>
                Sell My Boat
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              Email: info@boattrade.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        
        <Box mt={4}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} BoatTrade. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
