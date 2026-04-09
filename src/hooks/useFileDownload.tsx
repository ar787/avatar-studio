import { useState } from 'react';
import { generateUniqueFileName } from '@/utils/generateUniqueFileName';

type UseFileDownloadProps = {
  onDownload: () => Promise<Blob>;
  onSuccess: () => void;
  onError: () => void;
};

export function useFileDownload({
  onDownload,
  onSuccess,
  onError,
}: UseFileDownloadProps) {
  const [loading, setLoading] = useState(false);
  async function handleDownload(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    try {
      e.stopPropagation();
      setLoading(true);
      const blob = await onDownload();
      onSuccess();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = generateUniqueFileName('avatar', 'png');
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      onError();
    } finally {
      setLoading(false);
    }
  }

  return { handleDownload, loading };
}
