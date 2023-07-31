'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from '../styles/dashboard.module.css';
import { styled } from '@mui/joy/styles';

// hooks
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// components
import { MdAdd } from 'react-icons/md';
import {
  Skeleton,
  Grid,
  Sheet,
  Button,
  Typography,
  Chip,
  ChipDelete,
} from '@mui/joy';
import CreateEnvelopeModal from './createEnvelopeModal';
import PriorityGroup from './priorityGroup';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: '0',
  textAlign: 'left',
  color: theme.vars.palette.text.secondary,
}));

const Container = styled(Grid)(({ theme }) => ({
  borderBottom: 'var(--gray-border-sm)',
  marginBottom: '1rem',
  paddingBottom: theme.spacing(2),
}));

export default function Envelopes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priority = searchParams.get('priority');
  const [currentPriorityGroup, setCurrentPriorityGroup] = useState(null);
  const [priorityColor, setPriorityColor] = useState(null);
  const [allPriorityGroups, setAllPriorityGroups] = useState(null);

  const [envelopes, setEnvelopes] = useState(null);
  const [updateProps, setUpdateProps] = useState(null);
  const [envelopesBalance, setEnvelopesBalance] = useState(0);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newEnvelope, setNewEnvelope] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEnvelopes = async () => {
      const response = await fetch('/api/envelopes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { envelopes } = await response.json();

      setEnvelopes(await envelopes);
    };

    const disperseEnvelopes = () => {
      const necessitiesArr = [];
      const pressingArr = [];
      const savingsArr = [];
      const discretionaryArr = [];
      const incomeArr = [];

      envelopes.map((item) => {
        if (item.priority_id === 4) {
          savingsArr.push(item);
        } else if (item.priority_id === 1) {
          necessitiesArr.push(item);
        } else if (item.priority_id === 2) {
          pressingArr.push(item);
        } else if (item.priority_id === 3) {
          discretionaryArr.push(item);
        } else if (item.priority_id === 5) {
          incomeArr.push(item);
        }
      });

      if (priority === null) {
        setPriorityColor(null);
        setCurrentPriorityGroup(null);
        calculateEnvelopesBalance();
      } else if (priority === 'savings') {
        setPriorityColor('info');
        setCurrentPriorityGroup(savingsArr);
        calculateEnvelopesBalance(savingsArr);
      } else if (priority === 'necessities') {
        setPriorityColor('danger');
        setCurrentPriorityGroup(necessitiesArr);
        calculateEnvelopesBalance(necessitiesArr);
      } else if (priority === 'pressing') {
        setPriorityColor('warning');
        setCurrentPriorityGroup(pressingArr);
        calculateEnvelopesBalance(pressingArr);
      } else if (priority === 'discretionary') {
        setPriorityColor('primary');
        setCurrentPriorityGroup(discretionaryArr);
        calculateEnvelopesBalance(discretionaryArr);
      } else if (priority === 'income') {
        setPriorityColor('success');
        setCurrentPriorityGroup(incomeArr);
        calculateEnvelopesBalance(incomeArr);
      }

      setAllPriorityGroups([
        { group: savingsArr, color: 'info', groupName: 'Savings' },
        {
          group: necessitiesArr,
          color: 'danger',
          groupName: 'Necessities',
        },
        {
          group: pressingArr,
          color: 'warning',
          groupName: 'Pressing',
        },
        {
          group: discretionaryArr,
          color: 'primary',
          groupName: 'Discretionary',
        },
        { group: incomeArr, color: 'success', groupName: 'Income' },
      ]);
    };

    const calculateEnvelopesBalance = (group) => {
      let balance = 0;
      if (!group) {
        envelopes.map((item) => {
          balance += item.amount;
        });
      } else {
        group.map((item) => {
          balance += item.amount;
        });
      }
      setEnvelopesBalance(balance);
    };

    if (envelopes === null) {
      fetchEnvelopes();
    }

    if (envelopes !== null) {
      disperseEnvelopes();
      setLoading(false);
    }
  }, [envelopes, submitting, newEnvelope, priority]);

  return (
    <div>
      {priority !== null && (
        <div className={spacingStyles.marginBottomSm}>
          <Chip
            variant='outlined'
            color={priorityColor}
            onClick={() => router.push('/dashboard/envelopes')}
            endDecorator={
              <ChipDelete onClick={() => router.push('/dashboard/envelopes')} />
            }>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Chip>
        </div>
      )}
      <div className={styles.envelopesHeaderWrap}>
        <div className={styles.smallBalanceWrap}>
          <div className={spacingStyles.marginBottomXxs}>
            <Skeleton
              loading={loading}
              variant='text'
              level='h1'>
              <Typography level='h3'>
                {priority === null
                  ? 'All Envelopes'
                  : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Typography>
            </Skeleton>
          </div>
          <Skeleton
            loading={loading}
            variant='text'
            level='h2'>
            {!loading && (
              <>
                <Typography
                  level='body2'
                  gutterBottom={true}>
                  Total budget for{' '}
                  {priority === null
                    ? ' all envelopes'
                    : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  :
                </Typography>
                <Typography level='body1'>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(envelopesBalance)}
                </Typography>
              </>
            )}
          </Skeleton>
        </div>

        {!loading && (
          <Button
            startDecorator={<MdAdd />}
            onClick={() => setOpen(true)}>
            New envelope
          </Button>
        )}

        <CreateEnvelopeModal
          loading={loading}
          setLoading={setLoading}
          newEnvelope={newEnvelope}
          setNewEnvelope={setNewEnvelope}
          envelopes={envelopes}
          setEnvelopes={setEnvelopes}
          open={open}
          setOpen={setOpen}
          submitting={submitting}
          setSubmitting={setSubmitting}
          updateProps={updateProps}
          setUpdateProps={setUpdateProps}
        />
      </div>
      <Container
        container
        spacing={2}
        sx={{ flexGrow: 1 }}>
        <Skeleton
          variant='text'
          level='body1'
          loading={loading}>
          <Grid xs={4}>
            <Item>
              <p className={textStyles.headingXs}>Budget</p>
            </Item>
          </Grid>
        </Skeleton>
        <Skeleton
          variant='text'
          level='body1'
          loading={loading}>
          <Grid xs={4}>
            <Item>
              <p className={textStyles.headingXs}>Amount Left</p>
            </Item>
          </Grid>
        </Skeleton>
        <Skeleton
          variant='text'
          level='body1'
          loading={loading}>
          <Grid xs={4}>
            <Item>
              <p className={textStyles.headingXs}>Amount Spent</p>
            </Item>
          </Grid>
        </Skeleton>
      </Container>

      <Skeleton loading={loading}>
        {!loading && !submitting && (
          <Grid
            container
            spacing={2}
            sx={{ flexGrow: 1 }}
            direction={'column'}>
            {currentPriorityGroup !== null && priority !== null && (
              <PriorityGroup
                group={currentPriorityGroup}
                loading={loading}
                groupName={priority.charAt(0).toUpperCase() + priority.slice(1)}
                color={priorityColor}
              />
            )}
            {currentPriorityGroup === null &&
              priority === null &&
              allPriorityGroups.map((group, index) => {
                if (group.group.length === 0) return;
                return (
                  <PriorityGroup
                    key={index}
                    group={group.group}
                    loading={loading}
                    groupName={group.groupName}
                    color={group.color}
                    updateProps={updateProps}
                    setUpdateProps={setUpdateProps}
                    setOpen={setOpen}
                    open={open}
                  />
                );
              })}
          </Grid>
        )}
      </Skeleton>
    </div>
  );
}
