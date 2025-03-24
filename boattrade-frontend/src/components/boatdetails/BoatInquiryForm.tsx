import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    useTheme,
    alpha,
    Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Boat } from "../../models/Boat";
import api from "../../services/api";

const GREY_GRADIENT = "linear-gradient(135deg, #1a365d 0%, #2a4365 50%, #2c5282 100%)";
const GOLD_ACCENT = "rgba(212, 175, 55, 0.85)";

// Motion components with common animations
const withMotion = (Component:any) => motion.create(Component);
const MotionBox = withMotion(Box);
const MotionTextField = withMotion(TextField);
const MotionAlert = withMotion(Alert);
const MotionDialogContent = withMotion(DialogContent);
const MotionTypography = withMotion(Typography);
const MotionDivider = withMotion(Divider);

interface BoatInquiryFormProps {
    boat: Boat;
    open: boolean;
    onClose: () => void;
}

const BoatInquiryForm = ({ boat, open, onClose }: BoatInquiryFormProps) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        comment: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Simplified animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring" } },
    };

    const successVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: "spring" } },
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.submitInquiry({
                boat: boat.id,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone,
                comment: formData.comment,
            });

            setSuccess(true);
            setFormData({ first_name: "", last_name: "", email: "", phone: "", comment: "" });
            setTimeout(onClose, 4000);
        } catch (err) {
            console.error(err);
            setError("Nous n'avons pas pu traiter votre demande. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    // Consolidated styles
    const styles = {
        inputField: {
            "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                height: 60,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                transition: "all 0.2s ease-in-out",
                "&:hover fieldset": {
                    borderColor: alpha(GOLD_ACCENT, 0.5),
                    borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                    borderWidth: 2,
                    borderColor: GOLD_ACCENT,
                },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: alpha(GOLD_ACCENT, 0.9) },
        },
        multilineField: {
            "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                "&:hover fieldset": {
                    borderColor: alpha(GOLD_ACCENT, 0.5),
                    borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                    borderWidth: 2,
                    borderColor: GOLD_ACCENT,
                },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: alpha(GOLD_ACCENT, 0.9) },
        },
        sectionTitle: {
            mb: 2.5,
            letterSpacing: "1px",
            fontSize: "0.9rem",
            opacity: 0.7,
        },
        gradient: {
            background: `linear-gradient(to right, transparent, ${alpha(GOLD_ACCENT, 0.3)}, transparent)`,
            height: "1px",
        },
        button: (isSubmit = false) => ({
            px: isSubmit ? 5 : 3,
            py: 1.5,
            borderRadius: isSubmit ? 3 : undefined,
            fontWeight: 400,
            textTransform: "none",
            letterSpacing: "0.5px",
            ...(isSubmit && {
                background: GREY_GRADIENT,
                boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
                position: "relative",
                overflow: "hidden",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: `linear-gradient(to right, transparent, ${GOLD_ACCENT}, transparent)`,
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: `linear-gradient(to right, transparent, ${alpha(GOLD_ACCENT, 0.6)}, transparent)`,
                },
            }),
        }),
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <MotionTypography variant="subtitle1" sx={styles.sectionTitle} variants={itemVariants}>
            {children}
        </MotionTypography>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        boxShadow: "0 20px 80px rgba(0, 0, 0, 0.25)",
                        background: "#FFFFFF",
                        minHeight: "85vh",
                        maxHeight: "90vh",
                        maxWidth: "800px",
                        margin: "auto",
                        border: `1px solid ${alpha(GOLD_ACCENT, 0.1)}`,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            borderRadius: 4,
                            padding: "1px",
                            background: `linear-gradient(to bottom right, ${alpha(GOLD_ACCENT, 0.3)}, transparent, ${alpha(
                                GOLD_ACCENT,
                                0.1
                            )})`,
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                        },
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    py: 3.5,
                    px: 4,
                    background: GREY_GRADIENT,
                    color: "white",
                    fontWeight: 300,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    position: "relative",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "10%",
                        width: "80%",
                        height: "1px",
                        background: `linear-gradient(to right, transparent, ${alpha(GOLD_ACCENT, 0.5)}, transparent)`,
                    },
                }}
            >
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
                            <Box
                                sx={{
                                    width: 46,
                                    height: 46,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(255,255,255,0.1)",
                                    border: `1px solid ${alpha(GOLD_ACCENT, 0.3)}`,
                                }}
                            >
                                <Box sx={{ fontSize: 22 }}>✉️</Box>
                            </Box>
                        </motion.div>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 300, mb: 0.5, letterSpacing: 1 }}>
                                DEMANDE EXCLUSIVE
                            </Typography>
                            <Typography sx={{ fontWeight: 200, letterSpacing: 0.5 }}>
                                Intéressé par cette embarcation d'exception
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>
            </DialogTitle>

            <MotionDialogContent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{
                    px: 4,
                    py: 4,
                    flexGrow: 1,
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: alpha(theme.palette.primary.main, 0.2),
                        borderRadius: "6px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: alpha(theme.palette.primary.main, 0.3),
                    },
                }}
            >
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Typography
                        variant="h5"
                        fontWeight="300"
                        sx={{
                            my: 1,
                            letterSpacing: "0.8px",
                            fontSize: "1.8rem",
                            borderLeft: `3px solid ${alpha(GOLD_ACCENT, 0.6)}`,
                            pl: 2,
                        }}
                    >
                        {boat.title}
                    </Typography>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.4 }}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, fontWeight: 300, fontStyle: "italic" }}>
                        Complétez ce formulaire pour recevoir des informations privilégiées sur cette embarcation d'exception.
                    </Typography>
                </motion.div>

                <MotionDivider
                    sx={styles.gradient}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                />

                <AnimatePresence mode="wait">
                    {success ? (
                        <MotionBox
                            variants={successVariants}
                            initial="hidden"
                            animate="visible"
                            key="success"
                            sx={{ my: 8, py: 6, textAlign: "center" }}
                        >
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                                <Box
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: "50%",
                                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 4,
                                        border: `1px solid ${alpha(GOLD_ACCENT, 0.3)}`,
                                        boxShadow: `0 0 0 15px ${alpha(theme.palette.primary.main, 0.02)}`,
                                        mx: "auto",
                                    }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <Box sx={{ fontSize: 60, color: GOLD_ACCENT }}>✓</Box>
                                    </motion.div>
                                </Box>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 200, letterSpacing: 1 }}>
                                    Demande Confirmée
                                </Typography>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300, lineHeight: 1.6 }}>
                                    Notre conseiller personnel vous contactera dans les plus brefs délais
                                    <br />
                                    pour vous présenter cette embarcation d'exception.
                                </Typography>
                            </motion.div>
                        </MotionBox>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                            <MotionBox variants={containerVariants} initial="hidden" animate="show" key="form">
                                {error && (
                                    <MotionAlert
                                        severity="error"
                                        sx={{
                                            mb: 3,
                                            px: 3,
                                            py: 2,
                                            borderRadius: 2,
                                            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {error}
                                    </MotionAlert>
                                )}

                                <SectionTitle>COORDONNÉES PERSONNELLES</SectionTitle>

                                <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                                    <MotionTextField
                                        label="Prénom"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        variants={itemVariants}
                                        fullWidth
                                        required
                                        sx={styles.inputField}
                                    />

                                    <MotionTextField
                                        label="Nom"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        fullWidth
                                        variants={itemVariants}
                                        required
                                        sx={styles.inputField}
                                    />
                                </Box>

                                <MotionTextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variants={itemVariants}
                                    sx={{ mb: 3, ...styles.inputField }}
                                />

                                <MotionTextField
                                    label="Téléphone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    variants={itemVariants}
                                    sx={{ mb: 4.5, ...styles.inputField }}
                                />

                                <SectionTitle>VOTRE DEMANDE</SectionTitle>

                                <MotionTextField
                                    label="Message"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    multiline
                                    rows={5}
                                    fullWidth
                                    required
                                    variants={itemVariants}
                                    placeholder="Je souhaiterais obtenir des informations détaillées sur cette embarcation..."
                                    sx={styles.multilineField}
                                />
                            </MotionBox>
                        </Box>
                    )}
                </AnimatePresence>
            </MotionDialogContent>

            <DialogActions
                sx={{
                    px: 4,
                    py: 3.5,
                    background: alpha(theme.palette.primary.light, 0.03),
                    borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "10%",
                        width: "80%",
                        height: "1px",
                        background: `linear-gradient(to right, transparent, ${alpha(GOLD_ACCENT, 0.3)}, transparent)`,
                    },
                }}
            >
                <Button
                    onClick={onClose}
                    color="inherit"
                    component={motion.button}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    sx={styles.button()}
                >
                    Fermer
                </Button>
                {!success && (
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                        component={motion.button}
                        whileHover={{ scale: 1.03, boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.25)}` }}
                        whileTap={{ scale: 0.97 }}
                        sx={styles.button(true)}
                    >
                        {loading ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <CircularProgress size={20} color="inherit" sx={{ color: "white" }} />
                                <span>Transmission en cours...</span>
                            </Box>
                        ) : (
                            "Soumettre ma demande"
                        )}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default BoatInquiryForm;
