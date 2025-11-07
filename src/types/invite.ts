export interface InvitePayload {
  email: string;
  name: string;
  last_name: string;
  phone: string;
}

export interface Invite {
  id: number;
  email: string;
  name: string;
  last_name: string;
  phone: string;
  invite_token: string;
}

export interface InviteData {
  invite: Invite;
}

export interface InviteResponse {
  message: string;
  status: boolean;
  data: InviteData;
}
export interface InviteCheckResponse {
  message: string;
  status: boolean;
  data: Invite;
}
