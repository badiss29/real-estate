export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // sq ft
  type: 'Villa' | 'Apartment' | 'House' | 'Penthouse' | 'Beach House' | 'Condo';
  status: 'For Sale' | 'For Rent';
  yearBuilt: number;
  images: string[];
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  isFeatured: boolean;
  createdAt: string;
}

export interface FilterState {
  city: string;
  minPrice: number;
  maxPrice: number;
  minRooms: number;
  maxRooms: number;
  type: string;
  status: string;
  searchQuery: string;
}
