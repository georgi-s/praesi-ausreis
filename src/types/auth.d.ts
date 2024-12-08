export interface SignOutResponse {
  success: boolean;
  error?: {
    message: string;
    details: string;
  };
}
