import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Chatbot from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Campus Services - Your One-Stop Platform',
  description: 'Access all campus services in one place. Print documents, order food, and more with just a few clicks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Navbar />
        {children}
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}