import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shachu - AI 사주 플랫폼',
  description: '나를 이해하는 AI 사주 분석',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-[#08090D] text-white antialiased">{children}</body>
    </html>
  );
}
