export default function scrollToHash(hash, headerOffset = 100) {
  if (!hash) return;

  const id = hash.replace('#', '');
  const el = document.querySelector(`#${id}`);

  if (!el) {
    return;
  }

  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
