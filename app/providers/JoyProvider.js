'use client';

import { CssVarsProvider } from '@mui/joy/styles';
import { nudgeBudgeTheme } from '../styles/theme';

export default function JoyProvider({ children }) {
  return <CssVarsProvider theme={nudgeBudgeTheme}>{children}</CssVarsProvider>;
}
