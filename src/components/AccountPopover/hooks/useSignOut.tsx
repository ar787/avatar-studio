import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import router from '../../../router';

type UseSignOutProps = {
  signOut: () => Promise<void>;
  onSuccess?: () => void;
  onError?: () => void;
};
export const useSignOut = ({
  signOut,
  onSuccess = () => {},
  onError = () => {},
}: UseSignOutProps) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      navigate({ to: '/sign-in', replace: true });
      router.update({
        context: { auth: undefined!, notification: undefined! },
      });
      onSuccess();
    } catch {
      onError();
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignOut,
    loading,
  };
};
