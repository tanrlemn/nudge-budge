// styles
import './globals.css';
import { githubTheme } from './styles/theme';
import { CssVarsProvider } from '@mui/joy/styles';
import { Public_Sans } from 'next/font/google';

// components
import Header from './components/header';

const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'NudgeBudge',
  description: 'A dynamic budgeting system for the modern age.',
};

export default async function RootLayout({ children }) {
  return (
    <CssVarsProvider
      theme={githubTheme}
      defaultMode='dark'>
      <html lang='en'>
        <body className={publicSans.className}>
          <Header />
          {children}
        </body>
      </html>
    </CssVarsProvider>
  );
}
