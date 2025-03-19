import React, { useEffect, useState } from "react";
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
    const [filters, setFilters] = useState({
        category: "",
        search: "",
        minPrice: 0,
        maxPrice: 1000000,
    });
    
    // Load boats data with filters
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
                    category: filters.category || undefined
                };
                
                const boatsData = await api.getBoats(queryParams);
                setBoats(boatsData);
                setError(null);
            } catch (err) {
                setError('Failed to load data.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [filters]);

    // Handle filter changes
    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({...prev, ...newFilters}));
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

            {loading && <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}><CircularProgress /></Box>}

            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

            {!loading && boats.length === 0 && (
                <Alert severity="info" sx={{ my: 2 }}>No boats found. Try adjusting your filters.</Alert>
            )}

            {!loading && boats.length > 0 && (
                <>
                    <Grid container spacing={3}>
                        {boats.map((boat: BoatSummary) => (
                            <Grid key={boat.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <BoatCard boat={boat} formatPrice={formatPrice} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default BoatListingPage;
