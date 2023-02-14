/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import DicodingNotesSource from '../../data/Dicoding-Notes-Source';
import { ThemeContext } from '../../context/ThemeContext';
import { LocaleContext } from '../../context/LocaleContext';

function CreateNotePage({ authUser }) {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.querySelector('html').classList = theme;
  }, [theme]);

  useEffect(() => {
    if (authUser === 0) {
      navigate('/login');
    }
  }, [authUser]);

  const [newNoteData, setNewNoteData] = useState({
    title: '',
    body: '',
  });

  const newNoteDataHandler = (event) => {
    const { id, value, tagName } = event.target;
    const data = {
      ...newNoteData,
    };

    if (tagName === 'SELECT') {
      const boolean = value === 'true';
      data[id] = boolean;

      setNewNoteData(data);
      return;
    }

    data[id] = value;
    setNewNoteData(data);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const accessToken = DicodingNotesSource.getAccessToken();

    navigate('/');
    DicodingNotesSource.createNote(accessToken, { title: newNoteData.title, body: newNoteData.body });
  };

  return (
    <div className="p-3 w-full flex flex-col gap-y-4 max-w-7xl mx-auto items-center">
      <div className="w-full bg-white dark:bg-slate-800 shadow-sm px-3 py-2 rounded-xl sticky top-3">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} type="button" aria-label={locale === 'en' ? 'Back to previous page' : 'Kembail ke halaman sebelumnya'} className="w-[44px] h-[44px] bg-sky-100 rounded-xl dark:bg-slate-700"><i className="fa fa-chevron-left text-sky-500" /></button>
          <h1 className="mx-auto text-lg font-medium dark:text-slate-50 text-gray-600">{locale === 'en' ? 'Create a new note' : 'Buat catatan baru'}</h1>
        </div>
      </div>
      <form className="flex flex-col gap-y-4 w-full md:max-w-xl" onSubmit={submitHandler}>
        <div className="bg-white dark:bg-slate-700 shadow-sm rounded-xl p-5 flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-3">
            <label className="dark:text-slate-50 text-gray-600" htmlFor="title">{locale === 'en' ? 'Title' : 'Judul'}</label>
            <input className="p-3 bg-gray-100 dark:bg-slate-500 dark:text-slate-50 dark:placeholder:text-slate-700" type="text" id="title" placeholder={locale === 'en' ? 'Insert note title' : 'Masukkan judul catatan...'} value={newNoteData.title} onChange={newNoteDataHandler} />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="dark:text-slate-50 text-gray-600" htmlFor="body">{locale === 'en' ? 'Body' : 'isi'}</label>
            <textarea className="resize-none p-3 bg-gray-100 dark:bg-slate-500 dark:text-slate-50 dark:placeholder:text-slate-700 min-h-[150px]" type="text" id="body" placeholder={locale === 'en' ? 'Note body...' : 'Isi catatan...'} value={newNoteData.body} onChange={newNoteDataHandler} />
          </div>
        </div>
        <div className="p-5 bg-white dark:bg-slate-700 rounded-xl shadow-sm flex justify-between gap-x-3">
          <button onClick={() => navigate(-1)} className="w-1/2 h-[44px] bg-gray-100 text-gray-500 rounded-xl dark:bg-slate-500 dark:text-slate-50" type="button">{locale === 'en' ? 'Cancel' : 'Batal'}</button>
          <button className="w-1/2 h-[44px] bg-sky-100 text-blue-500 rounded-xl dark:bg-sky-400 dark:text-slate-50" type="submit">{locale === 'en' ? 'Create' : 'Buat'}</button>
        </div>
      </form>
    </div>
  );
}

CreateNotePage.propTypes = {
  authUser: PropTypes.number.isRequired,
};

export default CreateNotePage;
