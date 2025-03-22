import { Category } from './Category';

export interface BoatImage {
  id: number;
  image: string;
  is_main: boolean;
  caption: string;
}

export interface BoatVideo {
  id: number;
  title: string;
  video_url: string | null;
  video_file?: string | null;
  video_file_url?: string | null;
  thumbnail: string | null;
  is_main: boolean;
}

// Field interface for name/value pairs
export interface Field {
  name: string;
  value: string;
}

// New interfaces for amenities and technical details using Field objects
export interface Amenities {
  exterior?: string[];
  interior?: string[];
}

export interface TechnicalDetails {
  electricity_equipment?: Field[]; // ELECTRICITE / ANNEXE
  rigging_sails?: Field[];        // ACCASTILLAGE / VOILES
  electronics?: Field[];          // ELECTRONIQUE
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
  videos: BoatVideo[];
  location: string;
  amenities?: Amenities;
  technical_details?: TechnicalDetails;
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
  main_video?: string;
  location: string;
}
