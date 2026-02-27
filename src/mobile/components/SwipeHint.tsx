export function SwipeHint() {
  return (
    <div className="flex items-center justify-center gap-2 text-slate-400">
      {/* Săgeată stânga cu animație */}
      <svg 
        className="h-4 w-4 animate-[swipeLeft_1.5s_ease-in-out_infinite]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      
      <span className="text-[12px] font-medium tracking-wide">Glisează</span>
      
      {/* Săgeată dreapta cu animație */}
      <svg 
        className="h-4 w-4 animate-[swipeRight_1.5s_ease-in-out_infinite]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
      
      <style>{`
        @keyframes swipeLeft {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(-3px); opacity: 1; }
        }
        @keyframes swipeRight {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
