import React, { ChangeEvent, useState } from 'react'
import firebase from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import validateLogin from '../../utils/validateLogin';


export type IForm = {
  name: string;
  email: string;
  password: string;
}

const formInitialState = { name: '', email: '', password: '' };

export const Login = () => {

  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);
  const navigate = useNavigate();

  const authenticateUser = async () => {
    try {
      const { name, email, password } = form;
      login ?
        await firebase.login(email, password) :
        await firebase.register(name, email, password);
      navigate('/');
    } catch (err) {
      console.error('Auth error', err);
      setFirebaseError(err.message);
    }
  }

  const { handleChange, handleBlur, handleSubmit, form, setForm, errors, isSubmitting } =
    useFormValidation<IForm>(formInitialState, validateLogin, authenticateUser);

  const handleChangeAuth = () => {
    setLogin(prev => !prev);
    setForm(formInitialState);
  }

  return (
    <div>
      <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>
      <form action="" className="flex flex-column" onSubmit={handleSubmit}>
        {!login && <input
          type="text"
          placeholder="Your name"
          autoComplete="off"
          value={form.name}
          onBlur={handleBlur}
          onChange={handleChange}
          name="name"
        />}

        <input
          className={(errors.email && login) ? 'error-input' : ''}
          type="email"
          placeholder="Your email"
          autoComplete="off"
          value={form.email}
          onBlur={handleBlur}
          onChange={handleChange}
          name="email"
        />

        {(errors.email && login) ? <p className="error-text">{errors.email}</p> : ''}

        <input
          type="password"
          value={form.password}
          placeholder="Choose a password"
          autoComplete="off"
          onBlur={handleBlur}
          className={(errors.password && login) ? 'error-input' : ''}
          onChange={handleChange}
          name="password"
        />

        {(errors.password && login) ? <p className="error-text">{errors.password}</p> : ''}
        {firebaseError ? <p className="error-text">{firebaseError}</p> : ''}

        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'gren' : 'orange' }}
          >
            Submit
          </button>
          <button type="button" className="button pointer" onClick={handleChangeAuth}>
            {login ? 'Need to create an account?' : 'Already have an account?'}
          </button>
        </div>
        <div className="forgot-password">
          <Link to="/forgot">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}
