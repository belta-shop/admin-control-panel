export const paths = {
  root: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    emailConfirmation: '/auth/email-confirmation',
    resetPassword: '/auth/reset-password',
  },
  products: {
    categories: '/categories',
    subCategories: '/sub-categories',
    brands: '/brands',
    products: '/products',
    offers: '/offers',
    tags: '/tags',
    labels: '/labels',
  },
};

export const pathAfterLogin = paths.root;
