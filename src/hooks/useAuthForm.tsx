import { useState } from 'react';

import { mapFirebaseAuthError } from '@/utils/mapFirebaseAuthError';

type ValidationRule = [boolean, string];
type ValidationSchema<V> = Partial<
  Record<keyof V, ValidationRule | ValidationRule[]>
>;
type AuthActionFunc = (email: string, password: string) => unknown;
type UseAuthFormOptions<T, V> = {
  authAction: T;
  inputValues: V;
  onUnexpectedError?: () => void;
  onSuccess?: () => void;
  extraValidation?: (args: V) => ValidationSchema<V>;
};

export function useAuthForm<
  T extends AuthActionFunc,
  V extends Record<string, string>,
>({
  inputValues,
  authAction,
  onUnexpectedError,
  onSuccess,
  extraValidation,
}: UseAuthFormOptions<T, V>) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState<Record<keyof V, string>>(values);
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  }

  function validate() {
    const newErrors = {} as Record<keyof V, string>;

    (Object.keys(values) as Array<keyof V>).forEach((key) => {
      const value = values[key];
      newErrors[key] = value.trim() ? '' : 'This field cannot be empty';
    });

    const rules = (extraValidation?.(values) ?? {}) as Partial<
      Record<keyof V, ValidationSchema<V>>
    >;

    (Object.keys(rules) as Array<keyof V>).forEach((key) => {
      const ruleItem = rules[key];
      if (ruleItem === undefined) {
        return;
      }

      if (Array.isArray(ruleItem[0])) {
        const ruleArray = ruleItem as ValidationRule[];
        const failingRule = ruleArray.find((rule) => rule[0]);
        newErrors[key] = failingRule ? failingRule[1] : '';
      } else {
        const ruleArray = ruleItem as ValidationRule;
        const failingRule = ruleArray[0] ? ruleArray : undefined;
        newErrors[key] = failingRule ? failingRule[1] : '';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => newErrors[key] === '');
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
