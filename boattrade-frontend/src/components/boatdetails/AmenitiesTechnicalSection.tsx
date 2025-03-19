import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ComfortIcon from "@mui/icons-material/Weekend";
import { Boat, Field } from "../../models/Boat";
import { motion, AnimatePresence } from "framer-motion";

// Motion components
const MotionBox = motion.create(Box);
const MotionListItem = motion.create(ListItem);
const MotionTypography = motion.create(Typography);
const MotionPaper = motion.create(Paper);

// Styled components
const StyledPaper = styled(MotionPaper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(17, 30, 77, 0.08)',
  border: `1px solid ${alpha(theme.palette.primary.light, 0.1)}`,
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
}));

const SectionTitle = styled(MotionTypography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  position: "relative",
  paddingBottom: theme.spacing(1),
  letterSpacing: '0.5px',
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

const SubsectionTitle = styled(MotionTypography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  letterSpacing: '0.5px',
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  letterSpacing: '0.5px',
  minHeight: 56,
  [theme.breakpoints.up('sm')]: {
    minWidth: 120,
  },
}));

const CustomTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiTabs-indicator': {
    height: 3,
  },
}));

const StyledListItem = styled(MotionListItem)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const StyledCheckIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.1rem',
}));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`boat-details-tabpanel-${index}`}
      aria-labelledby={`boat-details-tab-${index}`}
      {...other}
      style={{ position: 'relative' }}
    >
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: value === index ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        sx={{ pt: 3, position: 'relative' }}
      >
        {children}
      </MotionBox>
    </div>
  );
};

interface SectionProps {
  boat: Boat;
}

const AmenitiesTechnicalSection: React.FC<SectionProps> = ({ boat }) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const tabPanelsRef = useRef<HTMLDivElement>(null);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderList = (items?: Field[]) => {
    if (!items || items.length === 0) return null;

    return (
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <List disablePadding>
          {items.map((field, index) => (
            <StyledListItem
              key={index}
              disablePadding
              sx={{ py: 0.5 }}
              variants={itemVariants}
              whileHover={{ 
                x: 8, 
                transition: { type: "spring", stiffness: 400, damping: 10 } 
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <MotionBox
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.4 }
                  }}
                >
                  <StyledCheckIcon />
                </MotionBox>
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
            </StyledListItem>
          ))}
        </List>
      </MotionBox>
    );
  };

  const renderListSimple = (items?: string[]) => {
    if (!items || items.length === 0) return null;

    return (
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <List disablePadding>
          {items.map((item, index) => (
            <StyledListItem
              key={index}
              disablePadding
              sx={{ py: 0.5 }}
              variants={itemVariants}
              whileHover={{ 
                x: 8, 
                transition: { type: "spring", stiffness: 400, damping: 10 } 
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <MotionBox
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.4 }
                  }}
                >
                  <StyledCheckIcon />
                </MotionBox>
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ fontWeight: 400 }}>
                    {item}
                  </Typography>
                } 
              />
            </StyledListItem>
          ))}
        </List>
      </MotionBox>
    );
  };

  return (
    <StyledPaper
      elevation={0}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        boxShadow: '0 10px 40px rgba(17, 30, 77, 0.12)', 
        y: -4,
        transition: { duration: 0.3 }
      }}
    >
      <SectionTitle 
        variant="h5"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Caractéristiques
      </SectionTitle>
      
      <CustomTabs 
        value={tabValue} 
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="boat details tabs"
      >
        {hasAmenities && <CustomTab 
          icon={
            <MotionBox
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ComfortIcon sx={{ mb: '4px' }} />
            </MotionBox>
          } 
          iconPosition="start" 
          label="Équipements" 
          id="boat-details-tab-0"
          aria-controls="boat-details-tabpanel-0"
        />}
        {hasTechnical && <CustomTab 
          icon={
            <MotionBox
              whileHover={{ scale: 1.2, rotate: 90, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <SettingsIcon sx={{ mb: '4px' }} />
            </MotionBox>
          }
          iconPosition="start" 
          label="Spécifications" 
          id="boat-details-tab-1"
          aria-controls="boat-details-tabpanel-1"
        />}
      </CustomTabs>
      
      <Box ref={tabPanelsRef} sx={{ position: 'relative', minHeight: '200px' }}>
        {/* Amenities Tab Panel */}
        {hasAmenities && (
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={5}>
              {boat.amenities?.exterior && boat.amenities.exterior.length > 0 && (
                <Grid item xs={12} md={6} component={motion.div} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SubsectionTitle 
                    variant="h6"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    Extérieur
                  </SubsectionTitle>
                  {renderListSimple(boat.amenities.exterior)}
                </Grid>
              )}
              
              {boat.amenities?.interior && boat.amenities.interior.length > 0 && (
                <Grid item xs={12} md={6} component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <SubsectionTitle 
                    variant="h6"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    Intérieur
                  </SubsectionTitle>
                  {renderListSimple(boat.amenities.interior)}
                </Grid>
              )}
            </Grid>
          </TabPanel>
        )}

        {/* Technical Tab Panel */}
        {hasTechnical && (
          <TabPanel value={tabValue} index={hasAmenities ? 1 : 0}>
            <Grid container spacing={5}>
              {boat.technical_details?.electricity_equipment && boat.technical_details.electricity_equipment.length > 0 && (
                <Grid item xs={12} md={6} component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SubsectionTitle 
                    variant="h6"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ÉLECTRICITÉ / ANNEXE
                  </SubsectionTitle>
                  {renderList(boat.technical_details.electricity_equipment)}
                </Grid>
              )}
              
              {boat.technical_details?.rigging_sails && boat.technical_details.rigging_sails.length > 0 && (
                <Grid item xs={12} md={6} component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <SubsectionTitle 
                    variant="h6"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ACCASTILLAGE / VOILES
                  </SubsectionTitle>
                  {renderList(boat.technical_details.rigging_sails)}
                </Grid>
              )}
              
              {boat.technical_details?.electronics && boat.technical_details.electronics.length > 0 && (
                <Grid item xs={12} mt={boat.technical_details?.electricity_equipment?.length || boat.technical_details?.rigging_sails?.length ? 4 : 0}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <SubsectionTitle 
                    variant="h6"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ÉLECTRONIQUE
                  </SubsectionTitle>
                  {renderList(boat.technical_details.electronics)}
                </Grid>
              )}
            </Grid>
          </TabPanel>
        )}
      </Box>
    </StyledPaper>
  );
};

export default AmenitiesTechnicalSection;
