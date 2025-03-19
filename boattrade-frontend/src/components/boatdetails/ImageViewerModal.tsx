import { Modal, IconButton, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { BoatImage } from "@models/Boat";

interface ImageViewerModalProps {
    open: boolean;
    onClose: () => void;
    images: BoatImage[];
    currentImageIndex: number;
    onNavigate: (index: number) => void;
}

const ImageViewerModal = ({ open, onClose, images, currentImageIndex, onNavigate }: ImageViewerModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0, 0, 0, 0.9)",
            }}
        >
            <AnimatePresence mode="wait">
                <Box
                    sx={{
                        position: "relative",
                        width: "90vw",
                        height: "90vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]?.image}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            color: "white",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {currentImageIndex > 0 && (
                        <IconButton
                            onClick={() => onNavigate(currentImageIndex - 1)}
                            sx={{
                                position: "absolute",
                                left: 16,
                                color: "white",
                            }}
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                    )}
                    {currentImageIndex < images.length - 1 && (
                        <IconButton
                            onClick={() => onNavigate(currentImageIndex + 1)}
                            sx={{
                                position: "absolute",
                                right: 16,
                                color: "white",
                            }}
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    )}
                </Box>
            </AnimatePresence>
        </Modal>
    );
};

export default ImageViewerModal;
