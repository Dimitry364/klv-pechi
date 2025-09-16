export const metadata = { title: 'Admin' };

export default function AdminLayout({ children }) {
  return (
    <html lang='ru'>
      <body>{children}</body>
    </html>
  );
}
