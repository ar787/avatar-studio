import { useState } from 'react';

import { mapFirebaseAuthError } from '../utils/mapFirebaseAuthError';

type AsyncFunc = (email: string, password: string) => unknown;

type UseAuthFormOptions<T> = {
  authAction: T;
  onUnexpectedError?: () => void;
  onSuccess?: () => void;
};

export function useAuthForm<T extends AsyncFunc>({
  authAction,
  onUnexpectedError,
  onSuccess,
}: UseAuthFormOptions<T>) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  }

  function validate() {
    const newErrors = {
      email: values.email.trim() ? '' : 'This field cannot be empty',
      password: values.password.trim() ? '' : 'This field cannot be empty',
    };

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  }

  async function submit() {
    try {
      if (!validate()) {
        return;
      }
      setLoading(true);

      await authAction(values.email, values.password);
      onSuccess?.();
    } catch (error) {
      const mappedErrors = mapFirebaseAuthError(error);
      if (mappedErrors) {
        setErrors((prev) => ({ ...prev, ...mappedErrors }));
      } else {
        onUnexpectedError?.();
      }
    } finally {
      setLoading(false);
    }
  }

  return { values, errors, loading, setField, submit };
}
