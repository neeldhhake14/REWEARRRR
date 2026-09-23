export type FashionMode = 'all' | 'rent' | 'resale' | 'donate';

export type FashionCategory = 
  | 'all'
  | 'outerwear'
  | 'dresses'
  | 'tailoring'
  | 'knitwear'
  | 'linen';

export interface FashionItem {
  id: string;
  title: string;
  brand: string;
  category: 'outerwear' | 'dresses' | 'tailoring' | 'knitwear' | 'linen';
  mode: 'rent' | 'resale' | 'donate';
  price: number; // Resale price or 0 if donation
  rentalPrice4Day?: number; // 4-day rental price
  originalRetail: number;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'OS';
  material: string;
  condition: 'Pristine / NWT' | 'Excellent Pre-Loved' | 'Very Good' | 'Curated Vintage';
  color: string;
  colorHex: string;
  image: string;
  ecoSavings: {
    waterSavedLiters: number;
    co2AvoidedKg: number;
    wasteDivertedKg: number;
  };
  description: string;
  provenance: string;
  donationPartner?: string;
  styleVibe: 'minimalist' | 'tailored' | 'relaxed' | 'vintage';
}

export interface CartItem {
  item: FashionItem;
  mode: 'rent' | 'resale' | 'donate';
  rentalDays?: 4 | 8 | 14;
  rentalStartDate?: string;
}

export interface ListingFormData {
  type: 'rent' | 'resale' | 'donate';
  title: string;
  brand: string;
  category: string;
  size: string;
  condition: string;
  material: string;
  originalRetail: string;
  resalePrice: string;
  rentalPrice4Day: string;
  donationCause: string;
  donorName: string;
  donorEmail: string;
  donorCity: string;
  pickupAddress: string;
  notes: string;
}
