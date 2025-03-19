import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import './App.css';
import BoatListingPage from './components/boatslistings/BoatListingPage';
import HomePage from './components/home/HomePage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SellMyBoatPage from './components/sell/SellMyBoatPage';
import BoatDetailPage from './components/boatdetails/BoatDetailPage';
import { getDarkTheme } from './theme/darkTheme';
import { getLightTheme } from '@theme/lightTheme';

// Layout component
const Layout = () => {
  return (
    <>
      <CssBaseline />
      {/* <Header /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/boats" element={<BoatListingPage />} />
            <Route path="/boats/category/:categoryId" element={<BoatListingPage />} />
            <Route path="/boats/:boatId" element={<BoatDetailPage />} />
            <Route path="/sell-my-boat" element={<SellMyBoatPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
     <Footer />
    </>
  );
};

// Placeholder components - these will be replaced with actual components later
// HomePage is now imported from its own file
// BoatListingPage is now imported from its own file
// BoatDetailPage is now imported from its own file
// SellMyBoatPage is now imported from its own file
const ContactPage = () => <div>Contact</div>;
const NotFoundPage = () => <div>Page not found</div>;

function App() {
  return (
    <ThemeProvider theme={getLightTheme()}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
