import { IForm } from '../components/Auth/Login'

export interface IErrors {
  email?: string;
  password?: string;
  description?: string;
  url?: string;
}

const validateLogin = (form: any) => {
  let errors: IErrors = {};

  if (!form.email) {
    errors.email = 'Email required';
  } else if (!validateEmail(form.email)) {
    errors.email = 'Invalid Email adress';
  }

  if (!form.password) {
    errors.password = 'Password required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export default validateLogin
