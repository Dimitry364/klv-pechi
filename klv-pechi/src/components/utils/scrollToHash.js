export default function scrollToHash(hash, headerOffset = 100) {
  console.log('🔍 scrollToHash вызван с:', hash);
  if (!hash) return;

  const id = hash.replace('#', '');
  const el = document.querySelector(`#${id}`);

  if (!el) {
    console.warn('⚠️ scrollToHash: элемент не найден по id:', id);
    return;
  }

  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    console.log('📐 Позиция элемента:', elementPosition);
    console.log('📏 Позиция с учётом отступа:', offsetPosition);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
  console.log('✅ Скролл выполнен');
}
