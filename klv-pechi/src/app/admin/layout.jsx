import { createPageMetadata } from '@/seo/baseSeo';

export const metadata = createPageMetadata({
  title: 'Admin',
  description: 'Панель управления контентом сайта Колывань-Печи.',
  path: '/admin',
  index: false, // админка noindex
});

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
