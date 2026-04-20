import ProfileAvatar from '@/components/Settings/ProfileAvatar';
import ProfileForm from '@/components/Settings/ProfileForm';
import { useAuth, useNotification } from '@/hooks';
import Button from '@/ui/components/Button';

import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { updateProfile, updateProfilePicture } from '@/services/api/user.api';

export default function SettingsPage() {
  const { currentUserProfile, setProfileData, logOut } = useAuth();
  const { addNotification } = useNotification();
  const handleOnSubmit = async ({ displayName }: { displayName: string }) => {
    await updateProfile(displayName);
    setProfileData({ displayName });
  };

  const handleUpdateProfilePicture = async (file: File) => {
    try {
      const { picture } = await updateProfilePicture(file);
      addNotification({
        severity: 'info',
        message: 'Profile picture updated successfully.',
      });
      setProfileData({ picture });
    } catch (error) {
      addNotification({
        severity: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to upload image.',
      });
    }
  };

  return (
    <Box sx={{ marginTop: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography variant="caption">Profile Settings</Typography>
          <ProfileAvatar
            src={currentUserProfile?.picture ?? ''}
            onUpload={handleUpdateProfilePicture}
          />
          <ProfileForm
            values={{
              displayName: currentUserProfile?.displayName ?? '',
              email: currentUserProfile?.email ?? '',
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
