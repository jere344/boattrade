import { Category } from './Category';
import { Boat, BoatSummary } from './Boat';
import { InquiryResponse } from './Inquiry';
import { SellRequestResponse } from './SellRequest';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type BoatListResponse = PaginatedResponse<BoatSummary>;
export type BoatDetailResponse = Boat;
export type CategoryListResponse = PaginatedResponse<Category>;
export type InquirySubmitResponse = PaginatedResponse<InquiryResponse>;
export type SellRequestSubmitResponse = SellRequestResponse;
