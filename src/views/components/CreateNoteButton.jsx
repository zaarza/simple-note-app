import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../../context/LocaleContext';

function CreateNoteButton() {
  const { locale } = useContext(LocaleContext);
  return (
    <Link to="/create">
      <div className="fixed bottom-5 right-5 flex flex-col gap-y-3">
        <button type="button" aria-label={locale === 'en' ? 'Create new note' : 'Buat catatan baru'} className="w-[50px] h-[50px] bg-sky-200 shadow-md rounded-full dark:bg-sky-500 hover:bg-sky-300 dark:hover:bg-sky-600 group"><i className="fa fa-plus text-sky-500 dark:text-slate-50 text-lg group-hover:text-slate-50" aria-hidden="true" /></button>
      </div>
    </Link>
  );
}

export default CreateNoteButton;
