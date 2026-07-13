import { useState } from 'react';
import type { PercentCrop } from 'react-image-crop';
import type { Canvas, FabricImage } from 'fabric';
import { CANVAS_SIZE } from './useFabricCanvas';

const FULL_COVER: PercentCrop = {
  unit: '%',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};

type UseCropRectProps = {
  fabricRef: React.RefObject<Canvas | null>;
  imageRef: React.RefObject<FabricImage | null>;
};

export function useCropRect({
  fabricRef,
  imageRef,
}: Readonly<UseCropRectProps>) {
  const [crop, setCrop] = useState<PercentCrop>(FULL_COVER);

  const resetCrop = () => setCrop(FULL_COVER);

  const exportBlob = (): Promise<Blob> => {
    const canvas = fabricRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return Promise.reject(new Error('Canvas not ready'));

    const scaledW = img.width * img.scaleX;
    const scaledH = img.height * img.scaleY;
    const imgX = (CANVAS_SIZE - scaledW) / 2;
    const imgY = (CANVAS_SIZE - scaledH) / 2;

    const isFullCover =
      crop.x === 0 && crop.y === 0 && crop.width === 100 && crop.height === 100;

    // For full cover: extract the image region only (skip background strips).
    // For explicit crop: coordinates are relative to the canvas element.
    const srcX = isFullCover ? imgX : (crop.x / 100) * CANVAS_SIZE;
    const srcY = isFullCover ? imgY : (crop.y / 100) * CANVAS_SIZE;
    const srcW = isFullCover ? scaledW : (crop.width / 100) * CANVAS_SIZE;
    const srcH = isFullCover ? scaledH : (crop.height / 100) * CANVAS_SIZE;

    // Output at natural resolution of the selected region (no upscale)
    const outW = Math.round(srcW * (img.width / scaledW));
    const outH = Math.round(srcH * (img.height / scaledH));

    const fullDataURL = canvas.toDataURL({ format: 'png', multiplier: 1 });

    return new Promise((resolve, reject) => {
      const src = new Image();
      src.onload = () => {
        const out = document.createElement('canvas');
        out.width = outW;
        out.height = outH;
        const ctx = out.getContext('2d');
        if (!ctx) {
          reject(new Error('No 2d context'));
          return;
        }
        ctx.drawImage(src, srcX, srcY, srcW, srcH, 0, 0, out.width, out.height);
        out.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
          'image/png',
        );
      };
      src.onerror = reject;
      src.src = fullDataURL;
    });
  };

  return { crop, setCrop, resetCrop, exportBlob };
}
