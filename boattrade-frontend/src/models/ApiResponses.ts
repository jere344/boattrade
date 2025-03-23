import { Category } from './Category';
import { Boat, BoatSummary } from './Boat';
import { InquiryResponse } from './Inquiry';
import { SellRequestResponse } from './SellRequest';
import { Testimonial } from './Testimonial';
import { BlogPost } from './BlogPost';

export type BoatListResponse = BoatSummary[];
export type BoatDetailResponse = Boat;
export type CategoryListResponse = Category[];
export type InquirySubmitResponse = InquiryResponse;
export type SellRequestSubmitResponse = SellRequestResponse;
export type TestimonialListResponse = Testimonial[];
export type BlogPostResponse = BlogPost[];
