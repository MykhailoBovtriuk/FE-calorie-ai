import { apiClient } from "@/utils/apiClient";

export interface Product {
  id: number;
  code: string;
  productName: string;
  brands?: string;
  categories?: string;
  energyKcal100g?: number;
  fat100g?: number;
  carbohydrates100g?: number;
  proteins100g?: number;
  nutriscoreGrade?: string;
}

export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  return apiClient.get("/products/search", { params: { q: query, limit } }).then((r) => r.data);
}

export async function getProductByCode(code: string): Promise<Product> {
  return apiClient.get(`/products/${code}`).then((r) => r.data);
}
