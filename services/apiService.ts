import { apiClient } from "./apiClient";

export class ApiService<T> {
  constructor(public baseUrl: string) {}

  async deleteData(id: string) {
    const url = `${this.baseUrl}/${id}`;

    const response = await apiClient.delete<T>(url);

    return response?.data;
  }

  async editData(id: string, resource: T) {
    const url = `${this.baseUrl}/${id}`;

    const response = await apiClient.patch<T>(url, resource);

    return response?.data;
  }
}
