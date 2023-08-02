// styles
import './globals.css';
import { nudgeBudgeTheme } from './styles/theme';
import { CssVarsProvider } from '@mui/joy/styles';
import { Public_Sans } from 'next/font/google';

// components
import { Suspense } from 'react';
import Header from './components/header';
import LoadingProvider from './loading-provider';
import Loading from './loading';

const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'NudgeBudge',
  description: 'A dynamic budgeting system for the modern age.',
};

export default async function RootLayout({ children }) {
  return (
    <CssVarsProvider
      theme={nudgeBudgeTheme}
      defaultMode='dark'>
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
    </CssVarsProvider>
  );
}
