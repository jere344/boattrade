import { Container, Typography, Button, Box, Divider } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat } from "../../models/Boat";

const MotionTypography = motion.create(Typography);
const MotionBox = motion.create(Box);

interface ContactSectionProps {
    boat: Boat;
    onInquiryClick: () => void;
}

const ContactSection = ({ boat, onInquiryClick }: ContactSectionProps) => {
    return (
        <ScrollAnimatedSection id="contact">
            <Box 
                sx={{ 
                    background: "linear-gradient(135deg, rgba(172, 190, 206, 0.1) 0%, rgba(95, 111, 138, 0.15) 100%)",
                    py: 8,
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25) 0%, transparent 50%)",
                        opacity: 0.8,
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                    <MotionBox
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        sx={{ mb: 3, display: "inline-block" }}
                    >
                        <Box 
                            component="span" 
                            sx={{ 
                                display: "inline-block",
                                px: 3, 
                                py: 0.5, 
                                borderRadius: "4px", 
                                background: "rgba(172, 190, 206, 0.2)",
                                color: "primary.main",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                                letterSpacing: "0.05em",
                                textTransform: "uppercase"
                            }}
                        >
                            Contact
                        </Box>
                    </MotionBox>

                    <MotionTypography
                        variant="h3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        sx={{ mb: 4, fontWeight: 700 }}
                    >
                        Intéressé par ce {boat.category_detail?.name || "bateau"} ?
                    </MotionTypography>

                    <Box sx={{ maxWidth: "100px", mx: "auto", mb: 4 }}>
                        <Divider sx={{ 
                            borderColor: "primary.main", 
                            borderWidth: 2,
                            opacity: 0.7
                        }} />
                    </Box>

                    <MotionTypography
                        variant="h5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        sx={{ 
                            mb: 6, 
                            color: "text.secondary", 
                            maxWidth: "800px", 
                            mx: "auto",
                            lineHeight: 1.8,
                            fontWeight: 400
                        }}
                    >
                        Contactez-nous aujourd'hui pour organiser une visite ou obtenir plus d'informations sur ce {boat.title}.
                    </MotionTypography>

                    <MotionBox
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={onInquiryClick}
                            startIcon={<EmailIcon />}
                            sx={{ 
                                px: 8, 
                                py: 2.5, 
                                fontSize: "1.2rem",
                                borderRadius: "12px"
                            }}
                        >
                            Contactez nous
                        </Button>
                    </MotionBox>
                </Container>
            </Box>
        </ScrollAnimatedSection>
    );
};

export default ContactSection;
