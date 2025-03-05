export const adminRoutes = [
  '/admin/pizzas/new',
  '/admin/pizzas/list',
  '/admin/orders/all-orders',
  '/admin/orders/delivered-orders',
  '/admin/orders/shipped-orders',
  '/admin/orders/pending-orders',
  '/admin/users',
  '/admin/users/:id',
  '/admin/pizza/:id'
]

export const isAdminRoute = (route: string) => adminRoutes.includes(route)