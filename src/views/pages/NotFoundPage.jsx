import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { LocaleContext } from '../../context/LocaleContext';

function NotFoundPage() {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.querySelector('html').classList = theme;
  }, [theme]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-9xl text-sky-500 font-medium">404</h1>
      <p className="text-slate-700">{locale === 'en' ? 'Page not found!' : 'Halaman ini tidak ditemukan!'}</p>
      <Link to="/"><button type="button" className="bg-sky-200 px-5 py-3 rounded-xl shadow-sm"><p className="text-sky-500">Home</p></button></Link>
    </div>
  );
}

export default NotFoundPage;
