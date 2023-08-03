'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from '../styles/dashboard.module.css';
import { styled } from '@mui/joy/styles';

// context
import { LoadingContext } from '@/app/context/LoadingContext';

// hooks
import { useEffect, useState, useContext } from 'react';
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
import TransactionModal from './transactionModal';
import PriorityGroup from './priorityGroup';
import { set } from 'animejs';

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

export default function Transactions() {
  const { loading, setLoading } = useContext(LoadingContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const priority = searchParams.get('priority');
  const [currentPriorityGroup, setCurrentPriorityGroup] = useState(null);
  const [priorityColor, setPriorityColor] = useState(null);
  const [allPriorityGroups, setAllPriorityGroups] = useState(null);

  const [transactions, setTransactions] = useState(null);
  const [updateProps, setUpdateProps] = useState(null);
  const [transactionsBalance, setTransactionsBalance] = useState(0);

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newTransaction, setNewTransaction] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { transactions } = await response.json();

      setTransactions(await transactions);
    };

    const disperseTransactions = () => {
      const necessitiesArr = [];
      const pressingArr = [];
      const savingsArr = [];
      const discretionaryArr = [];
      const incomeArr = [];
    };

    const calculateTransactionsBalance = (group) => {
      let balance = 0;
      if (!group) {
        transactions.map((item) => {
          if (item.priority_id !== 5) return;
          balance += item.amount;
        });
      } else {
        group.map((item) => {
          balance += item.amount;
        });
      }
      setTransactionsBalance(balance);
    };

    if (transactions === null) {
      fetchTransactions();
    }

    if (transactions !== null) {
      setLoading(false);
    }
  }, [transactions, submitting, newTransaction, priority]);

  return (
    <div>
      {priority !== null && (
        <div className={spacingStyles.marginBottomSm}>
          <Chip
            variant='soft'
            color={priorityColor}
            onClick={() => router.push('/dashboard/transactions')}
            endDecorator={
              <ChipDelete
                onClick={() => router.push('/dashboard/transactions')}
              />
            }>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Chip>
        </div>
      )}
      <div className={styles.headerWrap}>
        <div className={styles.smallBalanceWrap}>
          <div className={spacingStyles.marginBottomXxs}>
            <Skeleton
              loading={loading}
              variant='text'
              level='h1'>
              <Typography level='h3'>
                {priority === null
                  ? 'All Transactions'
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
                    ? ' all transactions'
                    : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  :
                </Typography>
              </>
            )}
          </Skeleton>
        </div>

        {!loading && (
          <Button
            startDecorator={<MdAdd />}
            onClick={() => setOpen(true)}>
            New transaction
          </Button>
        )}
        <TransactionModal
          loading={loading}
          setLoading={setLoading}
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          transactions={transactions}
          setTransactions={setTransactions}
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
    </div>
  );
}
