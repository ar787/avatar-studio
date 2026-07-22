import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type PanelProps = Readonly<{
  step: string;
  label: string;
  title: string;
  children: React.ReactNode;
}>;

export function Panel({ step, label, title, children }: PanelProps) {
  return (
    <Box
      sx={{
        p: { xs: 3, lg: '40px 48px' },
        bgcolor: 'surface.background',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        minWidth: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'surface.border',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: 'text.secondary',
            flex: 'none',
          }}
        >
          {step}
        </Box>
        <Typography
          variant="overline"
          sx={{ letterSpacing: 2, color: 'text.secondary' }}
        >
          {label}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '1.05rem', fontWeight: 500 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
