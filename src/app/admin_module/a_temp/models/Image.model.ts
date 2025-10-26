export interface Image {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  data: number[];
  base64?: string | null;
}
