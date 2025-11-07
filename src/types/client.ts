export interface CreateClientData {
  client_name: string;
  client_last_name: string;
  address: string;
  email: string;
  car_brand_id: number;
  car_model_id: number;
  licence_plate: string;
  vin: string;
  start_date: string;
  expired_date: string;
  status: boolean;
  towlio_service_id: number;
  sales_person_id: number;
  phone: string;
  city: string;
  country: string;
  production_year: number;
}
