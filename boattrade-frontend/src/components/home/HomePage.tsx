import React from 'react';
import { Box, Container } from '@mui/material';

// Import components
import HeroSection from './HeroSection.tsx';
import CategorySection from './CategorySection.tsx';
// import HowItWorksSection from './HowItWorksSection.tsx';
import TestimonialsSection from './TestimonialsSection.tsx';
import FeaturedListingsSection from './FeaturedListingsSection';
import BlogPostsSection from './BlogPostSection.tsx';
import FooterSpacerSection from './FooterSpacerSection.tsx';
import AboutCompanySection from './AboutCompanySection.tsx';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        background: "linear-gradient(180deg, #f7f9fc 0%, white 100%)",
        overflow: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works Section */}
      {/* <HowItWorksSection /> */}


      {/* About Company Section */}
      <AboutCompanySection />

      {/* Category Section */}
      <CategorySection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Featured Listings Section */}
      <FeaturedListingsSection />
      
      {/* Call to Action Section */}
      <BlogPostsSection />
      
      {/* Footer Spacer with Anchor Design */}
      <FooterSpacerSection />
    </Box>
  );
};

export default HomePage;
