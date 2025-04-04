export interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
  rawResponse?: boolean;
}

export interface QueueItem<T = any> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}
