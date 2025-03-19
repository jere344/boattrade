import { createTheme } from "@mui/material";

// Define the dark theme
export const getDarkTheme = () => createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#5f6f8a",
            light: "#8f9fae",
            dark: "#4f5971",
        },
        secondary: {
            main: "#acbece",
        },
        background: {
            default: "#121a2b",
            paper: "#1a2438",
        },
        text: {
            primary: "#e0e0f0", 
            secondary: "#b8c4d8",
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
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "12px 24px",
                },
                containedPrimary: {
                    backgroundImage: "linear-gradient(135deg, #5f6f8a 0%, #4f5971 100%)",
                    boxShadow: "0 4px 10px rgba(95, 111, 138, 0.3)",
                    "&:hover": {
                        boxShadow: "0 6px 12px rgba(95, 111, 138, 0.4)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontSize: "1rem",
                    height: "36px",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
                },
            },
        },
    },
});
