export const paths = {
  root: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    emailConfirmation: '/auth/email-confirmation',
    resetPassword: '/auth/reset-password',
    forgotPassword: '/auth/forgot-password',
  },
  products: {
    categories: {
      list: '/categories',
      create: '/categories/new',
      edit: (id: string) => `/categories/${id}/edit`,
      single: (id: string) => `/categories/${id}`,
    },
    subCategories: '/sub-categories',
    brands: '/brands',
    products: '/products',
    offers: '/offers',
    tags: '/tags',
    labels: '/labels',
  },
};

export const pathAfterLogin = paths.products.categories.list;
