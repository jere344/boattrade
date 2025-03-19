import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { SellRequest } from '../../models/SellRequest';
import api from '../../services/api';

const SellMyBoatPage: React.FC = () => {
  const [formData, setFormData] = useState<SellRequest>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    boat_details: '',
    comment: '',
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
      const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
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
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        boat_details: '',
        comment: '',
      });
      setImages([]);
      setImagePreviewUrls([]);
    } catch (err) {
      setError('Failed to submit your request. Please try again later.');
      console.error('Error submitting sell request:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sell Your Boat
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Fill out the form below to list your boat for sale. We'll contact you soon!
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your request has been submitted successfully! We'll get back to you soon.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number (optional)"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Boat Details"
                name="boat_details"
                multiline
                rows={4}
                placeholder="Please describe your boat (year, make, model, length, engine, etc.)"
                value={formData.boat_details}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Comments (optional)"
                name="comment"
                multiline
                rows={2}
                value={formData.comment}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ mr: 2 }}
                disabled={loading}
              >
                Upload Boat Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </Button>
              <Typography variant="body2" component="span" color="textSecondary">
                {images.length} {images.length === 1 ? 'file' : 'files'} selected
              </Typography>
            </Grid>

            {imagePreviewUrls.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {imagePreviewUrls.map((url, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        position: 'relative',
                        width: 100, 
                        height: 100 
                      }}
                    >
                      <img 
                        src={url} 
                        alt={`Boat preview ${index + 1}`} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }} 
                      />
                      <IconButton
                        size="small"
                        sx={{ 
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: 'rgba(255,255,255,0.7)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                        }}
                        onClick={() => handleRemoveImage(index)}
                        disabled={loading}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading || success}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SellMyBoatPage;
