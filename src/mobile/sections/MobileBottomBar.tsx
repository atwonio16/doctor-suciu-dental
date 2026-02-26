export function MobileBottomBar() {
  return (
    <>
      <a
        href="https://wa.me/40770220110"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact pe WhatsApp"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.34)] active:scale-[0.96] transition-transform"
        style={{ bottom: 'max(16px, calc(env(safe-area-inset-bottom) + 12px))' }}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm6.7 13.95c-.29.82-1.68 1.53-2.35 1.62-.63.08-1.2.29-4.05-.85-3.43-1.38-5.62-4.9-5.78-5.12-.17-.22-1.38-1.84-1.38-3.5 0-1.67.88-2.48 1.18-2.82.3-.33.65-.42.87-.42.22 0 .43 0 .62.01.19 0 .45-.07.7.53.26.6 1.02 2.53 1.1 2.71.09.18.15.39.03.6-.12.22-.18.35-.36.54-.18.18-.37.38-.53.51-.18.15-.36.31-.22.62.14.31.63 1.03 1.35 1.67.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.53-.12.21.08 1.36.64 1.6.76.24.12.4.18.46.28.06.1.04.58-.25 1.4z" />
        </svg>
      </a>

      <div aria-hidden className="h-2" />
    </>
  );
}
