/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import DicodingNotesSource from '../../data/Dicoding-Notes-Source';
import NotesSource from '../../data/Notes-Source';
import { ThemeContext } from '../../context/ThemeContext';
import { LocaleContext } from '../../context/LocaleContext';

function Navbar({ searchNoteHandler }) {
  const { locale, setLocale } = useContext(LocaleContext);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const { setTheme } = useContext(ThemeContext);

  const logOutConfirm = () => {
    const confirmStatus = confirm(locale === 'en' ? 'Do you want to log out?' : 'Apakah anda ingin log out?');
    if (confirmStatus) {
      DicodingNotesSource.deleteAccessToken();
      navigate('/login');
    }
  };

  const toggleTheme = () => {
    setTheme(NotesSource.getNewTheme());
  };

  const toggleLocale = () => {
    setLocale(NotesSource.getNewLocale());
  };

  return (
    <nav className="sticky top-0 flex flex-col justify-between items-center bg-white dark:bg-slate-800 w-full px-3 py-2 shadow-sm gap-y-4">
      <div className="flex justify-between items-center w-full max-w-7xl">
        <button onClick={toggleLocale} type="button" aria-label={locale === 'en' ? 'Change languange' : 'Ganti bahasa'} className="w-[44px] h-[44px] text-gray-600 dark:text-slate-50">{locale === 'en' ? 'EN' : 'ID'}</button>
        <div className="flex gap-x-5 items-center">
          <button onClick={() => setShowSearch(!showSearch)} type="button" aria-label={locale === 'en' ? 'Search' : 'Cari'} className="w-[44px] h-[44px] group"><i className={`fa fa-search group-hover:text-sky-500 text-2xl ${showSearch === false ? 'text-gray-600 dark:text-slate-50' : 'text-sky-500'}`} /></button>
          <button type="button" aria-label={locale === 'en' ? 'Change theme' : 'Ubah tema'} className="toggle-theme w-[44px] h-[44px] group flex" onClick={toggleTheme}><i className="fa fa-moon-o m-auto text-2xl text-gray-600 group-hover:text-sky-500 font-black dark:text-sky-500" aria-hidden="true" /></button>
          <button onClick={logOutConfirm} type="button" aria-label={locale === 'en' ? 'Log out' : 'Keluar akun'} className="w-[44px] h-[44px] group flex"><i className="fa fa-sign-out m-auto text-2xl text-gray-600 group-hover:text-sky-500 font-black dark:text-slate-50" /></button>
        </div>
      </div>

      {showSearch && (
      <div className="flex bg-white dark:bg-slate-800 rounded-xl w-full px-3 py-2 justify-between gap-x-4">
        <input autoFocus autoComplete="off" onInput={(event) => searchNoteHandler(event.target.value)} className="w-full p-3 bg-gray-100 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:outline-none rounded-md focus:outline-none text-slate-700" type="text" id="search" placeholder={locale === 'en' ? 'Search note by title and body' : 'Cari berdasarkan judul atau isi catatan...'} />
      </div>
      )}
    </nav>
  );
}

Navbar.propType = {
  searchNoteHandler: PropTypes.func.isRequired,
};

export default Navbar;
