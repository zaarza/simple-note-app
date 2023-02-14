/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import DicodingNotesSource from '../../data/Dicoding-Notes-Source';
import NotesSource from '../../data/Notes-Source';
import { ThemeContext } from '../../context/ThemeContext';
import { LocaleContext } from '../../context/LocaleContext';

function LoginPage({ onLoginSuccess }) {
  const { locale, setLocale } = useContext(LocaleContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const loginFormDataHandler = (event) => {
    const { id } = event.target;
    const newLoginFormData = { ...loginFormData };
    newLoginFormData[id] = event.target.value;
    setLoginFormData(newLoginFormData);
  };

  const loginFormValidator = ({ email, password }) => {
    if (email === '') {
      toast.error('Email tidak boleh kosong!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return { error: true };
    }
    if (password === '') {
      toast.error('Kata sandi tidak boleh kosong!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return { error: true };
    }
    return { error: false };
  };

  const submitLoginHandler = async (event) => {
    event.preventDefault();
    const validateForm = loginFormValidator(loginFormData);
    if (validateForm.error) return;

    const { error, message, accessToken } = await DicodingNotesSource.login(loginFormData);
    if (error) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return;
    }

    toast.success(message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
    onLoginSuccess(accessToken);
  };

  const toggleTheme = () => {
    setTheme(NotesSource.getNewTheme());
  };

  const toggleLocale = () => {
    setLocale(NotesSource.getNewLocale());
  };

  useEffect(() => {
    document.querySelector('html').classList = theme;
  }, [theme]);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="max-w-sm flex h-screen mx-auto flex-col p-3">
      <div className="h-[500px] flex flex-col m-auto">
        <div className="bg-white dark:bg-slate-700 m-auto flex flex-col gap-y-14 rounded-md p-6 shadow-sm">
          <div className="">
            <h1 className="text-gray-800 text-3xl text-center dark:text-slate-50">{locale === 'en' ? 'Login' : 'Masuk'}</h1>
            <h2 className="text-gray-600 text-center text-sm2 dark:text-slate-400">{locale === 'en' ? 'Log in into your account to access your notes' : 'Masuk ke akun Anda untuk mengakses catatan Anda'}</h2>
          </div>
          <form onSubmit={submitLoginHandler} className="flex flex-col gap-y-4">
            <input autoComplete="off" onInput={loginFormDataHandler} value={loginFormData.email} type="email" id="email" className="bg-gray-100 dark:text-slate-50 dark:bg-slate-500 rounded-md p-3" placeholder="Email" />
            <input onInput={loginFormDataHandler} value={loginFormDataHandler.password} type="password" id="password" className="bg-gray-100 dark:bg-slate-500 dark:text-slate-50 rounded-md p-3" placeholder={locale === 'en' ? 'Password' : 'Kata sandi'} />
            <button type="submit" className="bg-sky-100 dark:bg-sky-700  text-sky-500 dark:text-slate-50 h-[44px] rounded-md">{locale === 'en' ? 'Log in' : 'Masuk'}</button>
          </form>
        </div>
        <h2 className="text-slate-600 text-center dark:text-slate-50">{locale === 'en' ? "Doesn't have an account?" : 'Belum memiliki akun?'}<Link to="/register" className="text-sky-500">{locale === 'en' ? ' Register' : ' Daftar'}</Link></h2>
        <div className="flex justify-center gap-x-2">
          <button onClick={toggleLocale} type="button" className="text-slate-600 dark:text-slate-50 font-semibold">{locale === 'en' ? 'EN' : 'ID'}</button>
          <button onClick={toggleTheme} type="button" aria-label="Ubah tema" className="toggle-theme w-[44px] h-[44px] group flex"><i className="fa fa-moon-o m-auto text-2xl text-gray-600 group-hover:text-sky-500 font-black dark:text-sky-500" /></button>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
