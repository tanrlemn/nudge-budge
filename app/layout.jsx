// styles
import './globals.css';
import { Public_Sans } from 'next/font/google';
import JoyProvider from './providers/JoyProvider';

// components
import { Suspense } from 'react';
import Header from './components/header';
import LoadingProvider from './providers/LoadingProvider';
import Loading from './loading';

const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'NudgeBudge',
  description: 'A dynamic budgeting system for the modern age.',
};

export default async function RootLayout({ children }) {
  return (
    <JoyProvider>
      <html lang='en'>
        <body className={publicSans.className}>
          <Suspense fallback={<Loading />}>
            <Header />
            <div style={{ marginTop: '4rem' }}>
              <LoadingProvider>{children}</LoadingProvider>
            </div>
          </Suspense>
        </body>
      </html>
    </JoyProvider>
  );
}
