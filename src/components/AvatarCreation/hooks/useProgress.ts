import { useEffect, useRef, useState } from 'react';

export function useProgress() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProgress(3);
    setRunning(true);
  };

  const complete = () => {
    setRunning(false);
    setProgress(100);
    timeoutRef.current = setTimeout(() => setProgress(0), 1000);
  };

  const fail = () => {
    setRunning(false);
    timeoutRef.current = setTimeout(() => setProgress(0), 1000);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running && progress < 90) {
      interval = setInterval(() => {
        setProgress((prev) => prev + (90 - prev) * 0.1); // Slows down as it nears 90
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, progress]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { progress, start, complete, fail };
}
