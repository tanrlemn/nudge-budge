'use client';

// styles
import styles from './styles/header.module.css';

// server
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// context
import { LoadingContext } from '../context/LoadingContext';

// hooks
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

// components
import Image from 'next/image';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';

export default function ProfileMenu({ profileData }) {
  const { setLoading } = useContext(LoadingContext);
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Dropdown>
      <MenuButton
        className={styles.headerProfileWrap}
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
        sx={{ borderRadius: 40 }}>
        <div className={styles.headerProfileImageWrap}>
          <Image
            className={styles.headerProfileImage}
            src={profileData.profile_img_url}
            alt='profile image'
            width={30}
            height={30}
          />
        </div>
        <div className={styles.headerProfileName}>{profileData.first_name}</div>
      </MenuButton>
      <Menu
        placement='bottom-end'
        variant='outlined'>
        <MenuItem
          {...(pathname === '/dashboard/profile' && {
            selected: true,
            variant: 'soft',
          })}
          onClick={() => {
            setLoading(true);
            router.push('/dashboard/profile');
          }}>
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            setLoading(true);
            router.push('/dashboard/account');
          }}
          selected={pathname === '/dashboard/account'}>
          My Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLoading(true);
            handleSignOut();
          }}>
          Sign out
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
