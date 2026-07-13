import { useEffect, useRef } from 'react';
import { Canvas, FabricImage, filters as FabricFilters, Rect } from 'fabric';
import type { AdjustState, PresetType } from './useAvatarEditor';

export const CANVAS_SIZE = 420;

type FilterConstructor = new () => InstanceType<
  typeof FabricFilters.BaseFilter
>;

const PRESET_CONSTRUCTORS: Record<PresetType, FilterConstructor> = {
  grayscale: FabricFilters.Grayscale,
  sepia: FabricFilters.Sepia,
  vintage: FabricFilters.Vintage,
  kodachrome: FabricFilters.Kodachrome,
  brownie: FabricFilters.Brownie,
  polaroid: FabricFilters.Polaroid,
  blackwhite: FabricFilters.BlackWhite,
  invert: FabricFilters.Invert,
};

function buildPresetFilter(preset: PresetType | null) {
  if (!preset) return null;
  const Ctor = PRESET_CONSTRUCTORS[preset];
  return new Ctor();
}

type UseFabricCanvasProps = {
  imageUrl: string;
  adjustments: AdjustState;
  preset: PresetType | null;
};

function applyFilters(
  img: FabricImage,
  canvas: Canvas,
  adjustments: AdjustState,
  preset: PresetType | null,
) {
  const presetFilter = buildPresetFilter(preset);
  img.filters = [
    new FabricFilters.Brightness({ brightness: adjustments.brightness }),
    new FabricFilters.Contrast({ contrast: adjustments.contrast }),
    new FabricFilters.Saturation({ saturation: adjustments.saturation }),
    new FabricFilters.HueRotation({ rotation: adjustments.hueRotation }),
    new FabricFilters.Vibrance({ vibrance: adjustments.vibrance }),
    new FabricFilters.Blur({ blur: adjustments.blur }),
    ...(presetFilter ? [presetFilter] : []),
  ];
  img.applyFilters();
  canvas.renderAll();
}

export function useFabricCanvas({
  imageUrl,
  adjustments,
  preset,
}: UseFabricCanvasProps) {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const imageRef = useRef<FabricImage | null>(null);
  const cropRectRef = useRef<Rect | null>(null);

  useEffect(() => {
    if (!canvasElRef.current) return;
    const canvas = new Canvas(canvasElRef.current, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: '#1a1a2e',
      selection: false,
    });
    fabricRef.current = canvas;
    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    let cancelled = false;
    FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' }).then((img) => {
      if (cancelled || !fabricRef.current) return;
      canvas.clear();
      cropRectRef.current = null;
      imageRef.current = img;

      const scale = Math.min(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);
      img.scale(scale);
      img.set({
        left: CANVAS_SIZE / 2,
        top: CANVAS_SIZE / 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
        hoverCursor: 'default',
      });
      canvas.add(img);
      canvas.renderAll();
    });

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  useEffect(() => {
    const img = imageRef.current;
    const canvas = fabricRef.current;
    if (!img || !canvas) return;
    applyFilters(img, canvas, adjustments, preset);
  }, [adjustments, preset]);

  return { canvasElRef, fabricRef, imageRef, cropRectRef };
}
