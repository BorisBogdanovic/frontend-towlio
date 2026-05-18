export interface City {
  id: number;
  name: string;
}

export interface BaseUser {
  id: number;
  name: string;
  last_name: string;
  profile_image_path: string;
}

export interface User extends BaseUser {
  email: string;
  phone: string;
  status: string;
  city: City | null;
  is_admin: boolean;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
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

export interface UpdateUserResponse {
  status: boolean;
  message: string;
  data: User;
}

export interface UpdateUserAvatarResponse {
  status: boolean;
  message: string;
  data: User;
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

export interface UpdateUserPayload {
  name: string;
  last_name: string;
  phone: string;
  city_id: number | null;
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
