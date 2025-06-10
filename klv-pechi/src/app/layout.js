import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import FeedbackSection from '@/components/FeedbackSection/FeedbackSection';

export const metadata = {
  title: 'Колывань-Печи',
  description: 'Печи, мангалы, костровые чаши',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <FeedbackSection />
        </CartProvider>
      </body>
    </html>
  );
}
