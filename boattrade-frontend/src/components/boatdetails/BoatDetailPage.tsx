import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, Button, 
  Chip, Divider, CircularProgress, Card, CardMedia 
} from '@mui/material';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import StraightenIcon from '@mui/icons-material/Straighten';

import api from '../../services/api';
import { Boat } from '../../models/Boat';
import BoatInquiryForm from './BoatInquiryForm';

const BoatDetailPage = () => {
  const { boatId } = useParams();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  useEffect(() => {
    const fetchBoat = async () => {
      try {
        if (boatId) {
          const data = await api.getBoat(parseInt(boatId));
          setBoat(data);
        }
      } catch (err) {
        setError("Failed to load boat details");
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !boat) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="error">{error || "Boat not found"}</Typography>
      </Box>
    );
  }

  // Find main image, or use first image if no main image is specified
  const mainImage = boat.images.find(img => img.is_main) || boat.images[0];
  
  return (
    <Container maxWidth="lg">
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Boat Title and Price */}
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              {boat.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${boat.price.toLocaleString()}
            </Typography>
            <Chip 
              label={boat.category_detail?.name || "Boat"} 
              color="primary" 
              size="small" 
              icon={<DirectionsBoatIcon />} 
              sx={{ mr: 1 }}
            />
          </Grid>

          {/* Boat Images */}
          <Grid item xs={12} md={7}>
            {mainImage && (
              <Card>
                <CardMedia
                  component="img"
                  image={mainImage.image}
                  alt={mainImage.caption || boat.title}
                  sx={{ maxHeight: 400, objectFit: 'contain' }}
                />
              </Card>
            )}
            
            {/* Thumbnail Gallery */}
            {boat.images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                {boat.images.map(image => (
                  <Card key={image.id} sx={{ width: 80, height: 60 }}>
                    <CardMedia
                      component="img"
                      image={image.image}
                      alt={image.caption || "Boat image"}
                      sx={{ height: '100%', objectFit: 'cover' }}
                    />
                  </Card>
                ))}
              </Box>
            )}
          </Grid>

          {/* Boat Specifications */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>Specifications</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {boat.year_built && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DateRangeIcon color="primary" />
                  <Typography>Year: {boat.year_built}</Typography>
                </Box>
              )}
              {boat.length && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StraightenIcon color="primary" />
                  <Typography>Length: {boat.length} ft</Typography>
                </Box>
              )}
              {boat.width && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StraightenIcon color="primary" />
                  <Typography>Width: {boat.width} ft</Typography>
                </Box>
              )}
              {boat.engine_power && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SpeedIcon color="primary" />
                  <Typography>Engine: {boat.engine_power}</Typography>
                </Box>
              )}
              {boat.fuel_type && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalGasStationIcon color="primary" />
                  <Typography>Fuel Type: {boat.fuel_type}</Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth
                onClick={handleInquiryClick}
              >
                I'm interested in this boat
              </Button>
            </Box>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography>{boat.description}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Inquiry Form Dialog */}
      {showInquiryForm && (
        <BoatInquiryForm 
          boat={boat} 
          open={showInquiryForm} 
          onClose={() => setShowInquiryForm(false)} 
        />
      )}
    </Container>
  );
};

export default BoatDetailPage;
