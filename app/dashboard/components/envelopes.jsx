'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from '../styles/dashboard.module.css';
import { styled } from '@mui/joy/styles';

// hooks
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { MdAdd, MdEdit } from 'react-icons/md';
import {
  Skeleton,
  Modal,
  Grid,
  Sheet,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  ModalDialog,
  Stack,
  Typography,
  Link,
} from '@mui/joy';

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

const EnvelopeForm = styled(ModalDialog)(({ theme }) => ({
  backgroundColor: 'var(--gray-dark)',
  padding: theme.spacing(9),
}));

const CancelButton = styled(Link)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  display: 'block',
  color: theme.vars.palette.danger.main,
}));

export default function Envelopes() {
  const router = useRouter();

  const [envelopes, setEnvelopes] = useState(null);
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

    const calculateEnvelopesBalance = () => {
      let balance = 0;
      envelopes.map((item) => {
        balance += item.amount;
      });
      setEnvelopesBalance(balance);
    };

    const handleNewEnvelope = async () => {
      setLoading(true);
      const response = await fetch('/api/envelopes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEnvelope),
      });
      const { envelope } = await response.json();

      if (envelope !== null) {
        console.log(envelope);
        setEnvelopes([...envelopes, envelope[0]]);
      }
      setOpen(false);
      setLoading(false);
      setSubmitting(false);

      router.refresh();
    };

    if (envelopes === null) {
      fetchEnvelopes();
    }

    if (envelopes !== null) {
      calculateEnvelopesBalance();
      setLoading(false);
    }

    if (newEnvelope !== null && submitting) {
      handleNewEnvelope();
    }
  }, [envelopes, submitting, newEnvelope]);

  return (
    <div>
      <div className={styles.envelopesHeaderWrap}>
        <div className={styles.smallBalanceWrap}>
          <div className={spacingStyles.marginBottomXxs}>
            <Skeleton
              loading={loading}
              variant='text'
              level='h2'>
              <h2 className={textStyles.headingLg}>Envelopes</h2>
            </Skeleton>
          </div>
          <Skeleton
            loading={loading}
            variant='text'
            level='body1'>
            {!loading && (
              <p className={textStyles.smallBalance}>
                Balance for all envelopes:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(envelopesBalance)}
              </p>
            )}
          </Skeleton>
        </div>
        <Skeleton loading={loading}>
          <Button
            startDecorator={<MdAdd />}
            onClick={() => setOpen(true)}>
            New envelope
          </Button>
        </Skeleton>

        <Modal
          open={open}
          onClose={() => setOpen(false)}>
          <EnvelopeForm
            color='neutral'
            layout='center'
            size='md'
            variant='outlined'
            aria-labelledby='basic-modal-dialog-title'
            aria-describedby='basic-modal-dialog-description'
            sx={{ maxWidth: 500 }}>
            <Skeleton loading={loading}>
              <Typography
                id='basic-modal-dialog-title'
                component='h2'>
                Create a new envelope
              </Typography>
            </Skeleton>

            <Skeleton loading={loading}>
              <Typography
                id='basic-modal-dialog-description'
                textColor='text.tertiary'>
                Fill in the information of the envelope.
              </Typography>
            </Skeleton>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitting(true);
                setLoading(true);
              }}>
              <Stack spacing={5}>
                <FormControl>
                  <Skeleton loading={loading}>
                    <FormLabel>Name</FormLabel>
                  </Skeleton>

                  <Skeleton loading={loading}>
                    <Input
                      autoFocus
                      required
                      type='text'
                      onChange={(event) => {
                        setNewEnvelope({
                          ...newEnvelope,
                          name: event.target.value,
                        });
                      }}
                    />
                  </Skeleton>
                </FormControl>
                <FormControl>
                  <Skeleton loading={loading}>
                    <FormLabel>Amount</FormLabel>
                  </Skeleton>

                  <Skeleton loading={loading}>
                    <Input
                      autoFocus
                      required
                      type='number'
                      onChange={(event) => {
                        setNewEnvelope({
                          ...newEnvelope,
                          amount: event.target.value,
                        });
                      }}
                    />
                  </Skeleton>
                </FormControl>
                <FormControl>
                  <Skeleton loading={loading}>
                    <FormLabel>Notes</FormLabel>
                  </Skeleton>

                  <Skeleton loading={loading}>
                    <Textarea
                      minRows={2}
                      onChange={(event) => {
                        setNewEnvelope({
                          ...newEnvelope,
                          notes: event.target.value,
                        });
                      }}
                    />
                  </Skeleton>
                </FormControl>

                <Skeleton loading={loading}>
                  <Button type='submit'>Submit</Button>
                </Skeleton>

                <Skeleton loading={loading}>
                  <CancelButton
                    color='danger'
                    onClick={() => {
                      setOpen(false);
                    }}>
                    Cancel
                  </CancelButton>
                </Skeleton>
              </Stack>
            </form>
          </EnvelopeForm>
        </Modal>
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
        <Grid
          container
          spacing={2}
          sx={{ flexGrow: 1 }}
          direction={'column'}>
          {!loading && !submitting && (
            <>
              {envelopes.map((item) => {
                return (
                  <Container
                    key={item.id}
                    container
                    spacing={2}
                    sx={{ flexGrow: 1 }}>
                    <Grid
                      xs={12}
                      className={spacingStyles.marginBottomXxs}>
                      <h3 className={textStyles.headingSmAlt}>{item.name}</h3>
                    </Grid>
                    <Grid xs={4}>
                      <p className={textStyles.paragraphSm}>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.amount)}
                      </p>
                    </Grid>
                    <Grid xs={4}>
                      <p className={textStyles.paragraphSm}>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.amount_left)}
                      </p>
                    </Grid>
                    <Grid xs={3}>
                      <p className={textStyles.paragraphSm}>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.amount_spent)}
                      </p>
                    </Grid>
                    <Grid
                      xs={1}
                      className={textStyles.editIcon}>
                      <MdEdit />
                    </Grid>
                  </Container>
                );
              })}
            </>
          )}
        </Grid>
      </Skeleton>
    </div>
  );
}
