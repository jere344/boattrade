import React, { useEffect, useState, useRef, useMemo } from "react";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    InputAdornment,
    Container,
    useTheme,
    alpha,
    Tooltip,
    IconButton,
    Fade,
    Chip,
    Avatar,
    Card,
    CardActionArea,
    Collapse,
    Slider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { BoatSummary } from "@models/Boat";
import api from "@services/api";
import { Category } from "@models/Category";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import SailingIcon from "@mui/icons-material/Sailing";
import ClearIcon from "@mui/icons-material/Clear";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { motion } from "framer-motion";

// Import section components
import BoatListingHeroSection from "./BoatListingHeroSection";
import BoatResultsSection from "./BoatResultsSection";
import LoadMoreSection from "./LoadMoreSection";
import FooterSpacerSection from "@components/home/FooterSpacerSection";

const MotionPaper = motion.create(Paper);
const MotionCard = motion.create(Card);

// Format price for display
const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
    }).format(price);
};

const BoatListingPage: React.FC = () => {
    const theme = useTheme();
    const [allBoats, setAllBoats] = useState<BoatSummary[]>([]);
    const [filteredBoats, setFilteredBoats] = useState<BoatSummary[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [showCategories, setShowCategories] = useState(true);
    const [isFilterChange, setIsFilterChange] = useState(false);

    // Filter state - simplified to a single state
    const [filters, setFilters] = useState({
        category: "",
        search: "",
        minPrice: 0,
        maxPrice: 200000,
    });

    // Maximum price limit constant
    const maxPriceLimit = 200000;

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

                // Check URL for category parameter
                const params = new URLSearchParams(window.location.search);
                const categoryParam = params.get("category");

                if (categoryParam && categoryParam !== filters.category.toString()) {
                    const categoryId = parseInt(categoryParam, 10);
                    // Verify this is a valid category ID
                    if (!isNaN(categoryId) && categoriesData.some((cat) => cat.id === categoryId)) {
                        setFilters((prev) => ({ ...prev, category: categoryId }));

                        // Remove it from the URL after applying the filter
                        params.delete("category");
                        window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
                    }
                }
            } catch (err) {
                console.error("Error fetching initial data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Handle filter changes - simplified
    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters((prev) => {
            const updated = { ...prev, ...newFilters };

            // Validate price filters
            if (updated.minPrice < 0) updated.minPrice = 0;
            if (updated.maxPrice < 0) updated.maxPrice = 0;

            // Ensure minPrice <= maxPrice
            if (updated.minPrice > updated.maxPrice) {
                updated.minPrice = updated.maxPrice;
            }

            return updated;
        });
    };

    // Handle reset filters - simplified
    const handleResetFilters = () => {
        setFilters({
            category: "",
            search: "",
            minPrice: 0,
            maxPrice: maxPriceLimit,
        });
    };

    // UI event handlers - simplified
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFilterChange({ search: event.target.value });
    };

    const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
        const [newMin, newMax] = newValue as number[];
        handleFilterChange({ minPrice: newMin, maxPrice: newMax });
    };

    const clearSearch = () => {
        handleFilterChange({ search: "" });
    };

    const valueLabelFormat = (value: number) => {
        return formatPrice(value);
    };

    // Apply filters when filters change
    useEffect(() => {
        if (initialLoading) return;

        setLoading(true);
        setIsFilterChange(true);

        // Apply filtering logic client-side
        const result = allBoats.filter((boat) => {
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

            if (filters.maxPrice < maxPriceLimit && boat.price > filters.maxPrice) {
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
            setLoading(false);
        }, 300);
    }, [filters, allBoats, initialLoading]);

    // Observe when user scrolls to load more boats
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filteredBoats.length && !loading) {
                    // Show 5 more boats when scrolling down (with a small delay for UX)
                    setTimeout(() => {
                        setVisibleCount((prev) => Math.min(prev + 5, filteredBoats.length));
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
    const visibleBoats = useMemo(() => filteredBoats.slice(0, visibleCount), [filteredBoats, visibleCount]);

    const hasMoreToShow = visibleCount < filteredBoats.length;

    // Calculate if any filters are applied
    const isFiltered = filters.category !== "" || filters.search !== "" || filters.minPrice > 0 || filters.maxPrice < maxPriceLimit;

    // Get the selected category name for the filter chip
    const selectedCategory = categories.find((cat) => cat.id === filters.category)?.name;

    // Create meta description based on available data
    const metaDescription = `Découvrez notre sélection de ${filteredBoats.length} bateaux à vendre. Des voiliers aux bateaux à moteur, trouvez l'embarcation de vos rêves chez BoatTrade Consulting.`;

    // Get category names for keywords
    const categoryNames = categories.map((cat) => cat.name).join(", ");

    return (
        <Box sx={{ background: "linear-gradient(180deg, #f7f9fc 0%, white 100%)" }}>
            {/* Meta Tags for SEO */}
            <title>Bateaux à Vendre | Annonces de Bateaux | BoatTrade Consulting</title>
            <meta name="title" content="Bateaux à Vendre | Annonces de Bateaux | BoatTrade Consulting" />
            <meta name="description" content={metaDescription} />
            <meta
                name="keywords"
                content={`bateaux à vendre, annonces bateaux, vente bateau, ${categoryNames}, occasion, neuf, BoatTrade Consulting`}
            />

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

            {/* Filters Section - integrated directly into this component */}
            <Container maxWidth="lg" sx={{ mb: 2 }}>
                <Container maxWidth="xl" sx={{ mt: -6, position: "relative", zIndex: 3 }}>
                    <MotionPaper
                        elevation={6}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            background: "linear-gradient(to right, rgba(255,255,255,0.98), rgba(255,255,255,0.95))",
                            backdropFilter: "blur(10px)",
                            boxShadow: `0 10px 40px -10px ${alpha(theme.palette.primary.dark, 0.3)}`,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            overflow: "visible",
                            position: "relative",
                        }}
                    >
                        {/* Decorative element */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: -15,
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "linear-gradient(135deg, #071B2F 0%, #134074 100%)",
                                px: 3,
                                py: 0.8,
                                borderRadius: 4,
                                color: "white",
                                zIndex: 2,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <TuneIcon fontSize="small" />
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Filtres de recherche
                                </Typography>
                            </Box>
                        </Box>

                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* Search, Price Filters, and Reset Button Row */}
                            <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Recherche"
                                        value={filters.search}
                                        onChange={handleSearchChange}
                                        disabled={initialLoading}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" sx={{ color: "primary.main" }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: filters.search ? (
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="clear search" onClick={clearSearch} edge="end" size="small">
                                                        <ClearIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : null,
                                        }}
                                        sx={{
                                            borderRadius: 1.5,
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 1.5,
                                                "& fieldset": {
                                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ px: 2, py: 1 }}>
                                        <Typography
                                            id="price-range-slider"
                                            gutterBottom
                                            variant="body2"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 1,
                                            }}
                                        >
                                            <span>Fourchette de prix:</span>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    color: "primary.main",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <span>{formatPrice(filters.minPrice)}</span> -
                                                <span>{filters.maxPrice === maxPriceLimit ? "Max" : formatPrice(filters.maxPrice)}</span>
                                            </Box>
                                        </Typography>
                                        <Slider
                                            value={[filters.minPrice, filters.maxPrice]}
                                            onChange={handlePriceRangeChange}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={valueLabelFormat}
                                            min={0}
                                            max={maxPriceLimit}
                                            step={1000}
                                            sx={{
                                                color: "primary.main",
                                                "& .MuiSlider-valueLabel": {
                                                    backgroundColor: theme.palette.primary.main,
                                                },
                                            }}
                                            aria-labelledby="price-range-slider"
                                        />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 2 }}>
                                    <Tooltip title={isFiltered ? "Réinitialiser tous les filtres" : "Aucun filtre appliqué"}>
                                        <span>
                                            <Button
                                                variant="contained"
                                                onClick={handleResetFilters}
                                                disabled={loading || initialLoading || !isFiltered}
                                                fullWidth
                                                sx={{
                                                    borderRadius: 1.5,
                                                    background: isFiltered
                                                        ? "linear-gradient(135deg, #071B2F 0%, #134074 100%)"
                                                        : "rgba(0,0,0,0.05)",
                                                    boxShadow: isFiltered ? "0 4px 10px rgba(19, 64, 116, 0.3)" : "none",
                                                    py: 1,
                                                    color: isFiltered ? "white" : "text.secondary",
                                                }}
                                            >
                                                Réinitialiser
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </Grid>
                            </Grid>

                            {/* Category Grid Section */}
                            <Box
                                sx={{
                                    borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    pt: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 1.5,
                                        width: "100%",
                                        maxWidth: "md",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: "primary.main",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <CategoryIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                                        Catégories
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => setShowCategories(!showCategories)}
                                        sx={{ color: "primary.main" }}
                                    >
                                        {showCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </Box>

                                <Collapse in={showCategories} sx={{ width: "100%", maxWidth: "md" }}>
                                    <Grid container spacing={1} justifyContent="center">
                                        {/* All Categories Option */}
                                        <Grid size={{ xs: 2.4, sm: 2, md: 1.5 }}>
                                            <MotionCard
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                whileTap={{ scale: 0.98 }}
                                                sx={{
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                    border:
                                                        filters.category === ""
                                                            ? `2px solid ${theme.palette.primary.main}`
                                                            : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                                    boxShadow:
                                                        filters.category === ""
                                                            ? `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`
                                                            : "0 2px 8px rgba(0,0,0,0.05)",
                                                }}
                                            >
                                                <CardActionArea
                                                    onClick={() => handleFilterChange({ category: "" })}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        p: 1.5,
                                                        height: "100%",
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 50,
                                                            height: 50,
                                                            mb: 1,
                                                            bgcolor: filters.category === "" ? "primary.main" : "action.selected",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <SailingIcon />
                                                    </Avatar>
                                                    <Typography
                                                        variant="body2"
                                                        align="center"
                                                        sx={{
                                                            fontWeight: filters.category === "" ? 600 : 400,
                                                            color: filters.category === "" ? "primary.main" : "text.primary",
                                                        }}
                                                    >
                                                        Toutes
                                                    </Typography>
                                                </CardActionArea>
                                            </MotionCard>
                                        </Grid>

                                        {/* Individual Category Cards */}
                                        {categories.map((category) => (
                                            <Grid key={category.id} size={{ xs: 2.4, sm: 2, md: 1.5 }}>
                                                <MotionCard
                                                    whileHover={{ scale: 1.05, y: -5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    sx={{
                                                        borderRadius: 2,
                                                        overflow: "hidden",
                                                        border:
                                                            filters.category === category.id
                                                                ? `2px solid ${theme.palette.primary.main}`
                                                                : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                                        boxShadow:
                                                            filters.category === category.id
                                                                ? `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`
                                                                : "0 2px 8px rgba(0,0,0,0.05)",
                                                    }}
                                                >
                                                    <CardActionArea
                                                        onClick={() => handleFilterChange({ category: category.id })}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            p: 1.5,
                                                            height: "100%",
                                                        }}
                                                    >
                                                        <Avatar
                                                            src={category.image}
                                                            alt={category.name}
                                                            variant="rounded"
                                                            sx={{
                                                                width: 50,
                                                                height: 50,
                                                                mb: 1,
                                                                border:
                                                                    filters.category === category.id
                                                                        ? `2px solid ${theme.palette.primary.main}`
                                                                        : "none",
                                                                boxShadow:
                                                                    filters.category === category.id
                                                                        ? `0 3px 10px ${alpha(theme.palette.primary.main, 0.3)}`
                                                                        : "none",
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            align="center"
                                                            sx={{
                                                                fontWeight: filters.category === category.id ? 600 : 400,
                                                                color: filters.category === category.id ? "primary.main" : "text.primary",
                                                            }}
                                                        >
                                                            {category.name}
                                                        </Typography>
                                                    </CardActionArea>
                                                </MotionCard>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Collapse>
                            </Box>
                        </form>

                        {/* Active filters display */}
                        {isFiltered && (
                            <Fade in={true}>
                                <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
                                    <Typography variant="body2" sx={{ mr: 1, display: "inline-block", color: "text.secondary" }}>
                                        Filtres actifs:
                                    </Typography>

                                    {selectedCategory && (
                                        <Chip
                                            label={`Catégorie: ${selectedCategory}`}
                                            size="small"
                                            onDelete={() => handleFilterChange({ category: "" })}
                                            sx={{ m: 0.5 }}
                                        />
                                    )}

                                    {filters.search && (
                                        <Chip
                                            label={`Recherche: "${filters.search}"`}
                                            size="small"
                                            onDelete={() => handleFilterChange({ search: "" })}
                                            sx={{ m: 0.5 }}
                                        />
                                    )}

                                    {filters.minPrice > 0 && (
                                        <Chip
                                            label={`Prix min: ${formatPrice(filters.minPrice)}`}
                                            size="small"
                                            onDelete={() => handleFilterChange({ minPrice: 0 })}
                                            sx={{ m: 0.5 }}
                                        />
                                    )}

                                    {filters.maxPrice < maxPriceLimit && (
                                        <Chip
                                            label={`Prix max: ${formatPrice(filters.maxPrice)}`}
                                            size="small"
                                            onDelete={() => handleFilterChange({ maxPrice: maxPriceLimit })}
                                            sx={{ m: 0.5 }}
                                        />
                                    )}
                                </Box>
                            </Fade>
                        )}
                    </MotionPaper>
                </Container>
            </Container>

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
