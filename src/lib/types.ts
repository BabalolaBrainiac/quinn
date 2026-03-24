export type ServiceType = "studio" | "home";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type QuoteStatus = "pending" | "quoted" | "accepted" | "rejected";

export type DesignCategory =
  | "geometric"
  | "floral"
  | "minimalist"
  | "tribal"
  | "abstract"
  | "blackwork"
  | "fine-line"
  | "watercolor";

export interface Design {
  id: string;
  title: string;
  category: DesignCategory;
  imageUrl: string;
  description: string;
  basePrice: number;
  estimatedHours: number;
  tags: string[];
  source?: "pinterest" | "instagram" | "original";
  featured?: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AvailableDay {
  date: string; // ISO date string
  slots: TimeSlot[];
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  designId?: string;
  designTitle: string;
  serviceType: ServiceType;
  date: string;
  time: string;
  placement: string;
  size: string;
  amount: number;
  status: BookingStatus;
  paystackRef?: string;
  notes?: string;
  createdAt: string;
}

export interface CustomDesignRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  description: string;
  placement: string;
  size: string;
  colorPreference: string;
  referenceImages?: string[];
  serviceType: ServiceType;
  status: QuoteStatus;
  quotedAmount?: number;
  artistNotes?: string;
  createdAt: string;
}

export interface BookingFormData {
  designId?: string;
  serviceType: ServiceType;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  placement: string;
  size: string;
  notes?: string;
}

export interface CustomDesignFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  description: string;
  placement: string;
  size: string;
  colorPreference: string;
  serviceType: ServiceType;
  referenceImages?: FileList;
}
