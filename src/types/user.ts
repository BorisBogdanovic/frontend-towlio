export interface City {
  id: number;
  name: string;
}
export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_image_path: string;
  status: string;
  city: City | null;
  is_admin: boolean;
}
export interface RegisterResponse {
  message: string;
  status: boolean;
  data: User;
}

export interface Filters {
  city?: number | null;
  status?: number | null;
  search?: string;
  page?: number;
}
export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    users: T[];
    pagination: Pagination;
  };
}
export interface DeleteUserResponse {
  status: boolean;
  message: string;
}
export interface DeactivateResponse {
  status: boolean;
  message: string;
}
export interface ActivateResponse {
  status: boolean;
  message: string;
}
export interface UpdatePasswordInput {
  current_password: string;
  password: string;
  password_confirmation: string;
}
export interface UpdatePasswordResponse {
  status: boolean;
  message: string;
}
export interface UpdateUserResponse {
  message: string;
  status: boolean;
  data: User;
}

export interface SettingsFormValues {
  name: string;
  last_name: string;
  phone: string;
  email: string;
  city_id: number | null;
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateUserAvatarResponse {
  status: boolean;
  message: string;
  data: User;
}
export interface UpdateUserPayload {
  name: string;
  last_name: string;
  phone: string;
  city_id: number | null;
}
