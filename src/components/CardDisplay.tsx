import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type CardDisplayProps = {
  credits: number;
};

export default function CardDisplay({ credits }: CardDisplayProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing="2px"
      border="1px solid rgba(22, 216, 102, 0.10)"
      bgcolor="rgba(22, 216, 102, 0.05)"
      color="rgba(63, 221, 120, 1)"
      px="12px"
      py="8px"
      borderRadius="8px"
    >
      <DiamondSharpIcon />
      <Typography>{credits}</Typography>
    </Stack>
  );
}
