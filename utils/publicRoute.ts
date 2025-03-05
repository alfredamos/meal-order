export const publicRoutes = ['/open/auth/login', '/open/auth/signup', '/pizzas', '/'];

export const isPublicRoutes = (route: string) => publicRoutes.includes(route)
