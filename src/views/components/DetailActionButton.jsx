import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import DicodingNotesSource from '../../data/Dicoding-Notes-Source';
import { LocaleContext } from '../../context/LocaleContext';

function DetailActionButton({ id }) {
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const deleteHandler = () => {
    const accessToken = DicodingNotesSource.getAccessToken();
    DicodingNotesSource.deleteNoteById(accessToken, id);
    navigate('/');
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-y-3">
      <button onClick={deleteHandler} type="button" aria-label={locale === 'en' ? 'Delete this note' : 'Hapus catatan ini'} className="w-[50px] h-[50px] bg-red-100 dark:bg-red-300 dark:hover:bg-red-400 shadow-md rounded-full hover:bg-red-400 group"><i className="fa fa-trash-o text-red-500 dark:text-red-600 text-xl group-hover:text-slate-50" aria-hidden="true" /></button>
    </div>
  );
}

DetailActionButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailActionButton;
