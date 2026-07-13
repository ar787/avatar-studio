import { useImperativeHandle, forwardRef } from 'react';
import ReactCrop, { type PercentCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Box from '@mui/material/Box';
import type { AdjustState, PresetType } from './hooks/useAvatarEditor';
import { useFabricCanvas } from './hooks/useFabricCanvas';
import { useCropRect } from './hooks/useCropRect';

export type AvatarEditorCanvasRef = {
  exportBlob: () => Promise<Blob>;
  resetCrop: () => void;
};

type Props = {
  imageUrl: string;
  adjustments: AdjustState;
  preset: PresetType | null;
  cropMode: boolean;
};

export const AvatarEditorCanvas = forwardRef<AvatarEditorCanvasRef, Props>(
  function AvatarEditorCanvas(
    { imageUrl, adjustments, preset, cropMode },
    ref,
  ) {
    const { canvasElRef, fabricRef, imageRef } = useFabricCanvas({
      imageUrl,
      adjustments,
      preset,
    });
    const { crop, setCrop, resetCrop, exportBlob } = useCropRect({
      fabricRef,
      imageRef,
    });

    useImperativeHandle(ref, () => ({ exportBlob, resetCrop }));

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <ReactCrop
          crop={cropMode ? crop : undefined}
          onChange={(_px, pct: PercentCrop) => setCrop(pct)}
          disabled={!cropMode}
        >
          <canvas
            ref={canvasElRef}
            style={{ maxWidth: '100%', display: 'block' }}
          />
        </ReactCrop>
      </Box>
    );
  },
);
