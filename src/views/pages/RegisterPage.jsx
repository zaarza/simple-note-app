// eslint-disable import/no-extraneous-dependencies
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DicodingNotesSource from '../../data/Dicoding-Notes-Source';
import NotesSource from '../../data/Notes-Source';
import { ThemeContext } from '../../context/ThemeContext';
import { LocaleContext } from '../../context/LocaleContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const { locale, setLocale } = useContext(LocaleContext);
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const registerFormDataHandler = (event) => {
    const { id } = event.target;
    const newRegisterFormData = { ...registerFormData };
    newRegisterFormData[id] = event.target.value;
    setRegisterFormData(newRegisterFormData);
  };

  const registerFormValidator = ({
    name, email, password, passwordConfirm,
  // eslint-disable-next-line consistent-return
  }) => {
    if (name === '') {
      toast.error('Nama tidak boleh kosong!', {
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
    if (passwordConfirm === '') {
      toast.error('Kata sandi konfirmasi tidak boleh kosong!', {
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
    if (registerFormData.password !== registerFormData.passwordConfirm) {
      toast.error('Kata sandi tidak cocok!', {
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

  const cleanRegisterFormData = () => {
    setRegisterFormData({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  };

  const toggleTheme = () => {
    setTheme(NotesSource.getNewTheme());
  };

  const toggleLocale = () => {
    setLocale(NotesSource.getNewLocale());
  };

  const submitRegisterHandler = async (event) => {
    event.preventDefault();
    const validateForm = registerFormValidator(registerFormData);
    if (validateForm.error) return;

    const { error, message } = await DicodingNotesSource.register(registerFormData);
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
    toast.success(locale === 'en' ? 'Account created successfully' : 'Berhasil membuat akun', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
    cleanRegisterFormData();
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  useEffect(() => {
    document.title = 'Daftar';
  }, []);

  useEffect(() => {
    document.querySelector('html').classList = theme;
  }, [theme]);

  return (
    <div className="max-w-sm h-screen flex mx-auto flex-col p-3">
      <div className="h-[550px] flex flex-col m-auto">
        <div className="bg-white dark:bg-slate-700 w-full m-auto flex flex-col gap-y-14 rounded-md p-6">
          <div className="">
            <h1 className="text-3xl text-center dark:text-slate-50 text-gray-800">{locale === 'en' ? 'Create new account' : 'Buat akun baru'}</h1>
            <h2 className="text-slate-600 text-center dark:text-slate-400">{locale === 'en' ? 'Register account to use notes app' : 'Lakukan registrasi akun agar bisa mengakses aplikasi'}</h2>
          </div>
          <form onSubmit={submitRegisterHandler} className="flex flex-col gap-y-4">
            <input onInput={registerFormDataHandler} value={registerFormData.name} type="text" id="name" className="bg-gray-100 dark:bg-slate-500 rounded-md p-3 dark:text-slate-50" placeholder={locale === 'en' ? 'Name' : 'Nama'} />
            <input onInput={registerFormDataHandler} value={registerFormData.email} type="email" id="email" className="bg-gray-100 dark:bg-slate-500 rounded-md p-3 dark:text-slate-50" placeholder="Email" />
            <input onInput={registerFormDataHandler} value={registerFormData.password} type="password" id="password" className="bg-gray-100 dark:bg-slate-500 rounded-md p-3 dark:text-slate-50" placeholder={locale === 'en' ? 'Password' : 'Kata sandi'} />
            <input onInput={registerFormDataHandler} value={registerFormData.passwordConfirm} type="password" id="passwordConfirm" className="bg-gray-100 dark:bg-slate-500 rounded-md p-3 dark:text-slate-50" placeholder={locale === 'en' ? 'Password confirm' : 'Konfirmasi kata sandi'} />
            <button type="submit" className="bg-sky-100 text-sky-500 h-[44px] rounded-md dark:bg-sky-700 dark:text-slate-50">{locale === 'en' ? 'Register' : 'Daftar'} </button>
          </form>
        </div>
      </div>
      <div className="">
        <h2 className="text-slate-600 text-center dark:text-slate-50">{locale === 'en' ? 'Already have an account?' : 'Sudah memiliki akun?'}  <Link to="/" className="text-sky-500">{locale === 'en' ? 'Login' : 'Masuk'} </Link></h2>
        <div className="flex justify-center">
          <button onClick={toggleLocale} type="button" className="text-slate-600 dark:text-slate-50 font-semibold">{locale === 'en' ? 'EN' : 'ID'}</button>
          <button onClick={toggleTheme} type="button" aria-label={locale === 'en' ? 'Change theme' : 'Ubah tema'} className="toggle-theme w-[44px] h-[44px] group flex"><i className="fa fa-moon-o m-auto text-2xl text-gray-600 group-hover:text-sky-500 font-black dark:text-sky-500" /></button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
