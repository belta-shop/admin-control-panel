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
    subCategories: {
      list: '/sub-categories',
      create: '/sub-categories/new',
      edit: (id: string) => `/sub-categories/${id}/edit`,
      single: (id: string) => `/sub-categories/${id}`,
    },
    brands: {
      list: '/brands',
      create: '/brands/new',
      edit: (id: string) => `/brands/${id}/edit`,
      single: (id: string) => `/brands/${id}`,
    },
    products: {
      list: '/products',
      create: '/products/new',
      edit: (id: string) => `/products/${id}/edit`,
      single: (id: string) => `/products/${id}`,
    },
    offers: {
      list: '/offers',
      create: '/offers/new',
      edit: (id: string) => `/offers/${id}/edit`,
      single: (id: string) => `/offers/${id}`,
    },
    tags: {
      list: '/tags',
      create: '/tags/new',
      edit: (id: string) => `/tags/${id}/edit`,
      single: (id: string) => `/tags/${id}`,
    },
    labels: {
      list: '/labels',
      create: '/labels/new',
      edit: (id: string) => `/labels/${id}/edit`,
      single: (id: string) => `/labels/${id}`,
    },
  },
};

export const pathAfterLogin = paths.products.categories.list;
