import { Clock3, ShieldCheck, Sparkles } from 'lucide-react';

export function MobileWhyChoose() {
  return (
    <section className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Vii mai linistit la consultatie</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Inainte de tratament, pacientii au nevoie de claritate.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50">
              <ShieldCheck className="h-5 w-5 text-[#0B1E32]" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Explicatii clare</p>
              <p className="text-[13px] text-slate-500">Fara termeni complicati si fara graba.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50">
              <Clock3 className="h-5 w-5 text-[#0B1E32]" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Programari rapide</p>
              <p className="text-[13px] text-slate-500">Te orientam repede catre pasul potrivit.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50">
              <Sparkles className="h-5 w-5 text-[#0B1E32]" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Rezultat natural</p>
              <p className="text-[13px] text-slate-500">Punem accent pe echilibru, nu pe exces.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
