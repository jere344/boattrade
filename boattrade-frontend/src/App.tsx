import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import BoatListingPage from "./components/boatslistings/BoatListingPage";
import HomePage from "./components/home/HomePage";
import Header from "./components/layout/Header";
// import Header from './components/layout/ClearHeader';
import Footer from "./components/layout/Footer";
import ServicesPage from "@components/services/ServicesPage";
import BoatDetailPage from "./components/boatdetails/BoatDetailPage";
import { getLightTheme } from "@theme/lightTheme";

function ScrollToTop() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname, search]);

    return null;
}

// Layout component
const Layout = () => {
    return (
        <>
            <CssBaseline />
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/boats" element={<BoatListingPage />} />
                <Route path="/boats/:boatId" element={<BoatDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};

const NotFoundPage = () => <div>Page not found</div>;

function App() {
    return (
        <ThemeProvider theme={getLightTheme()}>
            <ScrollToTop />
            <Layout />
        </ThemeProvider>
    );
}

export default App;
