import { SvgIcon } from '@mui/joy';

export const LogoSvg = () => {
  const logoStyles = {
    fill: 'none',
    stroke: '#51bc51',
    strokeLinejoin: 'round',
    strokeWidth: '2px',
  };

  return (
    <SvgIcon
      id='logo'
      sx={{
        width: '100%',
      }}
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 708 122'>
      <path
        style={logoStyles}
        d='m10.79,93.12V11.93h16.23l37.06,53.73V11.93h16.4v81.19h-14.77L27.13,37.31v55.81H10.79Z'
      />
      <path
        style={logoStyles}
        d='m117.93,94.24c-2.7,0-5.34-.41-7.95-1.24s-4.97-2.04-7.1-3.65-3.85-3.59-5.14-5.95c-1.29-2.36-1.94-5.07-1.94-8.14v-40.2h16.39v38.07c0,2.7.88,4.9,2.64,6.63,1.76,1.72,4.34,2.58,7.75,2.58,3.22,0,5.77-.83,7.66-2.5,1.89-1.67,2.84-4,2.84-6.99v-37.79h16.23v58.06h-12.35l-1.91-11.51c-.67,3.41-1.94,6.02-3.79,7.83-1.85,1.82-3.97,3.07-6.34,3.76s-4.71,1.04-6.99,1.04Z'
      />
      <path
        style={logoStyles}
        d='m185.3,94.24c-7.79,0-13.85-2.69-18.19-8.06-4.34-5.37-6.51-12.85-6.51-22.43,0-6.06.88-11.32,2.64-15.78,1.76-4.45,4.36-7.91,7.8-10.36,3.44-2.45,7.65-3.68,12.63-3.68,2.1,0,4.05.23,5.87.7,1.82.47,3.47,1.11,4.97,1.94s2.81,1.78,3.93,2.86c1.12,1.09,2.04,2.25,2.75,3.48V9.68h16.45v83.44h-11.9l-1.85-11.9c-.56,1.61-1.3,3.18-2.22,4.72-.92,1.54-2.12,2.93-3.59,4.18-1.48,1.25-3.27,2.26-5.36,3s-4.57,1.12-7.41,1.12Zm3.59-11.79c4.12,0,7.2-1.44,9.24-4.32,2.04-2.88,3.06-7.75,3.06-14.6-.04-3.97-.5-7.26-1.4-9.88-.9-2.62-2.24-4.58-4.01-5.87-1.78-1.29-4.03-1.94-6.77-1.94-3.56,0-6.51,1.36-8.87,4.07s-3.54,7.25-3.54,13.62,1.1,11.25,3.31,14.32c2.21,3.07,5.2,4.6,8.98,4.6Z'
      />
      <path
        style={logoStyles}
        d='m258.24,112.32c-10.33,0-18.18-1.31-23.55-3.93-5.37-2.62-8.06-6.06-8.06-10.33,0-1.98.51-3.65,1.54-5,1.03-1.35,2.25-2.42,3.65-3.23,1.4-.8,2.7-1.42,3.87-1.85,1.18-.43,1.92-.72,2.22-.87-.6-.34-1.47-.83-2.61-1.49-1.14-.65-2.18-1.55-3.12-2.7-.94-1.14-1.4-2.61-1.4-4.41,0-2.1.98-4.02,2.95-5.78,1.96-1.76,4.93-2.96,8.9-3.59-3.82-1.83-6.72-4.29-8.7-7.36-1.98-3.07-2.98-6.21-2.98-9.43,0-3.82,1.2-7.09,3.59-9.83,2.39-2.73,5.67-4.81,9.83-6.23,4.15-1.42,8.85-2.13,14.09-2.13,3.97,0,7.23.42,9.8,1.26,2.56.84,4.93,1.94,7.1,3.28.86-.34,1.99-.78,3.4-1.32,1.4-.54,2.94-1.14,4.6-1.8,1.67-.65,3.28-1.31,4.86-1.96,1.57-.65,2.98-1.24,4.21-1.77l-.11,12.69-9.99,1.63c.37,1.01.67,2.1.9,3.26.22,1.16.34,2.12.34,2.86,0,3.37-.98,6.51-2.95,9.43-1.96,2.92-4.89,5.28-8.79,7.07-3.89,1.8-8.74,2.7-14.54,2.7-.67,0-1.61-.02-2.81-.06-1.2-.04-2.17-.09-2.92-.17-2.17.11-3.68.39-4.52.84-.84.45-1.26.97-1.26,1.57,0,.9.84,1.49,2.53,1.77,1.68.28,4.23.53,7.64.76,1.24.08,2.92.17,5.05.28,2.13.11,4.47.26,7.02.45,7.11.49,12.42,2.24,15.92,5.25,3.5,3.01,5.25,6.8,5.25,11.37,0,5.43-2.57,9.91-7.72,13.45-5.15,3.54-12.89,5.31-23.22,5.31Zm2.64-9.15c4.53,0,7.77-.56,9.71-1.68s2.92-2.73,2.92-4.83c0-1.76-.75-3.19-2.25-4.29s-3.67-1.75-6.51-1.94l-13.31-.84c-1.76-.11-3.29.13-4.6.73-1.31.6-2.33,1.42-3.06,2.47-.73,1.05-1.09,2.17-1.09,3.37,0,2.43,1.48,4.21,4.44,5.33,2.96,1.12,7.54,1.68,13.76,1.68Zm-3.09-40.82c3.11,0,5.6-.85,7.47-2.55,1.87-1.7,2.81-4.01,2.81-6.93s-.94-5.46-2.81-7.3c-1.87-1.83-4.36-2.75-7.47-2.75s-5.61.92-7.52,2.75-2.86,4.27-2.86,7.3.93,5.19,2.78,6.91c1.85,1.72,4.39,2.58,7.61,2.58Z'
      />
      <path
        style={logoStyles}
        d='m327.08,94.24c-5.77,0-10.83-1.21-15.19-3.62-4.36-2.41-7.76-5.83-10.19-10.25-2.43-4.42-3.65-9.62-3.65-15.61s1.11-11.03,3.34-15.69c2.23-4.66,5.44-8.35,9.63-11.06,4.19-2.71,9.26-4.07,15.22-4.07s10.87,1.25,14.88,3.73c4,2.49,7.04,5.95,9.1,10.39,2.06,4.44,3.09,9.56,3.09,15.36v4.44h-39.02c0,2.96.49,5.53,1.46,7.72.97,2.19,2.39,3.88,4.24,5.05,1.85,1.18,4.09,1.77,6.71,1.77,2.81,0,5.26-.6,7.36-1.8,2.1-1.2,3.56-3.16,4.38-5.9h14.82c-.67,4.12-2.32,7.64-4.94,10.56-2.62,2.92-5.8,5.15-9.54,6.68-3.74,1.53-7.64,2.3-11.68,2.3Zm-12.8-36.16h23.69c0-2.32-.44-4.44-1.32-6.37-.88-1.93-2.19-3.46-3.93-4.6-1.74-1.14-3.92-1.71-6.54-1.71s-4.65.61-6.43,1.83c-1.78,1.22-3.14,2.8-4.1,4.74-.95,1.95-1.41,3.99-1.38,6.12Z'
      />
      <path
        style={logoStyles}
        d='m365.65,93.12V11.93h29.42c10.63,0,18.52,1.82,23.67,5.47,5.15,3.65,7.72,8.94,7.72,15.86,0,4.01-1.03,7.5-3.09,10.47-2.06,2.98-5.73,5.57-11,7.78,3.41.86,6.16,2.02,8.25,3.48,2.1,1.46,3.71,3.08,4.83,4.86,1.12,1.78,1.89,3.63,2.3,5.56.41,1.93.62,3.83.62,5.7,0,7.49-2.55,13.03-7.64,16.62-5.09,3.59-13.2,5.39-24.31,5.39h-30.77Zm16.34-47.61h15.67c1.68,0,3.3-.2,4.86-.59,1.55-.39,2.94-1,4.16-1.83,1.22-.82,2.18-1.88,2.89-3.17.71-1.29,1.07-2.82,1.07-4.58,0-3.52-1.32-6.19-3.96-8-2.64-1.81-6.02-2.72-10.13-2.72h-14.54v20.89Zm0,34.92h14.77c4.9,0,8.63-.99,11.17-2.98,2.54-1.98,3.82-4.64,3.82-7.97,0-2.39-.62-4.41-1.85-6.04-1.24-1.63-2.91-2.85-5.03-3.68-2.12-.82-4.52-1.24-7.21-1.24h-15.67v21.9Z'
      />
      <path
        style={logoStyles}
        d='m461.83,94.24c-2.7,0-5.34-.41-7.95-1.24s-4.97-2.04-7.1-3.65-3.85-3.59-5.14-5.95c-1.29-2.36-1.94-5.07-1.94-8.14v-40.2h16.39v38.07c0,2.7.88,4.9,2.64,6.63,1.76,1.72,4.34,2.58,7.75,2.58,3.22,0,5.77-.83,7.66-2.5,1.89-1.67,2.84-4,2.84-6.99v-37.79h16.23v58.06h-12.35l-1.91-11.51c-.67,3.41-1.94,6.02-3.79,7.83-1.85,1.82-3.97,3.07-6.34,3.76s-4.71,1.04-6.99,1.04Z'
      />
      <path
        style={logoStyles}
        d='m529.21,94.24c-7.79,0-13.85-2.69-18.19-8.06-4.34-5.37-6.51-12.85-6.51-22.43,0-6.06.88-11.32,2.64-15.78,1.76-4.45,4.36-7.91,7.8-10.36,3.44-2.45,7.65-3.68,12.63-3.68,2.1,0,4.05.23,5.87.7,1.82.47,3.47,1.11,4.97,1.94s2.81,1.78,3.93,2.86c1.12,1.09,2.04,2.25,2.75,3.48V9.68h16.45v83.44h-11.9l-1.85-11.9c-.56,1.61-1.3,3.18-2.22,4.72-.92,1.54-2.12,2.93-3.59,4.18-1.48,1.25-3.27,2.26-5.36,3s-4.57,1.12-7.41,1.12Zm3.59-11.79c4.12,0,7.2-1.44,9.24-4.32,2.04-2.88,3.06-7.75,3.06-14.6-.04-3.97-.5-7.26-1.4-9.88-.9-2.62-2.24-4.58-4.01-5.87-1.78-1.29-4.03-1.94-6.77-1.94-3.56,0-6.51,1.36-8.87,4.07s-3.54,7.25-3.54,13.62,1.1,11.25,3.31,14.32c2.21,3.07,5.2,4.6,8.98,4.6Z'
      />
      <path
        style={logoStyles}
        d='m602.15,112.32c-10.33,0-18.18-1.31-23.55-3.93-5.37-2.62-8.06-6.06-8.06-10.33,0-1.98.51-3.65,1.54-5,1.03-1.35,2.25-2.42,3.65-3.23,1.4-.8,2.7-1.42,3.87-1.85,1.18-.43,1.92-.72,2.22-.87-.6-.34-1.47-.83-2.61-1.49-1.14-.65-2.18-1.55-3.12-2.7-.94-1.14-1.4-2.61-1.4-4.41,0-2.1.98-4.02,2.95-5.78,1.96-1.76,4.93-2.96,8.9-3.59-3.82-1.83-6.72-4.29-8.7-7.36-1.98-3.07-2.98-6.21-2.98-9.43,0-3.82,1.2-7.09,3.59-9.83,2.39-2.73,5.67-4.81,9.83-6.23,4.15-1.42,8.85-2.13,14.09-2.13,3.97,0,7.23.42,9.8,1.26,2.56.84,4.93,1.94,7.1,3.28.86-.34,1.99-.78,3.4-1.32,1.4-.54,2.94-1.14,4.6-1.8,1.67-.65,3.28-1.31,4.86-1.96,1.57-.65,2.98-1.24,4.21-1.77l-.11,12.69-9.99,1.63c.37,1.01.67,2.1.9,3.26.22,1.16.34,2.12.34,2.86,0,3.37-.98,6.51-2.95,9.43-1.96,2.92-4.89,5.28-8.79,7.07-3.89,1.8-8.74,2.7-14.54,2.7-.67,0-1.61-.02-2.81-.06-1.2-.04-2.17-.09-2.92-.17-2.17.11-3.68.39-4.52.84-.84.45-1.26.97-1.26,1.57,0,.9.84,1.49,2.53,1.77,1.68.28,4.23.53,7.64.76,1.24.08,2.92.17,5.05.28,2.13.11,4.47.26,7.02.45,7.11.49,12.42,2.24,15.92,5.25,3.5,3.01,5.25,6.8,5.25,11.37,0,5.43-2.57,9.91-7.72,13.45-5.15,3.54-12.89,5.31-23.22,5.31Zm2.64-9.15c4.53,0,7.77-.56,9.71-1.68s2.92-2.73,2.92-4.83c0-1.76-.75-3.19-2.25-4.29s-3.67-1.75-6.51-1.94l-13.31-.84c-1.76-.11-3.29.13-4.6.73-1.31.6-2.33,1.42-3.06,2.47-.73,1.05-1.09,2.17-1.09,3.37,0,2.43,1.48,4.21,4.44,5.33,2.96,1.12,7.54,1.68,13.76,1.68Zm-3.09-40.82c3.11,0,5.6-.85,7.47-2.55,1.87-1.7,2.81-4.01,2.81-6.93s-.94-5.46-2.81-7.3c-1.87-1.83-4.36-2.75-7.47-2.75s-5.61.92-7.52,2.75-2.86,4.27-2.86,7.3.93,5.19,2.78,6.91c1.85,1.72,4.39,2.58,7.61,2.58Z'
      />
      <path
        style={logoStyles}
        d='m670.99,94.24c-5.77,0-10.83-1.21-15.19-3.62-4.36-2.41-7.76-5.83-10.19-10.25-2.43-4.42-3.65-9.62-3.65-15.61s1.11-11.03,3.34-15.69c2.23-4.66,5.44-8.35,9.63-11.06,4.19-2.71,9.26-4.07,15.22-4.07s10.87,1.25,14.88,3.73c4,2.49,7.04,5.95,9.1,10.39,2.06,4.44,3.09,9.56,3.09,15.36v4.44h-39.02c0,2.96.49,5.53,1.46,7.72.97,2.19,2.39,3.88,4.24,5.05,1.85,1.18,4.09,1.77,6.71,1.77,2.81,0,5.26-.6,7.36-1.8,2.1-1.2,3.56-3.16,4.38-5.9h14.82c-.67,4.12-2.32,7.64-4.94,10.56-2.62,2.92-5.8,5.15-9.54,6.68-3.74,1.53-7.64,2.3-11.68,2.3Zm-12.8-36.16h23.69c0-2.32-.44-4.44-1.32-6.37-.88-1.93-2.19-3.46-3.93-4.6-1.74-1.14-3.92-1.71-6.54-1.71s-4.65.61-6.43,1.83c-1.78,1.22-3.14,2.8-4.1,4.74-.95,1.95-1.41,3.99-1.38,6.12Z'
      />
    </SvgIcon>
  );
};