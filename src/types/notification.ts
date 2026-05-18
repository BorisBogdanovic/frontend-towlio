export interface BackendNotification {
  id: string;
  type?: string;
  title?: string;
  message: string;
  created_at: string;
  read_at: string | null;
  sender?: {
    id?: string;
    name?: string;
    avatar?: string | null;
  };
}

export interface MarkAsReadResponse {
  status: boolean;
  message: string;
}

export interface MarkAllAsReadResponse {
  status: boolean;
  message: string;
}
