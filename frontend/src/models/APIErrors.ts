interface APIError {
  status?: number;
  data?: {
    error?: string;
    [key: string]: unknown; // Allows other possible fields
  };
}

interface APIResponse<T = unknown> {
  data?: T;
  error?: APIError;
}

export type { APIError, APIResponse };
