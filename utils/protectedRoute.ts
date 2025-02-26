const protectedRoute = [
  '/orders/my-orders',
  '/auth/change-password',
  '/auth/edit-profile',
  '/auth/logout',

];

export const isProtectedRoute = (route: string) => protectedRoute.includes(route);