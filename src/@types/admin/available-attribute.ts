export interface AvailableAttribute {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "boolean";
  description: string;
  options?: string[];
}
