import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import ProfileAvatar from '@/components/Settings/ProfileAvatar';
import ProfileForm from '@/components/Settings/ProfileForm';
import { PageHeader } from '@/components/PageHeader';
import { useNotification } from '@/hooks';
import Button from '@/ui/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';
import { selectUserProfile } from '@/store/user/userSelectors';
import {
  useUpdateProfile,
  useUpdateProfilePicture,
} from '@/hooks/queries/profile';
import type { UserProfile } from '@/types/userProfile';

export default function SettingsPage() {
  const notify = useNotification();
  const { logOut } = useAuth();
  const profile = useAppSelector(selectUserProfile);
  const { updateProfile } = useUpdateProfile();
  const { updateProfilePicture } = useUpdateProfilePicture();

  const handleOnSubmit = async ({ displayName }: Partial<UserProfile>) => {
    try {
      await updateProfile({ displayName });
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : 'Failed to update profile.',
      );
    }
  };

  const handleUpdateProfilePicture = async (file: File) => {
    try {
      await updateProfilePicture(file);
      notify.info('Profile picture updated successfully.');
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : 'Failed to upload image.',
      );
    }
  };

  return (
    <Box sx={{ marginTop: 6 }}>
      <PageHeader title="Profile Settings" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} sx={{ width: { xs: '100%', md: '50%' } }}>
          <ProfileAvatar
            src={profile?.picture ?? ''}
            onUpload={handleUpdateProfilePicture}
          />
          <ProfileForm
            values={{
              displayName: profile?.displayName ?? '',
              email: profile?.email ?? '',
            }}
            onSubmit={handleOnSubmit}
          />
          <Typography variant="caption">Account</Typography>
          <Button onClick={logOut}>Sign out</Button>
        </Stack>
      </Box>
    </Box>
  );
}
