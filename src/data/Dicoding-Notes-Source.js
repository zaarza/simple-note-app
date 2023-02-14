const BASE_URL = 'https://notes-api.dicoding.dev/v1';

const DicodingNotesSource = {
  async register({ name, email, password }) {
    const data = { name, email, password };
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, message: responseJson.message } : { error: true, message: responseJson.message };
  },

  async login({ email, password }) {
    const data = { email, password };
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, message: responseJson.message, accessToken: responseJson.data.accessToken } : { error: true, message: responseJson.message };
  },

  async getUserLoggedIn(accessToken) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    return responseJson;
  },

  async getMainNotes(accessToken) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, data: responseJson.data } : { error: true, data: null };
  },

  async getArchivedNotes(accessToken) {
    const response = await fetch(`${BASE_URL}/notes/archived`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, data: responseJson.data } : { error: true, data: null };
  },

  async getAllNotes(accessToken) {
    const mainNotes = await this.getMainNotes(accessToken);
    const archivedNotes = await this.getArchivedNotes(accessToken);
    return { main: mainNotes, archive: archivedNotes };
  },

  async getNotesById(accessToken, id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, data: responseJson.data } : { error: true, data: null };
  },

  async archiveNoteById(accessToken, id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, data: responseJson.data } : { error: true, data: null };
  },

  async unArchiveNoteById(accessToken, id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, data: responseJson.data } : { error: true, data: null };
  },

  async createNote(accessToken, { title, body, archived }) {
    const data = JSON.stringify({ title, body });
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, data: responseJson.data } : { error: true, data: null, message: responseJson.message };
  },

  async deleteNoteById(accessToken, id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.status === 'success' ? { error: false, message: responseJson.message } : { error: true, message: responseJson.message };
  },

  putAccessToken(accessToken) {
    localStorage.setItem('access-token', accessToken);
  },

  getAccessToken() {
    return localStorage.getItem('access-token');
  },

  deleteAccessToken() {
    return localStorage.clear();
  },
};

export default DicodingNotesSource;
