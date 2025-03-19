import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button
} from '@mui/material';
import { BoatSummary } from '../../models/Boat';

interface BoatCardProps {
  boat: BoatSummary;
  formatPrice: (price: number) => string;
}

const BoatCard: React.FC<BoatCardProps> = ({ boat, formatPrice }) => {
  const navigate = useNavigate();

  // console.log(boat);
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={import.meta.env.VITE_API_BASE_URL + boat.main_image}
        alt={boat.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {boat.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {boat.category_detail?.name || 'Unknown Category'}
        </Typography>
        {boat.year_built && (
          <Typography variant="body2" color="text.secondary">
            Year: {boat.year_built}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" color="primary" component="p">
            {formatPrice(boat.price)}
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => navigate(`/boats/${boat.id}`)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BoatCard;
