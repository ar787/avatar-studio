import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import Button, { type ButtonProps } from '@/ui/components/Button';

type AvatarCreationButtonProps = {
  text: string;
  progress: number;
  showProgress: boolean;
  onClick: ButtonProps['onClick'];
};
export const AvatarCreationButton = ({
  text,
  progress,
  showProgress,
  onClick,
}: Readonly<AvatarCreationButtonProps>) => {
  return (
    <Button
      startIcon={<AutoFixHighIcon />}
      onClick={onClick}
      sx={{
        transition: 'all 300ms ease',
        '& .MuiButton-startIcon': {
          marginRight: 1,
          marginLeft: {
            xs: 0,
            md: -0.5,
          },
          // Adjust icon size for different screen sizes
          '&>*:nth-of-type(1)': {
            fontSize: {
              xs: '24px',
              md: '20px',
            },
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          transition: 'all 300ms ease',
          gap: showProgress ? '8px' : 0,
        }}
      >
        <Typography variant="body1">{text}</Typography>

        <Box
          sx={{
            width: '100%',
            overflow: 'hidden',
            maxHeight: showProgress ? 20 : 0,
            opacity: showProgress ? 1 : 0,
            transition: 'all 300ms ease',
          }}
        >
          <LinearProgress value={progress} variant="determinate" color="info" />
        </Box>
      </Box>
    </Button>
  );
};
