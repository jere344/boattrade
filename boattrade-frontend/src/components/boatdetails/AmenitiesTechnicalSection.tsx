import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Boat, Field } from "../../models/Boat";

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  position: "relative",
  paddingBottom: theme.spacing(1),
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 3,
    width: 60,
    backgroundColor: theme.palette.primary.main,
  },
}));

const SubsectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

interface SectionProps {
  boat: Boat;
}

const AmenitiesTechnicalSection: React.FC<SectionProps> = ({ boat }) => {
  const hasAmenities =
    boat.amenities &&
    ((boat.amenities.exterior && boat.amenities.exterior.length > 0) ||
     (boat.amenities.interior && boat.amenities.interior.length > 0));

  const hasTechnical =
    boat.technical_details &&
    ((boat.technical_details.electricity_equipment && boat.technical_details.electricity_equipment.length > 0) ||
     (boat.technical_details.rigging_sails && boat.technical_details.rigging_sails.length > 0) ||
     (boat.technical_details.electronics && boat.technical_details.electronics.length > 0));

  // If there's no data to show, don't render the section
  if (!hasAmenities && !hasTechnical) {
    return null;
  }

  const renderList = (items?: Field[]) => {
    if (!items || items.length === 0) return null;

    return (
      <List disablePadding>
        {items.map((field, index) => (
          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleOutlineIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Box component="div">
                  <Typography component="span" fontWeight="500">
                    {field.name}:
                  </Typography>
                  <Typography component="span" sx={{ ml: 1 }}>
                    {field.value}
                  </Typography>
                </Box>
              } 
            />
          </ListItem>
        ))}
      </List>
    );
  };

  const renderListSimple = (items?: string[]) => {
    if (!items || items.length === 0) return null;

    return (
      <List disablePadding>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleOutlineIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box component={Paper} elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Amenities Section */}
        {hasAmenities && (
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h5">Amenities</SectionTitle>
            
            {boat.amenities?.exterior && boat.amenities.exterior.length > 0 && (
              <Box mb={3}>
                <SubsectionTitle variant="h6">Exterior</SubsectionTitle>
                {renderListSimple(boat.amenities.exterior)}
              </Box>
            )}
            
            {boat.amenities?.interior && boat.amenities.interior.length > 0 && (
              <Box mb={3}>
                <SubsectionTitle variant="h6">Interior</SubsectionTitle>
                {renderListSimple(boat.amenities.interior)}
              </Box>
            )}
          </Grid>
        )}

        {/* Technical Section */}
        {hasTechnical && (
          <Grid item xs={12} md={hasAmenities ? 6 : 12}>
            <SectionTitle variant="h5">Technical Details</SectionTitle>
            
            {boat.technical_details?.electricity_equipment && boat.technical_details.electricity_equipment.length > 0 && (
              <Box mb={3}>
                <SubsectionTitle variant="h6">ELECTRICITE / ANNEXE</SubsectionTitle>
                {renderList(boat.technical_details.electricity_equipment)}
              </Box>
            )}
            
            {boat.technical_details?.rigging_sails && boat.technical_details.rigging_sails.length > 0 && (
              <Box mb={3}>
                <SubsectionTitle variant="h6">ACCASTILLAGE / VOILES</SubsectionTitle>
                {renderList(boat.technical_details.rigging_sails)}
              </Box>
            )}
            
            {boat.technical_details?.electronics && boat.technical_details.electronics.length > 0 && (
              <Box mb={3}>
                <SubsectionTitle variant="h6">ELECTRONIQUE</SubsectionTitle>
                {renderList(boat.technical_details.electronics)}
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AmenitiesTechnicalSection;
