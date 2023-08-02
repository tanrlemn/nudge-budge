'use client';

// styles
import { styled } from '@mui/joy/styles';
import spacingStyles from '@/app/styles/spacing.module.css';

// hooks
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { MdOutlineAttachMoney } from 'react-icons/md';
import {
  Skeleton,
  Modal,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Textarea,
  ModalDialog,
  ModalClose,
  Stack,
  Typography,
  Link,
} from '@mui/joy';

const EnvelopeForm = styled(ModalDialog)(({ theme }) => ({
  backgroundColor: 'var(--gray-darkest)',
  padding: theme.spacing(15, 9),
}));

const CancelButton = styled(Link)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  display: 'block',
}));

export default function EnvelopeModal({
  newEnvelope,
  setNewEnvelope,
  envelopes,
  setEnvelopes,
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
  const { name, amount, priority_id, notes, id } = updateProps || {};

  useEffect(() => {
    const handleNewEnvelope = async () => {
      setLoading(true);
      updateProps ? (newEnvelope.id = id) : null;

      const route = updateProps
        ? '/api/envelopes/update'
        : '/api/envelopes/create';

      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEnvelope),
      });
      const { envelope } = await response.json();

      if (envelope !== null) {
        if (updateProps) {
          const updatedEnvelopes = envelopes.map((e) => {
            if (e.id === envelope[0].id) {
              return envelope[0];
            }
            return e;
          });
          setEnvelopes(updatedEnvelopes);
          setUpdateProps(null);
        } else {
          setEnvelopes([...envelopes, envelope[0]]);
        }
      }
      setOpen(false);
      setLoading(false);
      setSubmitting(false);

      router.refresh();
    };

    if (newEnvelope !== null && submitting) {
      handleNewEnvelope();
    }
  }, [envelopes, submitting, newEnvelope]);

  return (
    <Modal
      open={open}
      onClose={(_event) => {
        setUpdateProps(null);
        setOpen(false);
      }}>
      <EnvelopeForm
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
            {editing ? 'Edit Envelope' : 'Create a new envelope'}
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
                Fill in the information of the envelope.
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
                <FormLabel>Envelope Name</FormLabel>
                <Input
                  autoFocus
                  variant='soft'
                  required
                  type='text'
                  defaultValue={updateProps ? name : ''}
                  onChange={(event) => {
                    setNewEnvelope({
                      ...newEnvelope,
                      name: event.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Monthly Budget Amount</FormLabel>
                <Input
                  autoFocus
                  variant='soft'
                  required
                  startDecorator={<MdOutlineAttachMoney />}
                  type='number'
                  defaultValue={updateProps ? amount : ''}
                  onChange={(event) => {
                    setNewEnvelope({
                      ...newEnvelope,
                      amount: event.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  autoFocus
                  variant='soft'
                  required
                  type='number'
                  defaultValue={updateProps ? priority_id : null}
                  onChange={(event, newValue) => {
                    setNewEnvelope({
                      ...newEnvelope,
                      priority_id: newValue,
                    });
                  }}>
                  <Option value={4}>Savings</Option>
                  <Option value={1}>Necessities</Option>
                  <Option value={2}>Pressing</Option>
                  <Option value={3}>Discretionary</Option>
                  <Option value={5}>Income</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  minRows={2}
                  variant='soft'
                  defaultValue={updateProps ? notes : ''}
                  onChange={(event) => {
                    setNewEnvelope({
                      ...newEnvelope,
                      notes: event.target.value,
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
      </EnvelopeForm>
    </Modal>
  );
}
