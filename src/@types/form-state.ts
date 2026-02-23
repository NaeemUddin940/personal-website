export interface FormState {
  success: boolean;
  action?: string;
  message: string | null;
  data?: any;
  errors?: Record<string, string[]> | null; // ফিল্ড লেভেল এররের জন্য
  inputs?: any; // আগের ইনপুটগুলো ধরে রাখার জন্য (যাতে ফর্ম রিসেট না হয়)
}
