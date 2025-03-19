import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Boats', path: '/boats' },
    { name: 'Sell My Boat', path: '/sell-my-boat' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            BoatTrade
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button 
                key={item.name} 
                component={RouterLink} 
                to={item.path}
                color="inherit"
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
