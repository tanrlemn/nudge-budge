'use client';

import { extendTheme } from '@mui/joy/styles';

export const nudgeBudgeTheme = extendTheme({
  spacing: (factor) => `${0.25 * factor}rem`,
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'SF Pro Text, var(--gh-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: '6px',
          boxShadow: '0 1px 0 0 rgba(27, 31, 35, 0.04)',
          transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
          transitionProperty: 'color,background-color,box-shadow,border-color',
          ...(ownerState.size === 'md' && {
            fontWeight: 600,
            minHeight: '32px',
            fontSize: '14px',
            '--Button-paddingInline': '1rem',
          }),
          ...(ownerState.color === 'success' &&
            ownerState.variant === 'solid' && {
              '--gh-palette-focusVisible': 'rgba(46, 164, 79, 0.4)',
              border: '1px solid rgba(27, 31, 36, 0.15)',
              '&:active': {
                boxShadow: 'inset 0px 1px 0px rgba(20, 70, 32, 0.2)',
              },
            }),
          ...(ownerState.color === 'neutral' &&
            ownerState.variant === 'outlined' && {
              '&:active': {
                boxShadow: 'none',
              },
            }),
        }),
      },
    },
  },
});
