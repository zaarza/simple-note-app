/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import DetailActionButton from '../components/DetailActionButton';
import NoteCard from '../components/NoteCard';
import DicodingNotesSource from '../../data/Dicoding-Notes-Source';
import { ThemeContext } from '../../context/ThemeContext';
import { LocaleContext } from '../../context/LocaleContext';

function DetailPage({ authUser }) {
  const navigate = useNavigate();
  const params = useParams();
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const [isArchived, setIsArchived] = useState(false);

  const toggleArchiveHandler = async () => {
    const accessToken = DicodingNotesSource.getAccessToken();
    if (note.archived === true) {
      await DicodingNotesSource.unArchiveNoteById(accessToken, note.id);
      setIsArchived(!isArchived);
    } else {
      await DicodingNotesSource.archiveNoteById(accessToken, note.id);
      setIsArchived(!isArchived);
    }
  };

  useEffect(() => {
    if (authUser === 0) {
      navigate('/login');
    }
  }, [authUser]);

  useEffect(() => {
    document.querySelector('html').classList = theme;
  }, [theme]);

  useEffect(() => {
    const { noteId } = params;
    const accessToken = DicodingNotesSource.getAccessToken();
    DicodingNotesSource.getNotesById(accessToken, noteId).then(({ data }) => {
      if (data === null) {
        navigate('/404');
      }
      setNote(data);
      setLoading(false);
    });
  }, [isArchived]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ReactLoading type="spin" color="#000" height={44} width={44} />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-y-4 mx-auto items-center">
        <div className="bg-white dark:bg-slate-800 shadow-sm px-3 py-2 sticky top-0 w-full">
          <div className="max-w-7xl flex w-full mx-auto">
            <div className="flex items-center w-full">
              <button
                onClick={() => navigate(-1)}
                type="button"
                aria-label={locale === 'en' ? 'Back to previous page' : 'Kembail ke halaman sebelumnya'}
                className="w-[44px] h-[44px] bg-sky-100 rounded-md dark:bg-slate-700"
              >
                <i className="fa fa-chevron-left text-sky-500" />
              </button>
              <h1 className="mx-auto text-lg font-medium text-gray-600 dark:text-slate-50">
                {locale === 'en' ? 'Note detail' : 'Detail Catatan'}
              </h1>
            </div>
          </div>
        </div>
        <div className="px-3 w-full flex flex-col gap-y-4 items-center">
          <NoteCard note={note} size="full" />
          <button
            onClick={toggleArchiveHandler}
            className="w-full h-[50px] hover:bg-sky-100 hover:text-sky-500 shadow-sm bg-white text-gray-600 rounded-md dark:bg-slate-800 dark:hover:bg-slate-900/75 dark:text-slate-50 max-w-3xl"
            type="button"
          >
            {isArchived ? locale === 'en' ? 'Move to main note' : 'Pindah ke catatan utama' : locale === 'en' ? 'Archive' : 'Arsipkan'}
          </button>
        </div>
      </div>
      <DetailActionButton id={note.id.toString()} />
    </>
  );
}

DetailPage.propTypes = {
  authUser: PropTypes.number.isRequired,
};

export default DetailPage;
