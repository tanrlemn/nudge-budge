'use client';

// styles
import styles from './styles/header.module.css';

// context
import { LoadingContext } from '../context/LoadingContext';

// hooks
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

// components
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import { CgMenuLeftAlt } from 'react-icons/cg';

export default function HeaderMenu() {
  const { setLoading } = useContext(LoadingContext);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
        sx={{ borderRadius: 40 }}>
        <CgMenuLeftAlt />
      </MenuButton>
      <Menu
        placement='bottom-end'
        variant='outlined'>
        <MenuItem
          selected={pathname === '/dashboard'}
          onClick={() => {
            setLoading(true);
            router.push('/dashboard');
          }}>
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLoading(true);
            router.push('/dashboard/envelopes');
          }}
          selected={pathname === '/dashboard/envelopes'}>
          Envelopes
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLoading(true);
            router.push('/dashboard/transactions');
          }}
          selected={pathname === '/dashboard/transactions'}>
          Transactions
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
