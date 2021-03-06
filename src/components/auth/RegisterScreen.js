import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordAndName } from '../../actions/auth';

import { setError, removeError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [values, handleInputChange] = useForm({
    name: 'Andrés',
    email: 'andressalgado41@gmail.com',
    password: '123456',
    password2: '123456',
  });

  const { name, email, password, password2 } = values;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordAndName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Password should be at least 6 characters and match'));
      return false;
    } else {
      dispatch(removeError());
      return true;
    }
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      {msgError && <div className="auth__alert-error">{msgError}</div>}
      <form onSubmit={handleRegister} className="animate__animated animate__fadeIn animate__faster">
        <input className="auth__input" type="text" placeholder="Name" name="name" autoComplete="off" value={name} onChange={handleInputChange} />
        <input className="auth__input" type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={handleInputChange} />
        <input className="auth__input" type="password" placeholder="Password" name="password" autoComplete="off" value={password} onChange={handleInputChange} />
        <input className="auth__input" type="password" placeholder="Confirm Password" name="password2" autoComplete="off" value={password2} onChange={handleInputChange} />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link mt-5" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};
