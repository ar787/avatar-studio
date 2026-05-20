import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import ProfileAvatar from '@/components/Settings/ProfileAvatar';
import ProfileForm from '@/components/Settings/ProfileForm';
import { useNotification, useUser } from '@/hooks';
import Button from '@/ui/components/Button';
import { updateProfile, updateProfilePicture } from '@/services/api/user.api';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';
import { selectUserProfile } from '@/store/user/userSelectors';

export default function SettingsPage() {
  const { setProfile } = useUser();
  const notify = useNotification();
  const { logOut } = useAuth();
  const profile = useAppSelector(selectUserProfile);

  const handleOnSubmit = async ({ displayName }: { displayName: string }) => {
    await updateProfile(displayName);
    setProfile({ displayName });
  };

  const handleUpdateProfilePicture = async (file: File) => {
    try {
      const { picture } = await updateProfilePicture(file);
      notify.info('Profile picture updated successfully.');
      setProfile({ picture });
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : 'Failed to upload image.',
      );
    }
  };

  return (
    <Box sx={{ marginTop: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography variant="caption">Profile Settings</Typography>
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
