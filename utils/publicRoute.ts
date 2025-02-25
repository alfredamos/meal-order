export const publicRoutes = ['/auth/login', '/auth/signup', '/pizzas', '/'];

export const isPublicRoutes = (route: string) => publicRoutes.includes(route)
