import Backdrop from "@mui/material/Backdrop";
import Avatar, { type AvatarProps } from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { Button, Fade, Box, CircularProgress, Grow } from "@mui/material";
import type { SxProps } from "@mui/material/styles";
import { getAvatarDownloadBlob } from "../services/api";
import { logEvent } from "firebase/analytics";
import { analytics } from "../services/firebase";

type AvatarViewProps = {
  imageUrl: string;
  name: string;
  open: boolean;
  onClose: () => void;
};

const sx: SxProps = { width: 400, height: 400 };
const TIMEOUT = 300;

export default function AvatarView({
  open,
  onClose,
  imageUrl,
  name,
}: Readonly<AvatarViewProps>) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOpenBackdrop(open);
  }, [open]);

  function handleOnClose() {
    setOpenBackdrop(false);
  }

  function onExited() {
    onClose();
  }

  async function download(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
      e.stopPropagation();
      setIsLoading(true);
      logEvent(analytics, "download_image", { image_name: name });

      const blob = await getAvatarDownloadBlob(name);
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onContextMenu: AvatarProps["onContextMenu"] = (e) => e.preventDefault();

  return (
    <Fade in={openBackdrop} timeout={TIMEOUT} onExited={onExited}>
      <Backdrop open={open} onClick={handleOnClose}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar src={imageUrl} sx={sx} onContextMenu={onContextMenu} />

          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isLoading && (
              <CircularProgress
                color="secondary"
                size={36}
                sx={{
                  position: "absolute",
                }}
              />
            )}
            <Grow in={!isLoading} timeout={300}>
              <Button
                variant="contained"
                onClick={download}
                fullWidth
                sx={{ backgroundColor: "#464343" }}
                aria-label="Download avatar"
              >
                Download
              </Button>
            </Grow>
          </Box>
        </Box>
      </Backdrop>
    </Fade>
  );
}
