import { AppBar, Toolbar, Box, IconButton, Tooltip, Fade } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useNavigate } from '@tanstack/react-router';

import { useAppSelector } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';
import {
  selectAvatarGenerationLoading,
  selectAvatarGenerationProgress,
} from '@/store/avatarGeneration/avatarGenerationSelectors';
import CardDisplay from '@/components/CardDisplay';
import AccountPopover from '@/components/AccountPopover';

type HeaderBarProps = {
  onToggleSidebar: () => void;
};

export default function HeaderBar({
  onToggleSidebar,
}: Readonly<HeaderBarProps>) {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);
  const generating = useAppSelector(selectAvatarGenerationLoading);
  const progress = useAppSelector(selectAvatarGenerationProgress);
  const showIndicator = generating || progress > 0;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1b1d1f',
        backgroundImage: 'none',
        borderBottom: '1px solid #d6e1ff1f',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{ minHeight: '56px !important', px: '20px !important', gap: 1.5 }}
      >
        <IconButton
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          sx={{ color: '#fff', width: 36, height: 36, borderRadius: 1 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Fade in={showIndicator} unmountOnExit>
            <Tooltip
              title={generating ? 'Generating avatar...' : 'Avatar generated'}
            >
              <IconButton
                onClick={() => navigate({ to: '/generate' })}
                aria-label={
                  generating ? 'Generating avatar' : 'Avatar generated'
                }
                sx={{ color: '#fff', width: 36, height: 36 }}
              >
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    size={22}
                    variant="determinate"
                    value={progress}
                    sx={{ color: generating ? 'info.main' : 'success.main' }}
                  />
                  {generating ? (
                    <AutoFixHighIcon
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 12,
                      }}
                    />
                  ) : (
                    <CheckCircleIcon
                      color="success"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 14,
                      }}
                    />
                  )}
                </Box>
              </IconButton>
            </Tooltip>
          </Fade>
          {isAuthenticated && <CardDisplay credits={profile?.credits ?? 0} />}
          {/* <IconButton
            aria-label="Notifications (not yet implemented)"
            disabled
            sx={{
              color: 'rgba(255,255,255,0.7)',
              width: 36,
              height: 36,
              '&.Mui-disabled': { color: 'rgba(255,255,255,0.7)' },
            }}
          >
            <NotificationsOutlinedIcon />
          </IconButton> */}
          <AccountPopover
            profile={profile}
            isAuthenticated={isAuthenticated}
            signOut={logOut}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
