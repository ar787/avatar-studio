import { useReducer, useCallback } from 'react';
import type { AdjustState, PresetType } from '@/types/avatar';

export type { AdjustState, PresetType };

type EditorState = {
  adjustments: AdjustState;
  preset: PresetType | null;
  activeTab: 'adjust' | 'crop' | 'presets';
};

type InitialValues = {
  adjustments: AdjustState;
  preset: PresetType | null;
};

type Action =
  | { type: 'SET_BRIGHTNESS'; value: number }
  | { type: 'SET_CONTRAST'; value: number }
  | { type: 'SET_SATURATION'; value: number }
  | { type: 'SET_HUE_ROTATION'; value: number }
  | { type: 'SET_VIBRANCE'; value: number }
  | { type: 'SET_BLUR'; value: number }
  | { type: 'SET_PRESET'; preset: PresetType | null }
  | { type: 'SET_TAB'; tab: EditorState['activeTab'] }
  | { type: 'RESET'; tab: EditorState['activeTab']; initial?: InitialValues };

const defaultAdjustments: AdjustState = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hueRotation: 0,
  vibrance: 0,
  blur: 0,
};

const initialState: EditorState = {
  adjustments: defaultAdjustments,
  preset: null,
  activeTab: 'adjust',
};

function reducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case 'SET_BRIGHTNESS':
      return {
        ...state,
        adjustments: { ...state.adjustments, brightness: action.value },
      };
    case 'SET_CONTRAST':
      return {
        ...state,
        adjustments: { ...state.adjustments, contrast: action.value },
      };
    case 'SET_SATURATION':
      return {
        ...state,
        adjustments: { ...state.adjustments, saturation: action.value },
      };
    case 'SET_HUE_ROTATION':
      return {
        ...state,
        adjustments: { ...state.adjustments, hueRotation: action.value },
      };
    case 'SET_VIBRANCE':
      return {
        ...state,
        adjustments: { ...state.adjustments, vibrance: action.value },
      };
    case 'SET_BLUR':
      return {
        ...state,
        adjustments: { ...state.adjustments, blur: action.value },
      };
    case 'SET_PRESET':
      return { ...state, preset: action.preset };
    case 'SET_TAB':
      return { ...state, activeTab: action.tab };
    case 'RESET':
      return {
        adjustments: action.initial?.adjustments ?? defaultAdjustments,
        preset: action.initial?.preset ?? null,
        activeTab: action.tab,
      };
    default:
      return state;
  }
}

type UseAvatarEditorOptions = {
  initialAdjustments?: AdjustState;
  initialPreset?: PresetType | null;
};

export function useAvatarEditor({
  initialAdjustments,
  initialPreset,
}: UseAvatarEditorOptions = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...(initialAdjustments && { adjustments: initialAdjustments }),
    ...(initialPreset !== undefined && { preset: initialPreset }),
  });

  const setBrightness = useCallback(
    (value: number) => dispatch({ type: 'SET_BRIGHTNESS', value }),
    [],
  );
  const setContrast = useCallback(
    (value: number) => dispatch({ type: 'SET_CONTRAST', value }),
    [],
  );
  const setSaturation = useCallback(
    (value: number) => dispatch({ type: 'SET_SATURATION', value }),
    [],
  );
  const setHueRotation = useCallback(
    (value: number) => dispatch({ type: 'SET_HUE_ROTATION', value }),
    [],
  );
  const setVibrance = useCallback(
    (value: number) => dispatch({ type: 'SET_VIBRANCE', value }),
    [],
  );
  const setBlur = useCallback(
    (value: number) => dispatch({ type: 'SET_BLUR', value }),
    [],
  );
  const setPreset = useCallback(
    (preset: PresetType | null) => dispatch({ type: 'SET_PRESET', preset }),
    [],
  );
  const setTab = useCallback(
    (tab: EditorState['activeTab']) => dispatch({ type: 'SET_TAB', tab }),
    [],
  );
  const reset = useCallback(
    (tab: EditorState['activeTab'], initial?: InitialValues) =>
      dispatch({ type: 'RESET', tab, initial }),
    [],
  );

  return {
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
  };
}
