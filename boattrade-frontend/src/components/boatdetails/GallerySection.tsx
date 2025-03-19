import { Typography, Container, Grid, Box, ThemeProvider } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat } from "../../models/Boat";
import ImageViewerModal from "./ImageViewerModal";
import { getLightTheme } from "@theme/lightTheme";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);




interface GallerySectionProps {
    boat: Boat;
    onThumbnailClick: (imageUrl: string) => void;
}

const GallerySection = ({ boat }: GallerySectionProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

    return (
        <ThemeProvider theme={getLightTheme()}>
            <ScrollAnimatedSection id="gallery">
                <Container maxWidth="xl" sx={{ py: 6 }}>
                    <MotionTypography
                        variant="h3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        sx={{ mb: 6, textAlign: "center", fontWeight: 700  }}
                    >
                        Gallery
                    </MotionTypography>

                    <Grid container spacing={3}>
                        {boat.images.map((image, index) => (
                            <Grid item xs={12} md={index === 0 ? 12 : 6} lg={index === 0 ? 12 : 4} key={image.id}>
                                <MotionBox
                                    whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    sx={{
                                        borderRadius: 4,
                                        overflow: "hidden",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                                        height: index === 0 ? "70vh" : "40vh",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img
                                        src={image.image}
                                        alt={image.caption || boat.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </MotionBox>
                                {image.caption && (
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1, textAlign: "center", fontStyle: "italic", color: "text.secondary" }}
                                    >
                                        {image.caption}
                                    </Typography>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                <ImageViewerModal
                    open={selectedImageIndex !== -1}
                    onClose={() => setSelectedImageIndex(-1)}
                    images={boat.images}
                    currentImageIndex={selectedImageIndex}
                    onNavigate={setSelectedImageIndex}
                />
            </ScrollAnimatedSection>
        </ThemeProvider>
    );
};

export default GallerySection;
