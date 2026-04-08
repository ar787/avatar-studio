import { useState } from 'react';

import { mapFirebaseAuthError } from '@/utils/mapFirebaseAuthError';

type ValidationRule = [boolean, string];
type ValidationSchema<Value> = Partial<
  Record<keyof Value, ValidationRule | ValidationRule[]>
>;
type AuthActionFunc = (email: string, password: string) => unknown;
type UseAuthFormOptions<T, Value> = {
  authAction: T;
  inputValues: Value;
  onUnexpectedError?: () => void;
  onSuccess?: () => void;
  extraValidation?: (args: Value) => ValidationSchema<Value>;
};

export function useAuthForm<
  T extends AuthActionFunc,
  Value extends Record<string, string>,
>({
  inputValues,
  authAction,
  onUnexpectedError,
  onSuccess,
  extraValidation,
}: UseAuthFormOptions<T, Value>) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState<Record<keyof Value, string>>(values);
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  }

  function validate() {
    const newErrors = {} as Record<keyof Value, string>;

    const rules = (extraValidation?.(values) ?? {}) as Partial<
      Record<keyof Value, ValidationSchema<Value>>
    >;

    (Object.keys(values) as Array<keyof Value>).forEach((key) => {
      const value = values[key];

      const isRequiredFilled = value.trim() !== '';
      const requiredRule: ValidationRule = [
        !isRequiredFilled,
        'This field cannot be empty',
      ];

      const fieldRules = rules[key];
      let normalizedRules: ValidationRule[] = [requiredRule];
      if (fieldRules) {
        if (Array.isArray(fieldRules[0])) {
          normalizedRules = [
            ...normalizedRules,
            ...(fieldRules as ValidationRule[]),
          ];
        } else {
          normalizedRules.push(fieldRules as ValidationRule);
        }
      }
      const failingRule = normalizedRules.find((rule) => rule[0]);

      newErrors[key] = failingRule ? failingRule[1] : '';
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

  return { values, errors, loading, setField, submit, validate };
}
