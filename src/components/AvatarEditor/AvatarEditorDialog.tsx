import { useRef, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CropIcon from '@mui/icons-material/Crop';
import TuneIcon from '@mui/icons-material/Tune';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Button from '@ui/components/Button';
import { Dialog } from '@/ui/components';
import { useSaveEditedAvatar } from '@/hooks/queries/avatars';
import { useAppSelector } from '@/store/hooks';
import { selectUserProfile } from '@/store/user/userSelectors';
import { useAvatarEditor } from './hooks/useAvatarEditor';
import type { AdjustState, PresetType } from '@/types/avatar';
import {
  AvatarEditorCanvas,
  type AvatarEditorCanvasRef,
} from './AvatarEditorCanvas';
import { AvatarEditorControls } from './AvatarEditorControls';
import { AvatarEditorPresets } from './AvatarEditorPresets';

type AvatarEditorDialogProps = {
  open: boolean;
  imageUrl: string;
  name: string;
  avatarId: string;
  albumId?: string;
  initialAdjustments?: AdjustState;
  initialPreset?: PresetType | null;
  onClose: () => void;
};

export function AvatarEditorDialog({
  open,
  imageUrl,
  name,
  avatarId,
  albumId,
  onClose,
}: Readonly<AvatarEditorDialogProps>) {
  const canvasRef = useRef<AvatarEditorCanvasRef>(null);
  const {
    state,
    setBrightness,
    setContrast,
    setSaturation,
    setHueRotation,
    setVibrance,
    setBlur,
    setPreset,
    setTab,
    reset,
  } = useAvatarEditor();
  const { saveEdited, isPending } = useSaveEditedAvatar();
  const credits = useAppSelector(selectUserProfile)?.credits ?? 0;

  useEffect(() => {
    if (!open) return;
    reset('adjust');
  }, [open, reset]);

  const handleTabChange = (
    _: React.SyntheticEvent,
    value: 'adjust' | 'crop' | 'presets',
  ) => setTab(value);

  const handleReset = () => {
    reset(state.activeTab);
    canvasRef.current?.resetCrop();
  };

  const handleOnClose = () => {
    reset('adjust');
    canvasRef.current?.resetCrop();
  };

  const handleSave = async () => {
    const blob = await canvasRef.current?.exportBlob();
    if (!blob) return;
    await saveEdited({
      blob,
      originalName: name,
      albumId: albumId ?? '',
      avatarId,
      adjustments: state.adjustments,
      preset: state.preset,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      keepMounted
      fullWidth
      onTransitionExited={() => {
        handleOnClose();
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Edit Avatar
          </Typography>
          <Tooltip title="Reset all changes">
            <IconButton size="small" onClick={handleReset} color="inherit">
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Tabs value={state.activeTab} onChange={handleTabChange} sx={{ mt: 1 }}>
          <Tab
            value="adjust"
            label="Adjust"
            icon={<TuneIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab
            value="presets"
            label="Presets"
            icon={<AutoAwesomeIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab
            value="crop"
            label="Crop"
            icon={<CropIcon fontSize="small" />}
            iconPosition="start"
          />
        </Tabs>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: state.activeTab === 'adjust' ? 'row' : 'column',
            },
            gap: 2,
          }}
        >
          <AvatarEditorCanvas
            ref={canvasRef}
            imageUrl={imageUrl}
            adjustments={state.adjustments}
            preset={state.preset}
            cropMode={state.activeTab === 'crop'}
          />

          <Box sx={{ mt: 3, flexGrow: 1 }}>
            <Box>
              {state.activeTab === 'adjust' && (
                <AvatarEditorControls
                  adjustments={state.adjustments}
                  onBrightness={setBrightness}
                  onContrast={setContrast}
                  onSaturation={setSaturation}
                  onHueRotation={setHueRotation}
                  onVibrance={setVibrance}
                  onBlur={setBlur}
                />
              )}
              {state.activeTab === 'presets' && (
                <AvatarEditorPresets
                  active={state.preset}
                  onSelect={setPreset}
                />
              )}
              {state.activeTab === 'crop' && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center' }}
                >
                  Drag and resize the selection to crop the avatar.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
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
          sx={{ mr: 'auto' }}
        >
          <DiamondSharpIcon fontSize="small" />
          <Typography variant="body2">{credits}</Typography>
        </Stack>
        <Button variant="text" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          loading={isPending}
          startIcon={
            <DiamondSharpIcon
              fontSize="small"
              sx={{ color: 'rgba(63, 221, 120, 1)' }}
            />
          }
        >
          Save · 1
        </Button>
      </DialogActions>
    </Dialog>
  );
}
