'use client';

import { extendTheme } from '@mui/joy/styles';

const palette = {
  info: {
    solidBg: '#9426fb',
    solidBorder: '#9426fb', //main
    solidHoverBg: '#580e9c', // darker
    solidHoverBorder: '#580e9c',
    solidActiveBg: '#580e9c',
    solidActiveBorder: '#580e9c',
    solidDisabledBg: '#9426fb',
    solidDisabledBorder: '#9426fb',
    // btn-light
    softColor: '#17171b',
    softBg: '#c298e8',
    softBorder: '#c298e8',
    softHoverBg: '#b06aee',
    softHoverBorder: '#b06aee',
    softActiveBg: '#b06aee',
    softActiveBorder: '#b06aee',
    softDisabledBg: '#c298e8',
    softDisabledBorder: '#c298e8',
    500: '#9426fb',
  },
};

export const nudgeBudgeTheme = extendTheme({
  spacing: (factor) => `${0.25 * factor}rem`,
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },
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
