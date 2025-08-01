class Gallery {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async _checkResponse(res) {
    if (res.ok) return res.json();
    throw new Error(`HTTP ${res.status}`);
  }

  async _request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    return fetch(url, {
      headers: this.headers,
      ...options,
    }).then((res) => this._checkResponse(res));
  }

  async getGalleryAlbum() {
    return this._request('/api/gallery', { cache: 'no-store' });
  }
}

// Экземпляр
export const galleryService = new Gallery({
  baseUrl: process.env.API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});
