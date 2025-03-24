import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { BoatSummary } from "@models/Boat";
import api from "@services/api";
import { Category } from "@models/Category";

// Import section components
import BoatListingHeroSection from "./BoatListingHeroSection";
import BoatFilters from "./BoatFilters";
import BoatResultsSection from "./BoatResultsSection";
import LoadMoreSection from "./LoadMoreSection";
import FooterSpacerSection from "@components/home/FooterSpacerSection";

// Format price for display
const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
    }).format(price);
};

const BoatListingPage: React.FC = () => {
    const [allBoats, setAllBoats] = useState<BoatSummary[]>([]);
    const [filteredBoats, setFilteredBoats] = useState<BoatSummary[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [filters, setFilters] = useState({
        category: "",
        search: "",
        minPrice: 0,
        maxPrice: 1000000,
    });
    const [isFilterChange, setIsFilterChange] = useState(false);
    const filterRef = useRef(null);
    
    // Define filter change handlers before using them in useMemo
    // Handle filter changes
    const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
        // Validate price filters
        if (newFilters.minPrice !== undefined && newFilters.minPrice < 0) {
            newFilters.minPrice = 0;
        }
        
        if (newFilters.maxPrice !== undefined && newFilters.maxPrice < 0) {
            newFilters.maxPrice = 0;
        }
        
        // Ensure minPrice <= maxPrice
        if (newFilters.minPrice !== undefined && 
            newFilters.minPrice > filters.maxPrice && 
            filters.maxPrice > 0) {
            newFilters.minPrice = filters.maxPrice;
        }
        
        if (newFilters.maxPrice !== undefined && 
            newFilters.maxPrice < filters.minPrice) {
            newFilters.maxPrice = filters.minPrice;
        }
        
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, [filters]);

    // Handle reset filters
    const handleResetFilters = useCallback(() => {
        setFilters({
            category: "",
            search: "",
            minPrice: 0,
            maxPrice: 1000000,
        });
    }, []);
    
    // Now we can use these handlers in the useMemo
    // Memoize the filter props to prevent unnecessary re-renders
    const filterProps = useMemo(() => ({
        categories,
        filters,
        onFilterChange: handleFilterChange,
        onReset: handleResetFilters,
        loading: loading || initialLoading,
        formatPrice,
        maxPriceLimit: 1000000
    }), [
        categories,
        filters,
        loading,
        initialLoading,
        handleFilterChange,
        handleResetFilters
    ]);

    // Load categories and all boats data once
    useEffect(() => {
        const fetchInitialData = async () => {
            setInitialLoading(true);
            try {
                // Fetch categories
                const categoriesData = await api.getCategories();
                setCategories(categoriesData);
                
                // Fetch all boats without any filters
                const boatsData = await api.getBoats({});
                setAllBoats(boatsData);
                setFilteredBoats(boatsData);
                setError(null);
            } catch (err) {
                console.error("Error fetching initial data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Memoized filter function to avoid recreating on each render
    const applyFilters = useCallback(() => {
        // Skip if we're still loading initial data
        if (initialLoading) return;
        
        setIsFilterChange(true);
        
        // Apply filtering logic client-side
        const result = allBoats.filter(boat => {
            // Category filter
            if (filters.category && boat.category.toString() !== filters.category.toString()) {
                return false;
            }
            
            // Search filter (search in boat name, description, etc.)
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const nameMatch = boat.title.toLowerCase().includes(searchLower);
                const categoryMatch = boat.category_detail?.name.toLowerCase().includes(searchLower);
                
                if (!nameMatch && !categoryMatch) {
                    return false;
                }
            }
            
            // Price filters
            if (filters.minPrice > 0 && boat.price < filters.minPrice) {
                return false;
            }
            
            if (filters.maxPrice < 1000000 && boat.price > filters.maxPrice) {
                return false;
            }
            
            return true;
        });
        
        setFilteredBoats(result);
        // Reset visible count when filters change
        setVisibleCount(5);
        
        // Small delay before removing the filter change indicator
        setTimeout(() => {
            setIsFilterChange(false);
        }, 300);
    }, [filters, allBoats, initialLoading]);

    // Apply filters whenever filters change
    useEffect(() => {
        setLoading(true);
        
        // Using a shorter timeout to improve responsiveness
        const timeoutId = setTimeout(() => {
            applyFilters();
            setLoading(false);
        }, 10);
        
        return () => clearTimeout(timeoutId);
    }, [filters, applyFilters]);

    // Observe when user scrolls to load more boats
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filteredBoats.length && !loading) {
                    // Show 5 more boats when scrolling down (with a small delay for UX)
                    setTimeout(() => {
                        setVisibleCount(prev => Math.min(prev + 5, filteredBoats.length));
                    }, 300);
                }
            },
            { threshold: 0.1 }
        );
        
        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [visibleCount, filteredBoats.length, loading]);

    // Get only the boats that should be visible
    const visibleBoats = useMemo(() => 
        filteredBoats.slice(0, visibleCount), 
        [filteredBoats, visibleCount]
    );
    
    const hasMoreToShow = visibleCount < filteredBoats.length;

    // Create meta description based on available data
    const metaDescription = `Découvrez notre sélection de ${filteredBoats.length} bateaux à vendre. Des voiliers aux bateaux à moteur, trouvez l'embarcation de vos rêves chez BoatTrade Consulting.`;
    
    // Calculate price range for meta content if boats are available
    const priceInfo = filteredBoats.length > 0 ? 
        `Prix de ${formatPrice(Math.min(...filteredBoats.map(b => b.price)))} à ${formatPrice(Math.max(...filteredBoats.map(b => b.price)))}` :
        "";
    
    // Get category names for keywords
    const categoryNames = categories.map(cat => cat.name).join(", ");

    return (
        <Box sx={{ background: "linear-gradient(180deg, #f7f9fc 0%, white 100%)" }}>
            {/* Meta Tags for SEO */}
            <title>Bateaux à Vendre | Annonces de Bateaux | BoatTrade Consulting</title>
            <meta name="title" content="Bateaux à Vendre | Annonces de Bateaux | BoatTrade Consulting" />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={`bateaux à vendre, annonces bateaux, vente bateau, ${categoryNames}, occasion, neuf, BoatTrade Consulting`} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.boattradeconsulting.fr/boats" />
            <meta property="og:title" content="Bateaux à Vendre | Annonces de Bateaux | BoatTrade Consulting" />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content="/assets/images/logo.webp" />
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.boattradeconsulting.fr/boats" />
            <meta property="twitter:title" content="Bateaux à Vendre | Annonces de Bateaux | BoatTrade Consulting" />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content="/assets/images/logo.webp" />
            
            {/* Additional */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://www.boattradeconsulting.fr/boats" />
            
            {/* Header Section */}
            <BoatListingHeroSection />
            
            {/* Filters Section - using memoized props */}
            <BoatFilters 
                ref={filterRef}
                {...filterProps}
            />
            <br />
            <br />
            
            {/* Results Section */}
            <BoatResultsSection 
                boats={filteredBoats}
                visibleBoats={visibleBoats}
                loading={loading}
                initialLoading={initialLoading}
                error={error}
                formatPrice={formatPrice}
                isFilterChange={isFilterChange}
            />
            
            {/* Load More Section */}
            <LoadMoreSection 
                loadMoreRef={loadMoreRef}
                hasMoreToShow={hasMoreToShow}
                boatsCount={filteredBoats.length}
                loading={loading && !initialLoading}
            />

            <FooterSpacerSection />
        </Box>
    );
};

export default BoatListingPage;
