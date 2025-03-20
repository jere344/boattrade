import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { BoatSummary } from "@models/Boat";
import BoatCard from "./BoatCard";
import api from "@services/api";
import { Category } from "@models/Category";
import BoatFilters from "./BoatFilters";

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
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Boat Listings
            </Typography>

            <BoatFilters
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                loading={loading}
                formatPrice={formatPrice}
                maxPriceLimit={1000000}
            />

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ my: 2 }}>
                    {error}
                </Alert>
            )}

            {!loading && boats.length === 0 && (
                <Alert severity="info" sx={{ my: 2 }}>
                    No boats found. Try adjusting your filters.
                </Alert>
            )}

            {boats.length > 0 && (
                <>
                    <Grid container spacing={3}>
                        {visibleBoats.map((boat: BoatSummary) => (
                            <Grid key={boat.id} size={{ xs: 12, sm: 12, md: 12 }}>
                                <BoatCard boat={boat} formatPrice={formatPrice} variant="full" />
                            </Grid>
                        ))}
                    </Grid>
                    
                    {/* Intersection observer target for lazy loading */}
                    {hasMoreToShow && (
                        <div ref={loadMoreRef} style={{ height: "20px", margin: "20px 0" }}>
                            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                                <CircularProgress size={30} />
                            </Box>
                        </div>
                    )}
                    
                    {/* Message when all boats are visible */}
                    {!hasMoreToShow && boats.length > 0 && (
                        <Box sx={{ textAlign: "center", color: "text.secondary", my: 2 }}>
                            <Typography variant="body2">All boats loaded</Typography>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default BoatListingPage;
