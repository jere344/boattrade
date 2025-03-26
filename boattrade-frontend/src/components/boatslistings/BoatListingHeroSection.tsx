import { Box, Typography, Container, Chip } from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import SailingIcon from "@mui/icons-material/Sailing";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const MotionBox =  motion.create(Box);

const BoatListingHeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 10 },
        pb: { xs: 10, md: 12 }, // Increased bottom padding to make room for filters
        background: "linear-gradient(135deg, #071B2F 0%, #134074 100%)",
        overflow: "hidden",
        minHeight: "35vh", // Slightly shorter to account for filters
      }}
    >
      {/* Decorative wave pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.07,
          background: "url(https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      />
      
      {/* Animated wave shape */}
      <MotionBox
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut" 
        }}
        sx={{
          position: "absolute",
          bottom: -100,
          left: 0,
          width: "100%",
          height: 200,
          background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)",
          zIndex: 1,
        }}
      />
      
      {/* Floating boat icons */}
      <MotionBox
        animate={{ 
          x: [0, 30, 0],
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 20,
          ease: "easeInOut" 
        }}
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          color: "rgba(255, 255, 255, 0.1)",
          fontSize: { xs: "5rem", md: "8rem" },
          zIndex: 1,
        }}
      >
        <SailingIcon fontSize="inherit" />
      </MotionBox>
      
      <MotionBox
        animate={{ 
          x: [0, -20, 0],
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 15,
          ease: "easeInOut" 
        }}
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          color: "rgba(255, 255, 255, 0.08)",
          fontSize: { xs: "4rem", md: "7rem" },
          zIndex: 1,
        }}
      >
        <SailingIcon fontSize="inherit" />
      </MotionBox>
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: "relative", 
          zIndex: 2 
        }}
      >
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ textAlign: "center", maxWidth: "800px", mx: "auto" }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: "white", 
              fontWeight: 700,
              mb: 3,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
          >
            Naviguez Dans Notre Sélection de Bateaux
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: "rgba(255,255,255,0.8)",
              mb: 3 // Reduced margin to tighten layout
            }}
          >
            Parcourez notre vaste collection de bateaux et trouvez votre prochaine aventure sur l'eau
          </Typography>
        </MotionBox>
      </Container>

      {/* Gradient overlay at bottom */}
      <Box
        sx={{
          position: "absolute",
          height: "150px",
          bottom: -6,
          left: 0,
          right: 0,
          background: "linear-gradient(to bottom, rgba(7, 27, 47, 0) 0%, rgba(7, 27, 47, 1) 100%)",
          zIndex: 1,
        }}
      />

      {/* Decorative horizontal line */}
      <Box
        sx={{
          position: "absolute",
          bottom: 50,
          left: "10%", 
          right: "10%",
          height: "1px",
          background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default BoatListingHeroSection;
