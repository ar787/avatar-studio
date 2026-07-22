import { forwardRef, useState } from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@ui/components/TextField';

type PromptFieldProps = Readonly<{
  onHasValueChange?: (hasValue: boolean) => void;
}>;

export const PromptField = forwardRef<HTMLTextAreaElement, PromptFieldProps>(
  function PromptField({ onHasValueChange }, ref) {
    const [value, setValue] = useState('');

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const next = event.target.value;
      const hadValue = !!value.trim();
      const hasValue = !!next.trim();
      setValue(next);
      if (hasValue !== hadValue) onHasValueChange?.(hasValue);
    };

    return (
      <>
        <TextField
          inputRef={ref}
          value={value}
          onChange={handleChange}
          placeholder="Type a prompt..."
          multiline
          minRows={7}
          fullWidth
        />
        <Typography variant="caption" color="text.secondary">
          Be specific — subject, mood, setting, and lighting all help.
        </Typography>
      </>
    );
  },
);
