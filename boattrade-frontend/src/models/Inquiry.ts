export interface Inquiry {
  boat: number;
  first_name: string;
  last_name: string;
  email: string;
  comment: string;
}

export interface InquiryResponse {
  id: number;
  boat: number;
  first_name: string;
  last_name: string;
  email: string;
  comment: string;
  created_at: string;
  is_processed: boolean;
}
