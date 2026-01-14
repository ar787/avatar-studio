import { useState, type ReactNode } from "react";
import {
  Snackbar,
  Alert,
  type AlertColor,
  type SnackbarProps,
} from "@mui/material";

type SnackbarOptions = {
  message: string;
  severity?: AlertColor;
  duration?: number;
  action?: ReactNode;
  anchorOrigin?: SnackbarProps["anchorOrigin"];
};

export function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions>({
    message: "",
    severity: "info",
    duration: 4000,
    anchorOrigin: { vertical: "top", horizontal: "center" },
  });

  const showSnackbar = (opts: SnackbarOptions) => {
    setOptions({
      severity: "info",
      duration: 4000,
      anchorOrigin: { vertical: "top", horizontal: "center" },
      ...opts,
    });
    setOpen(true);
  };

  const SnackbarComponent = (
    <Snackbar
      open={open}
      autoHideDuration={options.duration}
      onClose={() => setOpen(false)}
      anchorOrigin={options.anchorOrigin}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={options.severity}
        variant="filled"
        action={options.action}
      >
        {options.message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
}
