import AuthLayout from '@/view/layout/auth';
import LoginView from '@/view/sections/auth/view/login-view';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginView />
    </AuthLayout>
  );
}
