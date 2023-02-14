/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LocaleContext } from '../../context/LocaleContext';

function NoteCard({ size, note }) {
  const { locale } = useContext(LocaleContext);
  const [currentNote, setCurrentNote] = useState([]);

  useEffect(() => {
    setCurrentNote(note);
  });

  const getFullDate = (date, local) => {
    const fullDate = new Date(date).toLocaleDateString(local, {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    });
    return fullDate;
  };

  return (
    <>
      {size === 'small' && (
      <Link to={`detail/${note.id}`}>
        <li className="w-[300px] h-[250px] bg-white dark:bg-slate-700 rounded-md p-5 flex flex-col gap-y-2 shadow-sm hover:bg-sky-100 dark:hover:bg-slate-800 group">
          <h1 className="font-medium text-xl text-sky-500 whitespace-nowrap overflow-hidden text-ellipsis">{currentNote.title}</h1>
          <p className="text-gray-600 w-full dark:text-slate-50 text-sm line-clamp-5 leading-6">{currentNote.body}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-auto overflow-hidden">{locale === 'en' ? `Created at : ${getFullDate(currentNote.createdAt, 'en-EN')}` : `Dibuat pada : ${getFullDate(currentNote.createdAt, 'id-ID')}` }</p>
        </li>
      </Link>
      )}
      {size === 'full' && (
      <li className="w-full min-h-[400px] bg-white dark:bg-slate-700 rounded-md p-5 flex flex-col gap-y-2 shadow-sm max-w-3xl">
        <h1 className="font-medium text-xl text-sky-500 whitespace-nowrap overflow-hidden text-ellipsis">{currentNote.title}</h1>
        <p className="text-gray-600 w-full dark:text-slate-50 text-sm leading-6">{currentNote.body}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-auto overflow-hidden">{locale === 'en' ? `Created at : ${getFullDate(currentNote.createdAt, 'en-EN')}` : `Dibuat pada : ${getFullDate(currentNote.createdAt, 'id-ID')}` }</p>
      </li>
      )}
    </>
  );
}

NoteCard.propTypes = {
  size: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
};

export default NoteCard;
