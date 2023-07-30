'use client';

// styles
import { useColorScheme } from '@mui/joy/styles';

// hooks
import { useEffect, useState } from 'react';

// cpomponents
import { Button, ToggleButtonGroup } from '@mui/joy';
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdLightMode,
  MdDarkMode,
} from 'react-icons/md';

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div>
      <ToggleButtonGroup
        variant={mode || undefined}
        value={mode}
        onChange={(event, newValue) => {
          setMode(newValue);
        }}>
        <Button
          variant='outlined'
          color='neutral'
          startDecorator={mode === 'light' ? MdLightMode : MdOutlineLightMode}
          value='light'>
          Light
        </Button>
        <Button
          variant='outlined'
          color='neutral'
          startDecorator={mode === 'dark' ? MdDarkMode : MdOutlineDarkMode}
          value='dark'>
          Dark
        </Button>
      </ToggleButtonGroup>
    </div>
  );
}
