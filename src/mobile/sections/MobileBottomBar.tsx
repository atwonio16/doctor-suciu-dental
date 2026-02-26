export function MobileBottomBar() {
  return (
    <>
      <a
        href="https://wa.me/40770220110"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact pe WhatsApp"
        className="fixed bottom-4 right-4 z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_22px_rgba(37,211,102,0.28)] active:scale-[0.96] transition-transform"
        style={{ bottom: 'max(16px, calc(env(safe-area-inset-bottom) + 12px))' }}
      >
        <svg
          className="h-[22px] w-[22px]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 11.7c0 4.58-3.72 8.3-8.3 8.3-1.47 0-2.84-.38-4.05-1.05L4 20l1.04-3.49A8.25 8.25 0 0 1 3.4 11.7c0-4.58 3.72-8.3 8.3-8.3s8.3 3.72 8.3 8.3Z"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.05 8.95c.14-.32.32-.45.57-.45h.43c.13 0 .24.07.29.2l.72 1.72a.55.55 0 0 1-.06.53l-.37.44a.38.38 0 0 0-.05.41c.45.74 1.06 1.34 1.8 1.8.13.08.31.06.42-.05l.44-.37a.53.53 0 0 1 .53-.06l1.72.72c.13.05.2.16.2.29v.43c0 .25-.13.43-.45.57-.39.17-.9.23-1.45.12-.96-.18-2.12-.87-3.28-2.03-1.16-1.16-1.85-2.32-2.03-3.28-.11-.55-.05-1.06.12-1.45Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <div aria-hidden className="h-2" />
    </>
  );
}
