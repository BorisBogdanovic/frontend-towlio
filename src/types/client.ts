export interface CarBrand {
  id: number;
  name: string;
}

export interface CarModel {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface SalesPerson {
  id: number;
  name: string;
  last_name: string;
  email: string;
  profile_image_path: string;
}

export type Client = {
  id: number;
  client_name: string;
  client_last_name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  car_brand: CarBrand;
  car_model: CarModel;
  production_year: string;
  licence_plate: string;
  vin: string;
  start_date: string;
  expired_date: string;
  status: boolean;
  service: Service;
  sales_person: SalesPerson;
};

export type Meta = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
};

export type GetClientsResponse = {
  status: boolean;
  message: string;
  data: Client[];
  meta: Meta | null;
};
