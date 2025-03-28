import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";

interface VideoBackgroundProps {
    videoSources: string[];
    overlayOpacity?: number;
    showGradientOverlay?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSources, overlayOpacity = 0.5, showGradientOverlay = true }) => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isFirstVideo, setIsFirstVideo] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
    const [isFading, setIsFading] = useState(false);

    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);

    // Track which videos have been loaded to avoid duplicate network requests
    const loadVideo = (index: number, videoRef: React.RefObject<HTMLVideoElement>) => {
        const videoSrc = videoSources[index];

        // Only load if not already loaded
        if (!loadedVideos.includes(videoSrc) && videoRef.current) {
            videoRef.current.src = videoSrc;
            videoRef.current.load();
            setLoadedVideos((prev) => [...prev, videoSrc]);
        }
    };

    // Initialize first video on mount
    useEffect(() => {
        if (videoRef1.current) {
            loadVideo(0, videoRef1);
            videoRef1.current.play().catch((e) => console.error("Video playback error:", e));
        }

        // Preload the second video shortly after the first starts playing
        const timer = setTimeout(() => {
            loadVideo(1, videoRef2);
        }, 3000); // Wait 3 seconds before loading second video

        return () => clearTimeout(timer);
    }, []);

    const handleVideoEnded = () => {
        // Start crossfade transition
        setIsFading(true);

        // Calculate next video index
        const nextIndex = (activeVideoIndex + 1) % videoSources.length;
        setActiveVideoIndex(nextIndex);

        // Toggle which video element is active
        setIsFirstVideo((prev) => !prev);

        // Determine which video refs to use
        const currentRef = isFirstVideo ? videoRef1 : videoRef2;
        const nextRef = isFirstVideo ? videoRef2 : videoRef1;

        // Make sure next video is ready
        if (nextRef.current) {
            // Only load if not already loaded
            loadVideo(nextIndex, nextRef);

            // Play the next video
            nextRef.current.play().catch((e) => console.error("Video playback error:", e));

            // Calculate the next video to preload (but don't load it yet)
            const preloadIndex = (nextIndex + 1) % videoSources.length;

            // After transition is complete
            setTimeout(() => {
                setIsFading(false);

                // Reset the current video to the beginning but don't play it
                if (currentRef.current) {
                    currentRef.current.currentTime = 0;
                }

                // Preload the next video in sequence if needed
                if (!loadedVideos.includes(videoSources[preloadIndex])) {
                    // Wait a bit after transition before preloading next video
                    setTimeout(() => {
                        loadVideo(preloadIndex, currentRef);
                    }, 3000);
                }
            }, 1000); // Match this to the CSS transition time
        }
    };

    return (
        <Box
            sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                zIndex: 0,
                backgroundColor: "black",
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
                    zIndex: 1,
                }}
            />

            {/* First video element */}
            <Box
                component="video"
                ref={videoRef1}
                muted
                playsInline
                onEnded={isFirstVideo ? handleVideoEnded : undefined}
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: { xs: "70%", md: "100%" },
                    objectFit: "cover",
                    opacity: isFirstVideo ? 1 : isFading ? 0 : 0,
                    transition: "opacity 1s ease-in-out",
                    zIndex: 0,
                }}
            />

            {/* Second video element */}
            <Box
                component="video"
                ref={videoRef2}
                muted
                playsInline
                onEnded={!isFirstVideo ? handleVideoEnded : undefined}
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: { xs: "70%", md: "100%" },
                    objectFit: "cover",
                    opacity: !isFirstVideo ? 1 : isFading ? 0 : 0,
                    transition: "opacity 1s ease-in-out",
                    zIndex: 0,
                }}
            />

            {/* Gradient overlay at bottom for smoother text visibility */}
            {showGradientOverlay && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: { xs: "50%", md: "30%" },
                        background: { 
                            xs: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 25%, rgba(0,0,0,1) 100%)",
                            md: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)"
                        },
                        zIndex: 2,
                    }}
                />
            )}

            {/* Video attribution - hidden visually but accessible to screen readers */}
            <Box
                sx={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: 0,
                    zIndex: 10,
                }}
                aria-hidden="false"
            >
                <a href="https://www.vecteezy.com/free-videos/boat">Boat Stock Videos by Vecteezy</a>
            </Box>
        </Box>
    );
};

export default VideoBackground;
