import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import SearchIcon from '@mui/icons-material/Search';
import SellIcon from '@mui/icons-material/Sell';

const HomePage: React.FC = () => {
  // Placeholder data
  const featuredCategories = [
    { id: 1, name: 'Sailboats', image: 'https://placehold.co/200x120?text=Sailboats' },
    { id: 2, name: 'Motor Boats', image: 'https://placehold.co/200x120?text=MotorBoats' },
    { id: 3, name: 'Fishing Boats', image: 'https://placehold.co/200x120?text=FishingBoats' },
    { id: 4, name: 'Yachts', image: 'https://placehold.co/200x120?text=Yachts' },
  ];

  const featuredBoats = [
    { id: 1, name: 'Beautiful Sailboat', price: '$45,000', image: 'https://placehold.co/300x200?text=Boat1' },
    { id: 2, name: 'Luxury Yacht', price: '$120,000', image: 'https://placehold.co/300x200?text=Boat2' },
    { id: 3, name: 'Fishing Boat', price: '$30,000', image: 'https://placehold.co/300x200?text=Boat3' },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8,
          textAlign: 'center',
          backgroundImage: 'url(https://placehold.co/1200x400?text=BoatTrade+Hero)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          mb: 6,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Find Your Perfect Boat
        </Typography>
        <Typography variant="h5" component="p" paragraph>
          Buy and sell boats with ease
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={Link}
            to="/boats"
            sx={{ mr: 2 }}
          >
            Browse Boats
          </Button>
          <Button 
            variant="outlined" 
            color="inherit"
            size="large"
            component={Link}
            to="/sell-my-boat"
          >
            Sell My Boat
          </Button>
        </Box>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Browse by Category
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {featuredCategories.map((category) => (
            <Grid item key={category.id} xs={6} sm={3}>
              <Paper 
                component={Link} 
                to={`/boats/category/${category.id}`}
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': {
                    boxShadow: 6,
                  }
                }}
              >
                <img src={category.image} alt={category.name} style={{ width: '100%', marginBottom: '8px' }} />
                <Typography variant="h6">{category.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Boats Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Boats
        </Typography>
        <Grid container spacing={3}>
          {featuredBoats.map((boat) => (
            <Grid item key={boat.id} xs={12} sm={6} md={4}>
              <Paper 
                sx={{ 
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img src={boat.image} alt={boat.name} style={{ width: '100%', marginBottom: '16px' }} />
                <Typography variant="h6" gutterBottom>{boat.name}</Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>{boat.price}</Typography>
                <Button 
                  variant="outlined" 
                  component={Link}
                  to={`/boats/${boat.id}`}
                  sx={{ mt: 'auto' }}
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            component={Link}
            to="/boats"
          >
            View All Boats
          </Button>
        </Box>
      </Box>

      {/* Call to Action Sections */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DirectionsBoatIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" align="center" gutterBottom>Find Your Dream Boat</Typography>
            <Typography align="center" paragraph>
              Browse through our extensive collection of boats and find the perfect one for you.
            </Typography>
            <Button 
              variant="contained" 
              component={Link}
              to="/boats"
              sx={{ mt: 'auto' }}
            >
              Browse Now
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SearchIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" align="center" gutterBottom>Advanced Search</Typography>
            <Typography align="center" paragraph>
              Filter boats by specifications, price range, and more to find exactly what you're looking for.
            </Typography>
            <Button 
              variant="contained" 
              component={Link}
              to="/boats"
              sx={{ mt: 'auto' }}
            >
              Search Now
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SellIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" align="center" gutterBottom>Sell Your Boat</Typography>
            <Typography align="center" paragraph>
              Looking to sell your boat? Let us help you find the perfect buyer.
            </Typography>
            <Button 
              variant="contained" 
              component={Link}
              to="/sell-my-boat"
              sx={{ mt: 'auto' }}
            >
              Sell Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
