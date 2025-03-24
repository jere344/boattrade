import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Alert,
    CircularProgress,
    IconButton,
    useTheme,
    alpha,
    Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { SellRequest } from "../../models/SellRequest";
import api from "../../services/api";

// Motion components
const withMotion = (Component: any) =>  motion.create(Component);
const MotionBox = withMotion(Box);
const MotionTextField = withMotion(TextField);

const SellBoatForm: React.FC = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState<SellRequest>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        boat_details: "",
        comment: "",
    });

    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages((prev) => [...prev, ...newFiles]);

            // Create preview URLs
            const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
            setImagePreviewUrls((prev) => [...prev, ...newImageUrls]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));

        // Revoke the URL to avoid memory leaks
        URL.revokeObjectURL(imagePreviewUrls[index]);
        setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.submitSellRequest(formData, images);
            setSuccess(true);
            // Reset form
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                boat_details: "",
                comment: "",
            });
            setImages([]);
            setImagePreviewUrls([]);
        } catch (err) {
            setError("Échec de la soumission de votre demande. Veuillez réessayer plus tard.");
            console.error("Erreur lors de la soumission de la demande de vente:", err);
        } finally {
            setLoading(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring" } },
    };

    // Common text field styles
    const textFieldBaseStyles = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            backgroundColor: "white",
            "&:hover fieldset": {
                borderColor: alpha(theme.palette.primary.main, 0.7),
                borderWidth: 2,
            },
            "&.Mui-focused fieldset": {
                borderWidth: 2,
                borderColor: theme.palette.primary.main,
            },
            "& fieldset": {
                borderColor: alpha(theme.palette.grey[400], 0.8),
            },
        },
        "& .MuiInputLabel-root": {
            color: theme.palette.text.primary,
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.primary.main,
        },
        "& .MuiInputBase-input": {
            color: theme.palette.text.primary,
        },
    };

    return (
        <Box
            id="sell-form"
            sx={{
                minHeight: "100vh",
                width: "100%",
                background: "linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(30,30,30,0.9) 100%)",
                pt: 8,
                pb: 12,
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "50px",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
                    zIndex: 1,
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    py: 4,
                    mb: 5,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)} 0%, ${alpha(
                        theme.palette.primary.main,
                        0.4
                    )} 100%)`,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                            sx={{
                                width: 46,
                                height: 46,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(255,255,255,0.1)",
                                border: `1px solid ${alpha(theme.palette.primary.light, 0.3)}`,
                            }}
                        >
                            <Box sx={{ fontSize: 22 }}>⚓</Box>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 300, mb: 0.5, letterSpacing: 1 }}>
                                VENDRE VOTRE BATEAU
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 200, letterSpacing: 0.5 }}>
                                Remplissez le formulaire ci-dessous
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <AnimatePresence mode="wait">
                    {success ? (
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            sx={{ textAlign: "center", py: 6, maxWidth: "800px", mx: "auto" }}
                        >
                            <Alert
                                severity="success"
                                sx={{
                                    mb: 3,
                                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                                    color: theme.palette.common.white,
                                    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                                    "& .MuiAlert-icon": { color: theme.palette.success.light },
                                }}
                            >
                                Votre demande a été soumise avec succès ! Nous vous contacterons bientôt.
                            </Alert>
                        </MotionBox>
                    ) : (
                        <MotionBox
                            component="form"
                            onSubmit={handleSubmit}
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            noValidate
                        >
                            {error && (
                                <Alert
                                    severity="error"
                                    sx={{
                                        mb: 4,
                                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                                        color: theme.palette.common.white,
                                        border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                                        "& .MuiAlert-icon": { color: theme.palette.error.light },
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 4,
                                    color: "white",
                                    fontWeight: 300,
                                }}
                                component={motion.h4}
                                variants={itemVariants}
                            >
                                Détails du contact
                            </Typography>

                            <Grid container spacing={3} mb={6}>
                                <Grid item xs={12} md={6}>
                                    <MotionTextField
                                        required
                                        fullWidth
                                        label="Prénom"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        disabled={loading}
                                        sx={{
                                            ...textFieldBaseStyles,
                                            "& .MuiOutlinedInput-root": {
                                                ...textFieldBaseStyles["& .MuiOutlinedInput-root"],
                                                height: 60,
                                            },
                                        }}
                                        variants={itemVariants}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <MotionTextField
                                        required
                                        fullWidth
                                        label="Nom"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        disabled={loading}
                                        sx={{
                                            ...textFieldBaseStyles,
                                            "& .MuiOutlinedInput-root": {
                                                ...textFieldBaseStyles["& .MuiOutlinedInput-root"],
                                                height: 60,
                                            },
                                        }}
                                        variants={itemVariants}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <MotionTextField
                                        required
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        sx={{
                                            ...textFieldBaseStyles,
                                            "& .MuiOutlinedInput-root": {
                                                ...textFieldBaseStyles["& .MuiOutlinedInput-root"],
                                                height: 60,
                                            },
                                        }}
                                        variants={itemVariants}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <MotionTextField
                                        fullWidth
                                        label="Numéro de téléphone (facultatif)"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={loading}
                                        sx={{
                                            ...textFieldBaseStyles,
                                            "& .MuiOutlinedInput-root": {
                                                ...textFieldBaseStyles["& .MuiOutlinedInput-root"],
                                                height: 60,
                                            },
                                        }}
                                        variants={itemVariants}
                                    />
                                </Grid>
                            </Grid>

                            <Divider
                                sx={{
                                    my: 4,
                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                    "&::before, &::after": {
                                        borderColor: alpha(theme.palette.primary.main, 0.2),
                                    },
                                }}
                            />

                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 4,
                                    color: "white",
                                    fontWeight: 300,
                                }}
                                component={motion.h4}
                                variants={itemVariants}
                            >
                                Informations sur le bateau
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <MotionTextField
                                        required
                                        fullWidth
                                        label="Détails du bateau"
                                        name="boat_details"
                                        multiline
                                        rows={4}
                                        placeholder="Veuillez décrire votre bateau (année, marque, modèle, longueur, moteur, etc.)"
                                        value={formData.boat_details}
                                        onChange={handleChange}
                                        disabled={loading}
                                        sx={textFieldBaseStyles}
                                        variants={itemVariants}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MotionTextField
                                        fullWidth
                                        label="Commentaires supplémentaires (facultatif)"
                                        name="comment"
                                        multiline
                                        rows={2}
                                        value={formData.comment}
                                        onChange={handleChange}
                                        disabled={loading}
                                        sx={textFieldBaseStyles}
                                        variants={itemVariants}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            mt: 2,
                                            p: 4,
                                            backgroundColor: alpha(theme.palette.background.paper, 0.05),
                                            borderRadius: 2,
                                            border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Télécharger des photos
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{
                                                mr: 2,
                                            }}
                                            disabled={loading}
                                        >
                                            Télécharger des images du bateau
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                                disabled={loading}
                                            />
                                        </Button>
                                        <Typography variant="body2" component="span" sx={{ color: alpha(theme.palette.common.white, 0.7) }}>
                                            {images.length} {images.length === 1 ? "fichier" : "fichiers"} sélectionné(s)
                                        </Typography>

                                        {imagePreviewUrls.length > 0 && (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
                                                {imagePreviewUrls.map((url, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            position: "relative",
                                                            width: 120,
                                                            height: 120,
                                                            border: "2px solid white",
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <img
                                                            src={url}
                                                            alt={`Aperçu du bateau ${index + 1}`}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                borderRadius: "2px",
                                                            }}
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                position: "absolute",
                                                                top: 5,
                                                                right: 5,
                                                                bgcolor: "rgba(255,255,255,0.9)",
                                                                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                                                            }}
                                                            onClick={() => handleRemoveImage(index)}
                                                            disabled={loading}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ mt: 4, mx: "auto" }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        disabled={loading || success}
                                        sx={{
                                            height: 60,
                                            textTransform: "none",
                                            fontSize: "1.1rem",
                                            fontWeight: "medium",
                                            backgroundColor: theme.palette.primary.main,
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary.dark,
                                            },
                                        }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : "Soumettre votre bateau à la vente"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </MotionBox>
                    )}
                </AnimatePresence>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    sx={{
                        mt: 8,
                        textAlign: "center",
                        color: alpha(theme.palette.common.white, 0.7),
                    }}
                >
                    <Typography variant="body2">
                        Vos informations sont sécurisées et ne seront jamais partagées.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SellBoatForm;
