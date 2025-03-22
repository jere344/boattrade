import { Typography, Container, Grid, Box, ThemeProvider, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat, BoatVideo } from "../../models/Boat";
import ImageViewerModal from "./ImageViewerModal";
import VideoPlayerModal from "./VideoPlayerModal";
import { getLightTheme } from "@theme/lightTheme";
import { styled } from "@mui/system";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const GradientOverlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    '&:hover': {
        opacity: 1,
    },
});

const PlayButton = styled(Button)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    borderRadius: '50%',
    minWidth: '60px',
    width: '60px',
    height: '60px',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    zIndex: 2,
});

// Helper function to get the video source (either URL or file)
const getVideoSource = (video: BoatVideo): string | null => {
    if (video.video_url) {
        return video.video_url;
    } else if (video.video_file) {
        return video.video_file;
    } else if (video.video_file_url) {
        return video.video_file_url;
    }
    return null;
};

// Helper to determine if this is a directly uploaded file
const isDirectFile = (video: BoatVideo): boolean => {
    return !video.video_url && (!!video.video_file || !!video.video_file_url);
};

interface GallerySectionProps {
    boat: Boat;
}

const GallerySection = ({ boat }: GallerySectionProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const [selectedVideo, setSelectedVideo] = useState<BoatVideo | null>(null);
    
    // Determine if this boat has videos
    const hasVideos = boat.videos && boat.videos.length > 0;

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
                        Galerie
                    </MotionTypography>

                    <Grid container spacing={3}>
                        {/* Videos - show at the top if available */}
                        {hasVideos && (
                            <Grid item xs={12} sx={{ mb: 3 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                    Vidéos
                                </Typography>
                                <Grid container spacing={3}>
                                    {boat.videos.map((video, index) => (
                                        <Grid item xs={12} md={6} lg={4} key={`video-${video.id}`}>
                                            <MotionBox
                                                whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * index }}
                                                sx={{
                                                    position: 'relative',
                                                    borderRadius: 4,
                                                    overflow: "hidden",
                                                    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                                                    height: "40vh",
                                                    cursor: "pointer",
                                                    transition: 'transform 0.3s ease-in-out',
                                                }}
                                                onClick={() => setSelectedVideo(video)}
                                            >
                                                {/* Video thumbnail */}
                                                {video.thumbnail ? (
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={video.title || "Video thumbnail"}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            width: "100%",
                                                            height: "100%",
                                                            backgroundColor: "black",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <Typography variant="body1">
                                                            {video.title || "Vidéo"}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                
                                                {/* Play button overlay */}
                                                <PlayButton>
                                                    <PlayArrowIcon fontSize="large" />
                                                </PlayButton>
                                                
                                                <GradientOverlay />
                                            </MotionBox>
                                            {video.title && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ mt: 1, textAlign: "center", fontStyle: "italic", color: "text.secondary" }}
                                                >
                                                    {video.title}
                                                </Typography>
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        )}
                        
                        {/* Images */}
                        <Grid item xs={12}>
                            {hasVideos && (
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                    Photos
                                </Typography>
                            )}
                            <Grid container spacing={3}>
                                {boat.images.map((image, index) => (
                                    <Grid item xs={12} md={index === 0 ? 12 : 6} lg={index === 0 ? 12 : 4} key={image.id}>
                                        <MotionBox
                                            whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            sx={{
                                                position: 'relative',
                                                borderRadius: 4,
                                                overflow: "hidden",
                                                boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                                                height: index === 0 ? "70vh" : "40vh",
                                                cursor: "pointer",
                                                transition: 'transform 0.3s ease-in-out',
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
                                            <GradientOverlay />
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
                        </Grid>
                    </Grid>
                </Container>

                {/* Image Modal */}
                <ImageViewerModal
                    open={selectedImageIndex !== -1}
                    onClose={() => setSelectedImageIndex(-1)}
                    images={boat.images}
                    currentImageIndex={selectedImageIndex}
                    onNavigate={setSelectedImageIndex}
                />
                
                {/* Video Modal */}
                <VideoPlayerModal
                    open={selectedVideo !== null}
                    onClose={() => setSelectedVideo(null)}
                    video={selectedVideo}
                />
            </ScrollAnimatedSection>
        </ThemeProvider>
    );
};

export default GallerySection;
