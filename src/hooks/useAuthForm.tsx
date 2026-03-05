import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { FirebaseError } from '@firebase/util';

type AsyncFunc = (email: string, password: string) => unknown;

type UseAuthFormOptions<T> = {
  authAction: T;
  onUnexpectedError?: () => void;
};

export function useAuthForm<T extends AsyncFunc>({
  authAction,
  onUnexpectedError,
}: UseAuthFormOptions<T>) {
  const navigate = useNavigate();
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

      navigate({ to: '/' });
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/weak-password':
            setErrors((prev) => ({
              ...prev,
              password: 'Password must be at least 6 characters.',
            }));
            break;
          case 'auth/email-already-in-use':
            setErrors((prev) => ({
              ...prev,
              email: 'This email is already registered.',
            }));
            break;
          case 'auth/invalid-email':
            setErrors((prev) => ({
              ...prev,
              email: 'The email address is badly formatted.',
            }));
            break;
          case 'auth/wrong-password':
            setErrors((prev) => ({
              ...prev,
              password: 'Invalid email or password',
            }));
            break;
          case 'auth/user-not-found':
            setErrors((prev) => ({
              ...prev,
              email: 'Invalid email or password',
            }));
            break;
          default:
            onUnexpectedError?.();
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return { values, errors, loading, setField, submit };
}
