import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IErrors } from '../utils/validateLogin';

export default function useFormValidation<T>(initialState: T, validate: any, callback: any) {
  const [form, setForm] = useState<T>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {

    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback();
      }
      setIsSubmitting(false);
    }

  }, [isSubmitting, errors, form, callback])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleBlur = () => {
    setErrors(validate(form));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate(form));
    setIsSubmitting(true);
    console.log({ ...form });
  }

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    form,
    setForm,
    errors,
    isSubmitting
  };
}
