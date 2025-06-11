import clientPromise from './mongo';

//Проверяем где работает код. Если нет виндов, то значит сервер
const isServer = typeof window === 'undefined';
const headers = { 'Content-Type': 'application/json' };

class ProductService {
  async _fetch(path) {
    const res = await fetch(path, { headers });
    if (res.ok) return res.json();
    throw new Error(`HTTP ${res.status}`);
  }

  //подключаемся к монго
  async _mongo() {
    const client = await clientPromise;
    const db = client.db('klv-pech');
    return db.collection('products');
  }

  //на сервере идёт подключение к базе напрямую
  //в браузере делается fetch на API
  async getProducts() {
    if (isServer) {
      const coll = await this._mongo();
      return coll.find({}).toArray();
    }

    return this._fetch('/api/products');
  }

  async getProductBySlug(slug) {
    if (isServer) {
      const coll = await this._mongo();
      return coll.findOne({ slug });
    }

    return this._fetch(`/api/products/${slug}`);
  }
}

export const productService = new ProductService();
