export default function Footer() {
  const scrollHome = (event) => {
    event.preventDefault();
    const target = document.querySelector('#home');
    if (!target) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      return;
    }

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className="w-full px-4 pb-28 sm:px-8 lg:px-12"
      style={{ background: 'var(--page-background)' }}
    >
      <div
        className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t pt-6 text-[10px] sm:flex-row sm:items-end sm:justify-between"
        style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
      >
        <div>
          <a
            href="#home"
            onClick={scrollHome}
            className="text-lg font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            daniel<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <p className="mt-2">&copy; {new Date().getFullYear()} Daniel Aplan. All rights reserved.</p>
        </div>
        <p>Designed and built in the Philippines.</p>
      </div>
    </footer>
  );
}
