import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import InfoIcon from "@mui/icons-material/Info";
import ScrollAnimatedSection from "./ScrollAnimatedSection";
import { Boat } from "../../models/Boat";

const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

interface ContactSectionProps {
    boat: Boat;
    onInquiryClick: () => void;
}

const ContactSection = ({ boat, onInquiryClick }: ContactSectionProps) => {
    return (
        <ScrollAnimatedSection id="contact">
            <Container maxWidth="lg" sx={{ textAlign: "center" }}>
                <MotionTypography
                    variant="h3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    sx={{ mb: 4, fontWeight: 700 }}
                >
                    Interested in this {boat.category_detail?.name || "boat"}?
                </MotionTypography>

                <MotionTypography
                    variant="h5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    sx={{ mb: 6, color: "text.secondary", maxWidth: "800px", mx: "auto" }}
                >
                    Contact us today to arrange a viewing or get more information about this {boat.title}.
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
                        startIcon={<InfoIcon />}
                        sx={{ px: 8, py: 2.5, fontSize: "1.4rem" }}
                    >
                        Contact Seller
                    </Button>
                </MotionBox>
            </Container>
        </ScrollAnimatedSection>
    );
};

export default ContactSection;
