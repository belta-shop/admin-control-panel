export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh-token',
    sendOtp: '/auth/send-otp',
    verifyOtp: '/auth/verify-otp',
    sendGuestOtp: '/auth/send-guest-otp',
    verifyGuestOtp: '/auth/verify-guest-otp',
    resetPassword: '/auth/reset-password',
  },
  upload: {
    single: '/upload/single',
    multiple: '/upload/multiple',
  },
  categories: {
    list: '/categories/staff',
    create: '/categories/staff',
    single: (id: string) => `/categories/staff/${id}`,
    delete: (id: string) => `/categories/staff/${id}`,
    patch: (id: string) => `/categories/staff/${id}`,
  },
};
