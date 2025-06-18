export const paths = {
  root: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    emailConfirmation: '/auth/email-confirmation',
    resetPassword: '/auth/reset-password',
  },
  products: {
    categories: {
      list: '/categories',
      create: '/categories/create',
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

export const pathAfterLogin = paths.root;
