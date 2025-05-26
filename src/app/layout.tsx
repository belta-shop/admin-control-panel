import React from 'react';

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'Starter Pack - MUI ',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x6', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x12', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x67', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function RootLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {auth}
      </body>
    </html>
  );
}
