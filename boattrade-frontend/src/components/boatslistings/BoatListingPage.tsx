import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { BoatSummary } from "@models/Boat";
import api from "@services/api";
import { Category } from "@models/Category";

// Import section components
import BoatListingHeroSection from "./BoatListingHeroSection";
import BoatFiltersSection from "./BoatFiltersSection";
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
    const [boats, setBoats] = useState<BoatSummary[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(5); // Initial number of boats to show
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [filters, setFilters] = useState({
        category: "",
        search: "",
        minPrice: 0,
        maxPrice: 1000000,
    });

    // Load all boats data at once
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const categoriesData = await api.getCategories();
                setCategories(categoriesData);

                const queryParams: any = {
                    search: filters.search || undefined,
                    min_price: filters.minPrice > 0 ? filters.minPrice : undefined,
                    max_price: filters.maxPrice < 1000000 ? filters.maxPrice : undefined,
                    category: filters.category || undefined,
                };

                const boatsData = await api.getBoats(queryParams);
                setBoats(boatsData);
                setError(null);
                // Reset visible count when new data is loaded
                setVisibleCount(5);
            } catch (err) {
                setError("Failed to load data.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    // Observe when user scrolls to load more boats
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < boats.length) {
                    // Show 5 more boats when scrolling down
                    setVisibleCount(prev => Math.min(prev + 5, boats.length));
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
    }, [visibleCount, boats.length]);

    // Handle filter changes
    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    // Handle reset filters
    const handleResetFilters = () => {
        setFilters({
            category: "",
            search: "",
            minPrice: 0,
            maxPrice: 1000000,
        });
    };

    // Get only the boats that should be visible
    const visibleBoats = boats.slice(0, visibleCount);
    const hasMoreToShow = visibleCount < boats.length;

    return (
        <Box sx={{ background: "linear-gradient(180deg, #f7f9fc 0%, white 100%)" }}>
            {/* Header Section */}
            <BoatListingHeroSection />
            
            {/* Filters Section */}
            <BoatFiltersSection 
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                loading={loading}
                formatPrice={formatPrice}
                maxPriceLimit={1000000}
            />
            <br />
            <br />
            
            {/* Results Section */}
            <BoatResultsSection 
                boats={boats}
                visibleBoats={visibleBoats}
                loading={loading}
                error={error}
                formatPrice={formatPrice}
            />
            
            {/* Load More Section */}
            <LoadMoreSection 
                loadMoreRef={loadMoreRef}
                hasMoreToShow={hasMoreToShow}
                boatsCount={boats.length}
            />

            <FooterSpacerSection />
        </Box>
    );
};

export default BoatListingPage;
