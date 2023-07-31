'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import { styled } from '@mui/joy/styles';

// components
import { MdEdit } from 'react-icons/md';
import { Skeleton, Grid, Typography, Link } from '@mui/joy';
import { usePathname, useRouter } from 'next/navigation';

const Container = styled(Grid)(({ theme }) => ({
  borderBottom: 'var(--gray-border-sm)',
  marginBottom: '1rem',
  paddingBottom: theme.spacing(2),
}));

export default function PriorityGroup({
  group,
  loading,
  groupName,
  color,
  updateProps,
  setUpdateProps,
  open,
  setOpen,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const someLeftStyle = {
    border: '1px solid #1A7D36',
    borderRadius: '5px',
    padding: '0.25rem 0.75rem',
    maxWidth: 'fit-content',
  };

  const spentSomeStyle = {
    boxShadow: '0 3px  #eac64f3e',
    maxWidth: 'fit-content',
  };
  return (
    <div>
      {group !== null && (
        <>
          <Skeleton
            loading={loading}
            variant='text'
            level='body1'>
            <div className={spacingStyles.marginTopBottomXs}>
              <Link
                onClick={() => {
                  // <pathname>?sort=asc
                  router.push(
                    `${pathname}?priority=${groupName.toLowerCase()}`
                  );
                }}>
                <Typography
                  color={color}
                  level='body2'>
                  {groupName}
                </Typography>
              </Link>
            </div>
          </Skeleton>
          {group.map((item) => {
            return (
              <Container
                key={item.id}
                container
                spacing={2}
                sx={{ flexGrow: 1 }}>
                <Grid
                  xs={12}
                  className={spacingStyles.marginBottomXxs}>
                  <Typography level='body1'>{item.name}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level='body2'>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.amount)}
                  </Typography>
                </Grid>
                {groupName !== 'Income' && (
                  <>
                    <Grid xs={4}>
                      <Typography
                        level='body2'
                        color={item.amount_left > 0 ? null : 'neutral'}
                        style={item.amount_left > 0 ? someLeftStyle : null}>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.amount_left)}
                      </Typography>
                    </Grid>
                    <Grid xs={3}>
                      <Typography
                        level='body2'
                        color={item.amount_spent > 0 ? null : 'neutral'}
                        style={item.amount_spent > 0 ? spentSomeStyle : null}>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.amount_spent)}
                      </Typography>
                    </Grid>
                  </>
                )}
                {groupName === 'Income' && (
                  <>
                    <Grid xs={4}>
                      <Typography
                        level='body2'
                        color='neutral'>
                        Income received:
                      </Typography>
                    </Grid>
                    <Grid xs={3}>
                      <Typography
                        level='body2'
                        color={item.amount_spent > 0 ? null : 'neutral'}>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.amount_spent)}
                      </Typography>
                    </Grid>
                  </>
                )}
                <Grid
                  xs={1}
                  className={textStyles.editIcon}>
                  <MdEdit
                    onClick={() => {
                      setOpen(true);
                      setUpdateProps({
                        id: item.id,
                        name: item.name,
                        amount: item.amount,
                        priority_id: item.priority_id,
                        notes: item.notes,
                      });
                    }}
                  />
                </Grid>
              </Container>
            );
          })}
        </>
      )}
    </div>
  );
}
