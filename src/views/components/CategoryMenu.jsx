import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '../../context/LocaleContext';

function CategoryMenu({ categoryMenuHandler, activeCategory }) {
  const { locale } = useContext(LocaleContext);
  const mainCategoryHandler = () => {
    categoryMenuHandler('main');
  };

  const archiveCategoryHandler = () => {
    categoryMenuHandler('archive');
  };

  const activeCategoryClass = () => 'dark:text-sky-500 text-sky-500 font-medium w-1/2 h-[50px] rounded-md';
  const unActiveCategoryClass = () => 'dark:text-slate-50 w-1/2 h-[50px] rounded-md text-gray-600 hover:text-sky-400 dark:hover:text-sky-500';

  return (
    <div className="category-menu gap-x-5 justify-center rounded-xl flex mx-auto">
      <button type="button" aria-label={locale === 'en' ? 'Main notes' : 'Catatan utama'} className={activeCategory === 'main' ? activeCategoryClass() : unActiveCategoryClass()} onClick={mainCategoryHandler}>{locale === 'en' ? 'Main' : 'Utama'}</button>
      <button type="button" aria-label={locale === 'en' ? 'Archived notes' : 'Arsip'} className={activeCategory === 'archive' ? activeCategoryClass() : unActiveCategoryClass()} onClick={archiveCategoryHandler}>{locale === 'en' ? 'Archive' : 'Arsip'}</button>
    </div>
  );
}

CategoryMenu.propTypes = {
  categoryMenuHandler: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default CategoryMenu;
