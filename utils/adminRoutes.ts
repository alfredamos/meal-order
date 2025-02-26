const adminRoutes = [
  '/pizzas/new',
  '/pizzas/list',
  '/orders/all-orders',
  '/orders/delivered-orders',
  '/orders/shipped-orders',
  '/orders/pending-orders',
  '/users',
  '/users/:id*',
]

export const isAdminRoute = (route: string) => adminRoutes.includes(route)