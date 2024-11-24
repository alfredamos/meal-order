export function convertToSubCurrency(amount: number, factor = 100){
  return Math.floor(amount * factor);
}