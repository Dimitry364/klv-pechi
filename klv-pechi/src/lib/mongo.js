import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  // для бесплатного кластера держим пул маленьким
  maxPoolSize: 10,
  maxIdleTimeMS: 60_000, // закрывать простаивающие коннекты быстрее
  serverSelectionTimeoutMS: 5_000,
  socketTimeoutMS: 45_000,
};

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI не задан в .env.local');
}

//Кешируем промис клиента между перезагрузками процессов
let clientPromise = globalThis._mongoClientPromise;

if (!clientPromise) {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
  globalThis._mongoClientPromise = clientPromise;

  clientPromise.then((c) => {
    const close = () =>
      c
        .close()
        .catch(() => {})
        .finally(() => process.exit(0));
    process.on('SIGINT', close);
    process.on('SIGTERM', close);
  });
}

export default clientPromise;
