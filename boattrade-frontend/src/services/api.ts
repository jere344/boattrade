import axios from 'axios';
import { 
  BoatListResponse,
  BoatDetailResponse,
  CategoryListResponse,
  InquirySubmitResponse,
  SellRequestSubmitResponse,
  TestimonialListResponse
} from '@models/ApiResponses';
import { Inquiry } from '@models/Inquiry';
import { SellRequest } from '@models/SellRequest';

// Create a simple API client with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Define interface for boat query parameters
interface BoatQueryParams {
  page?: number;
  category?: number;
  search?: string;
  [key: string]: any;
}

// Simple API object with methods for each endpoint
const api = {
  // Boats
  getBoats: async (params: BoatQueryParams = {}): Promise<BoatListResponse> => {
    const response = await apiClient.get('/boats/', { params });
    return response.data;
  },
  
  getBoat: async (id: number): Promise<BoatDetailResponse> => {
    const response = await apiClient.get(`/boats/${id}/`);
    return response.data;
  },
  
  // Categories
  getCategories: async (): Promise<CategoryListResponse> => {
    const response = await apiClient.get('/categories/');
    return response.data;
  },
  
  // Inquiries
  submitInquiry: async (inquiryData: Inquiry): Promise<InquirySubmitResponse> => {
    const response = await apiClient.post('/inquiries/', inquiryData);
    return response.data;
  },

  // Testimonials
  getTestimonials: async (): Promise<TestimonialListResponse> => {
    const response = await apiClient.get('/testimonials/');
    return response.data;
  },
  
  // Sell requests
  submitSellRequest: async (sellRequestData: SellRequest, images: File[] = []): Promise<SellRequestSubmitResponse> => {
    if (images.length > 0) {
      const formData = new FormData();
      
      // Add sell request data
      Object.entries(sellRequestData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      
      // Add images
      images.forEach(image => {
        formData.append('images', image);
      });
      
      const response = await apiClient.post('/sell-requests/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    }
    
    const response = await apiClient.post('/sell-requests/', sellRequestData);
    return response.data;
  }
};

export default api;
