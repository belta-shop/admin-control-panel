'use client';

import { useState } from 'react';

import { OTPPurpose } from '@/lib/types/auth';

import AuthOtp from '../auth-otp';
import NewPassword from '../new-password';
import VerifyPassword from '../verify-password';

export default function ResetPasswordView() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <VerifyPassword onSuccess={() => setCurrentStep(1)} />,
    <AuthOtp
      purpose={OTPPurpose.ResetPassword}
      onSuccess={() => setCurrentStep(2)}
      sendInitialOtp={true}
    />,
    <NewPassword onSuccess={() => {}} />,
  ];

  return steps[currentStep];
}
