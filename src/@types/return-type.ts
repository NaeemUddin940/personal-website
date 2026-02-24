export interface ReturnType<T = unknown> {
  success: boolean;
  action?: string;
  message?: string;
  status?: number;
  data?: T;
  errors?: T;
  inputs?: T;
}
