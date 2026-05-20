import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@ui/components/TextField';
import Button from '@/ui/components/Button';
import { useNotification } from '@/hooks';

type ProfileForm = {
  values: {
    displayName: string;
    email: string;
  };
  onSubmit: (data: { displayName: string }) => Promise<unknown>;
};

export default function ProfileForm({
  values,
  onSubmit,
}: Readonly<ProfileForm>) {
  const [loading, setLoading] = useState(false);
  const [displayNameValue, setDisplayNameValue] = useState(values.displayName);
  const notify = useNotification();

  useEffect(() => {
    setDisplayNameValue(values.displayName);
  }, [values.displayName]);

  const onHandleSubmit = async () => {
    if (isPristine) return;
    try {
      setLoading(true);
      await onSubmit({ displayName: displayNameValue });
      notify.info('Profile changes saved successfully.');
    } catch {
      notify.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const isPristine = displayNameValue === values.displayName;

  return (
    <Stack spacing={2}>
      <TextField
        label="Display name"
        value={displayNameValue}
        onChange={(e) => setDisplayNameValue(e.target.value)}
      />
      <TextField label="Email" disabled value={values.email} />
      <Button
        loading={loading}
        disabled={loading || isPristine}
        onClick={onHandleSubmit}
      >
        Save
      </Button>
    </Stack>
  );
}
