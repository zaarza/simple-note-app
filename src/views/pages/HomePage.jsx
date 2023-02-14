/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import CategoryMenu from '../components/CategoryMenu';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import CreateNoteButton from '../components/CreateNoteButton';
import DicodingNotesSource from '../../data/Dicoding-Notes-Source';
import NotesSource from '../../data/Notes-Source';
import { ThemeContext } from '../../context/ThemeContext';
import { LocaleContext } from '../../context/LocaleContext';

function HomePage({ authUser }) {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('main');
  const [notes, setNotes] = useState({
    main: [],
    archive: [],
  });

  const categoryMenuHandler = (category) => {
    setActiveCategory(category);
  };

  const searchNoteHandler = (searchQuery) => {
    const allNotes = [...notes.main, ...notes.archive];
    const result = NotesSource.searchNoteByTitleAndBody(allNotes, searchQuery);
    const accessToken = DicodingNotesSource.getAccessToken();

    if (searchQuery === '') {
      DicodingNotesSource.getAllNotes(accessToken).then(({ main, archive }) => {
        setNotes({
          main: main.data,
          archive: archive.data,
        });
      });
    }

    setNotes({
      main: NotesSource.getMainNotes(result),
      archive: NotesSource.getArchivedNotes(result),
    });
  };

  const showEmptyNotesInformation = () => <div className="bg-white dark:bg-slate-700 w-full h-[100px] rounded-xl flex shadow-sm"><p className="m-auto text-gray-600 dark:text-slate-50">{locale === 'en' ? 'Notes is empty' : 'Catatan kosong'}</p></div>;

  useEffect(() => {
    document.querySelector('html').classList = theme;
  }, [theme]);

  useEffect(() => {
    document.title = 'Note App';
    if (authUser === 0) {
      navigate('/login');
    }

    const accessToken = DicodingNotesSource.getAccessToken();
    DicodingNotesSource.getAllNotes(accessToken).then(({ main, archive }) => {
      setNotes({
        main: main.data,
        archive: archive.data,
      });

      setLoading(false);
    });

    return () => {
      setNotes({
        main: [],
        archive: [],
      });
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ReactLoading type="spin" color="#000" height={44} width={44} />
      </div>
    );
  }

  return (
    <div className="page pb-5 flex flex-col gap-y-4 mx-auto">
      <Navbar searchNoteHandler={searchNoteHandler} />
      <CategoryMenu categoryMenuHandler={categoryMenuHandler} activeCategory={activeCategory} className="text-red-500" />
      <ul className="notes-list flex flex-col gap-3 md:flex-row md:flex-wrap p-3 w-full max-w-7xl mx-auto">
        {notes[activeCategory].length === 0 ? showEmptyNotesInformation() : notes[activeCategory].map((note) => <NoteCard key={note.id} size="small" note={note} />)}
      </ul>
      {notes[activeCategory].length !== 0 && <p className="text-slate-500 dark:text-slate-300 text-center">{locale === 'en' ? 'Notes count: ' : 'Jumlah catatan: '}{notes[activeCategory].length}</p>}
      <CreateNoteButton />
    </div>
  );
}

HomePage.propTypes = {
  authUser: PropTypes.number.isRequired,
};

export default HomePage;
