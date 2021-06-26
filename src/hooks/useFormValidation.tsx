import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IForm } from '../components/Auth/Login';
import validateLogin, { IErrors } from '../utils/validateLogin';

export default function useFormValidation(initialState: IForm, authenticate: () => void) {
  const [form, setForm] = useState<IForm>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {

    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('authenticated', form);
        authenticate();
      }
      setIsSubmitting(false);
    }

  }, [isSubmitting, errors, form, authenticate])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleBlur = () => {
    setErrors(validateLogin(form));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validateLogin(form));
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
