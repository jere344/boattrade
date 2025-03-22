import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BoatVideo } from '../../models/Boat';
import ReactPlayer from 'react-player';
import { styled } from '@mui/system';

// Custom styled video element for better appearance
const StyledVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  backgroundColor: '#000',
  borderRadius: theme.spacing(1),
  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
  '&::-webkit-media-controls': {
    borderRadius: theme.spacing(1),
  },
  '&:focus': {
    outline: 'none',
  }
}));

// Styled close button positioned absolutely for better layout
const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: 'white',
  backgroundColor: 'rgba(0,0,0,0.3)',
  zIndex: 10,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
}));

// Title container with gradient background
const TitleContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(5), // Extra padding on top to avoid overlap with close button
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0))',
  zIndex: 5,
}));

interface VideoPlayerModalProps {
    open: boolean;
    onClose: () => void;
    video: BoatVideo | null;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ open, onClose, video }) => {
    if (!video) return null;

    // Determine the video source based on what's available
    let videoSource = null;
    let isYouTubeOrExternal = false;
    
    if (video.video_url) {
        videoSource = video.video_url;
        isYouTubeOrExternal = true;
    } else if (video.video_file) {
        videoSource = video.video_file;
    } else if (video.video_file_url) {
        videoSource = video.video_file_url;
    }

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: 'black',
                    color: 'white',
                    borderRadius: 2,
                    overflow: 'hidden',
                    m: { xs: 1, sm: 2, md: 3 },
                    height: { xs: '90vh', md: '85vh' },
                    maxHeight: '90vh'
                }
            }}
        >
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>
            
            <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <Box sx={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    bgcolor: '#000'
                }}>
                    {videoSource ? (
                        isYouTubeOrExternal ? (
                            <ReactPlayer
                                url={videoSource}
                                width="100%"
                                height="100%"
                                controls
                                playing
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            />
                        ) : (
                            <StyledVideo 
                                controls 
                                autoPlay
                                poster={video.thumbnail || undefined}
                            >
                                <source src={videoSource} type="video/mp4" />
                                Your browser does not support the video tag.
                            </StyledVideo>
                        )
                    ) : (
                        <Typography variant="body1" sx={{ p: 3 }}>
                            Video source not available
                        </Typography>
                    )}
                </Box>
                
                {video.title && (
                    <TitleContainer>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {video.title}
                        </Typography>
                    </TitleContainer>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default VideoPlayerModal;
