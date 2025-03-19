import { Category } from './Category';

export interface BoatImage {
  id: number;
  image: string;
  is_main: boolean;
  caption: string;
}

export interface Boat {
  id: number;
  title: string;
  category: number;
  category_detail?: Category;
  description: string;
  price: number;
  length?: number;
  width?: number;
  year_built?: number;
  engine_power?: string;
  fuel_type?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  images: BoatImage[];
}

// For list views where we might have less data
export interface BoatSummary {
  id: number;
  title: string;
  category: number;
  category_detail?: Category;
  price: number;
  year_built?: number;
  main_image?: string;
}
