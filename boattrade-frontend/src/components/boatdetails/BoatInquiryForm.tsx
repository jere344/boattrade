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
    phone: '',
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
        phone: formData.phone,
        comment: formData.comment
      });
      
      setSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
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
      <DialogTitle>Je suis intéressé par ce bateau
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="subtitle1" color="text.secondary">
          {boat.title}
        </Typography>
        {success ? (
          <Alert severity="success" sx={{ my: 2 }}>
            Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TextField
              label="Prénom"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            
            <TextField
              label="Nom"
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
              label="Téléphone (facultatif)"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            
            <TextField
              label="Commentaire"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
              margin="normal"
              placeholder="Je voudrais plus d'informations sur ce bateau..."
            />
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="inherit">Annuler</Button>
        {!success && (
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Envoyer la demande"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BoatInquiryForm;
