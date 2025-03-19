export interface SellRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  boat_details: string;
  comment?: string;
}

export interface SellRequestImage {
  id: number;
  image: string;
}

export interface SellRequestResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  boat_details: string;
  comment: string;
  created_at: string;
  is_processed: boolean;
  images: SellRequestImage[];
}
