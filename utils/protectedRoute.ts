export const protectedRoute = [
  '/protected/orders/my-orders',
  '/protected/auth/change-password',
  '/protected/auth/edit-profile',
  '/protected/auth/logout',
  '/protected/pizzas/:id'

];

export const isProtectedRoute = (route: string) => protectedRoute.includes(route);