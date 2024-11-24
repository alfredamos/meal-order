import { stripeService } from "@/services/stripeService";
import { useMutation } from "@tanstack/react-query";

export function useStripePayment(){
   const makePayment = (amount: number) => stripeService.payment(amount)
   return useMutation({
     mutationFn: makePayment,
   });
}