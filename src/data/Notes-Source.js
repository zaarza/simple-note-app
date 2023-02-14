const NotesSource = {
  searchNoteByTitleAndBody(source, searchQuery) {
    const result = source.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.body.toLowerCase().includes(searchQuery.toLowerCase()));
    return result;
  },

  getMainNotes(source) {
    return source.filter((note) => note.archived === false);
  },

  getArchivedNotes(source) {
    return source.filter((note) => note.archived === true);
  },

  getLocale() {
    return localStorage.getItem('locale');
  },

  putLocale(locale) {
    return localStorage.setItem('locale', locale);
  },

  getNewLocale() {
    const currentLocale = this.getLocale();
    const newLocale = currentLocale === 'en' ? 'id' : 'en';
    localStorage.setItem('locale', newLocale);
    return newLocale;
  },

  getTheme() {
    return localStorage.getItem('theme');
  },

  putTheme(theme) {
    return localStorage.setItem('theme', theme);
  },

  getNewTheme() {
    const currentTheme = NotesSource.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return newTheme;
  },

  toggleTheme() {
    const currentTheme = this.getTheme();
    return currentTheme === 'light' ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
  },
};

export default NotesSource;
