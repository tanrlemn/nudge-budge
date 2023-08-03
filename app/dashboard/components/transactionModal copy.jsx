'use client';

// styles
import { styled } from '@mui/joy/styles';
import spacingStyles from '@/app/styles/spacing.module.css';

// hooks
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { MdOutlineAttachMoney } from 'react-icons/md';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import {
  Skeleton,
  Modal,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Switch,
  ModalDialog,
  ModalClose,
  Stack,
  Typography,
  Link,
} from '@mui/joy';

const TransactionForm = styled(ModalDialog)(({ theme }) => ({
  backgroundColor: 'var(--gray-darkest)',
  padding: theme.spacing(15, 9),
}));

const CancelButton = styled(Link)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  display: 'block',
}));

export default function TransactionModal({
  newTransaction,
  setNewTransaction,
  transactions,
  setTransactions,
  open,
  setOpen,
  submitting,
  setSubmitting,
  setLoading,
  updateProps,
  setUpdateProps,
}) {
  const router = useRouter();

  const editing = updateProps !== null;
  const { date, amount, envelope_id, merchant_name, id } = updateProps || {};

  useEffect(() => {
    const handleNewTransaction = async () => {
      setLoading(true);
      updateProps ? (newTransaction.id = id) : null;

      const route = updateProps
        ? '/api/transactions/update'
        : '/api/transactions/create';

      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      const { transaction } = await response.json();

      if (transaction !== null) {
        if (updateProps) {
          const updatedTransactions = transactions.map((t) => {
            if (t.id === transaction[0].id) {
              return transaction[0];
            }
            return t;
          });
          setTransactions(updatedTransactions);
          setUpdateProps(null);
        } else {
          setTransactions([...transactions, transaction[0]]);
        }
      }
      setOpen(false);
      setLoading(false);
      setSubmitting(false);

      router.refresh();
    };

    if (newTransaction !== null && submitting) {
      handleNewTransaction();
    }
  }, [transactions, submitting, newTransaction, updateProps]);

  return (
    <Modal
      open={open}
      onClose={(_event) => {
        setUpdateProps(null);
        setOpen(false);
      }}>
      <TransactionForm
        color='neutral'
        layout='center'
        size='lg'
        variant='outlined'
        aria-labelledby='basic-modal-dialog-title'
        aria-describedby='basic-modal-dialog-description'
        sx={{ maxWidth: 500, minWidth: '65%' }}>
        <ModalClose
          sx={{
            top: 'calc(1/4 * var(--IconButton-size))',
            right: 'calc(1/4 * var(--IconButton-size))',
          }}
        />
        <Skeleton
          loading={submitting}
          variant='text'
          level='h2'>
          <Typography
            id='basic-modal-dialog-title'
            gutterBottom={false}
            sx={{ fontSize: '2rem' }}
            level='h2'>
            {editing ? 'Edit Transaction' : 'Record a new transaction'}
          </Typography>
        </Skeleton>

        <div className={spacingStyles.marginBottomXl}>
          <Skeleton
            loading={submitting}
            variant='text'
            level='body1'>
            {!editing && (
              <Typography
                id='basic-modal-dialog-description'
                lineHeight={0.2}
                color='info'
                level='body3'
                sx={{ fontSize: '1rem' }}>
                Fill in the information of the transaction.
              </Typography>
            )}
          </Skeleton>
        </div>
        {!submitting && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitting(true);
              setLoading(true);
            }}>
            <Stack spacing={5}>
              <FormControl>
                <FormLabel>Transaction Date</FormLabel>
                <DatePicker defaultValue={dayjs()} />
              </FormControl>
              <FormControl>
                <FormLabel>Transaction Amount</FormLabel>
                {/* amount, date, merchant_name,
                envelope_id, */}
                <Input
                  autoFocus
                  variant='soft'
                  required
                  startDecorator={<MdOutlineAttachMoney />}
                  type='number'
                  defaultValue={updateProps ? amount : ''}
                  onChange={(event) => {
                    setNewTransaction({
                      ...newTransaction,
                      amount: event.target.value,
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Merchant Name</FormLabel>
                <Input
                  variant='soft'
                  type='text'
                  defaultValue={updateProps ? notes : ''}
                  onChange={(event) => {
                    setNewTransaction({
                      ...newTransaction,
                      merchant_name: event.target.value,
                    });
                  }}
                />
              </FormControl>
              <Button type='submit'>Submit</Button>
              <CancelButton
                color='neutral'
                onClick={() => {
                  setOpen(false);
                }}>
                Cancel
              </CancelButton>
            </Stack>
          </form>
        )}
      </TransactionForm>
    </Modal>
  );
}
