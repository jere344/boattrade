import { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Typography, Box, Alert, CircularProgress 
} from '@mui/material';
import { Boat } from '../../models/Boat';
import api from '../../services/api';

interface BoatInquiryFormProps {
  boat: Boat;
  open: boolean;
  onClose: () => void;
}

const BoatInquiryForm = ({ boat, open, onClose }: BoatInquiryFormProps) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.submitInquiry({
        boat: boat.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        comment: formData.comment
      });
      
      setSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        comment: ''
      });
      
      // Close the dialog after 2 seconds on success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setError('Failed to submit your inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>I'm interested in this boat
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="subtitle1" color="text.secondary">
          {boat.title}
        </Typography>
        {success ? (
          <Alert severity="success" sx={{ my: 2 }}>
            Your inquiry has been sent successfully! We'll contact you soon.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            
            <TextField
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
              margin="normal"
              placeholder="I'd like more information about this boat..."
            />
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        {!success && (
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Inquiry"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BoatInquiryForm;
