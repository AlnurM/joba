export interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export interface QueueItem {
  resolve: (value: Response) => void;
  reject: (reason?: any) => void;
}
