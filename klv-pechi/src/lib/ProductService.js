class ProductService {
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

  /** Вернуть все продукты */
  async getProducts() {
    return this._request('/api/products');
  }

  /** Вернуть один продукт по slug */
  async getProductBySlug(slug) {
    return this._request(`/api/products/${encodeURIComponent(slug)}`);
  }
}

// Экземпляр
export const productService = new ProductService({
  baseUrl: process.env.API_URL,
  headers: { 'Content-Type': 'application/json' },
});
