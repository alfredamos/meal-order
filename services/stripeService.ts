import { apiClient } from "./apiClient"

export class StripeService {
  baseUrl = "/create/payment-intent"
  async payment(amount: number){
    const response = await apiClient.post(this.baseUrl, amount);

     return response?.data;
  }
}

export const stripeService = new StripeService();