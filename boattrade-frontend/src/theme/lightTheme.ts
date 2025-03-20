import { createTheme } from "@mui/material";

// Define the light theme
export const getLightTheme = () => createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#5f6f8a",
            light: "#8f9fae",
            dark: "#3c4456",
        },
        secondary: {
            main: "#acbece",
            light: "#ccdee8",
            dark: "#8a9eb5", 
        },
        error: {
            main: "#d32f2f",
            light: "#ef5350",
        },
        success: {
            main: "#2e7d32",
            light: "#4caf50",
        },
        background: {
            default: "#f5f7fa",
            paper: "#ffffff",
        },
        text: {
            primary: "#1a2438", 
            secondary: "#445066",
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', sans-serif",
        h4: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 700,
            fontSize: "2.5rem",
        },
        h2: {
            fontWeight: 700,
            fontSize: "3.5rem",
        },
        h5: {
            fontWeight: 600,
            letterSpacing: "0.02em",
        },
        subtitle1: {
            lineHeight: 1.8,
            letterSpacing: "0.01em",
        },
        body1: {
            lineHeight: 1.7,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "12px 24px",
                    transition: "all 0.3s ease-in-out",
                    letterSpacing: "0.03em",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                        background: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover::before": {
                        opacity: 1,
                    },
                },
                containedPrimary: {
                    backgroundImage: "linear-gradient(135deg, #6b7d9a 0%, #4f5971 70%, #3d4760 100%)",
                    boxShadow: "0 4px 12px rgba(79, 89, 113, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                        boxShadow: "0 6px 16px rgba(79, 89, 113, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-2px)",
                        backgroundImage: "linear-gradient(135deg, #7c8caa 0%, #5f6f8a 70%, #4f5971 100%)",
                    },
                    "&:active": {
                        boxShadow: "0 2px 8px rgba(79, 89, 113, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                        transform: "translateY(1px)",
                    },
                },
                containedSecondary: {
                    backgroundImage: "linear-gradient(135deg, #c5d6e6 0%, #acbece 70%, #9bb0c5 100%)",
                    boxShadow: "0 4px 12px rgba(172, 190, 206, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#445066",
                    "&:hover": {
                        boxShadow: "0 6px 16px rgba(172, 190, 206, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                        transform: "translateY(-2px)",
                        backgroundImage: "linear-gradient(135deg, #d0e0ed 0%, #bccede 70%, #acbece 100%)",
                    },
                    "&:active": {
                        boxShadow: "0 2px 8px rgba(172, 190, 206, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                        transform: "translateY(1px)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontSize: "0.95rem",
                    height: "36px",
                    transition: "all 0.25s ease-in-out",
                    border: "1px solid rgba(172, 190, 206, 0.25)",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
                    padding: "0 12px",
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06)",
                    },
                },
                filled: {
                    backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(0,0,0,0.05))",
                    "&:hover": {
                        backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(0,0,0,0.03))",
                    },
                },
                outlined: {
                    background: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(8px)",
                    "&:hover": {
                        background: "rgba(255, 255, 255, 0.8)",
                    },
                },
                filledPrimary: {
                    backgroundImage: "linear-gradient(135deg, #8f9fae 0%, #5f6f8a 100%)",
                    border: "1px solid rgba(95, 111, 138, 0.1)",
                },
                filledSecondary: {
                    backgroundImage: "linear-gradient(135deg, #ccdee8 0%, #acbece 100%)",
                    border: "1px solid rgba(172, 190, 206, 0.1)",
                    color: "#445066",
                },
                outlinedPrimary: {
                    borderColor: "rgba(95, 111, 138, 0.5)",
                    "&:hover": {
                        borderColor: "#5f6f8a",
                    },
                },
                outlinedSecondary: {
                    borderColor: "rgba(172, 190, 206, 0.5)",
                    "&:hover": {
                        borderColor: "#acbece",
                    },
                },
                deleteIcon: {
                    color: "inherit",
                    opacity: 0.7,
                    "&:hover": {
                        opacity: 1,
                    },
                },
                label: {
                    fontWeight: 500,
                    padding:0,
                    paddingLeft: 10,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                }
            },
        },
        MuiModal: {
            styleOverrides: {
                backdrop: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
            },
        },
    },
});
