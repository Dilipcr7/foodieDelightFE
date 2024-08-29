export interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  description: string;
  phoneNumber: string;
  email?: string;
  website?: string;
  open: boolean;
}
