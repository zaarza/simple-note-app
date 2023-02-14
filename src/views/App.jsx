/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import CreateNotePage from './pages/CreateNotePage';
import NotesSource from '../data/Notes-Source';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DicodingNotesSource from '../data/Dicoding-Notes-Source';
import { ThemeContextProvider } from '../context/ThemeContext';
import { LocaleContextProvider } from '../context/LocaleContext';

function App() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(0);
  const [theme, setTheme] = useState(null);
  const [locale, setLocale] = useState(null);

  const onLoginSuccess = (accessToken) => {
    DicodingNotesSource.putAccessToken(accessToken);
    setAuthUser(1);
    navigate('/');
  };

  useEffect(() => {
    document.querySelector('html').classList = theme;
    const accessToken = DicodingNotesSource.getAccessToken();
    const getUser = async () => {
      const { data } = await DicodingNotesSource.getUserLoggedIn(accessToken);

      if (!data) {
        navigate('/login');
        setAuthUser(0);
      }
      setAuthUser(1);
    };

    if (accessToken) {
      getUser();
    }
  }, [authUser]);
  useEffect(() => {
    const currentTheme = NotesSource.getTheme();
    if (currentTheme === null) {
      NotesSource.putTheme('light');
    }
    setTheme(NotesSource.getTheme());
  }, [theme]);

  useEffect(() => {
    const currentLocale = NotesSource.getLocale();
    if (currentLocale === null) {
      NotesSource.putLocale('en');
    }
    setLocale(NotesSource.getLocale());
  }, [locale]);

  if (authUser === 0) {
    return (
      <LocaleContextProvider value={{ locale, setLocale }}>
        <ThemeContextProvider value={{ theme, setTheme }}>
          <Routes>
            <Route path="/" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
            <Route path="*" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </ThemeContextProvider>
      </LocaleContextProvider>
    );
  }

  return (
    <LocaleContextProvider value={{ locale, setLocale }}>
      <ThemeContextProvider value={{ theme, setTheme }}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
          <Route path="/" element={<HomePage authUser={authUser} />} />
          <Route path="/home" element={<HomePage authUser={authUser} />} />
          <Route path="/detail/:noteId" element={<DetailPage authUser={authUser} />} />
          <Route path="/create" element={<CreateNotePage authUser={authUser} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeContextProvider>
    </LocaleContextProvider>
  );
}

export default App;
