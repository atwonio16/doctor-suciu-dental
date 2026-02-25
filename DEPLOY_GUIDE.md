# Ghid Deploy Rapid pe Vercel

## Metoda 1: Cu Token (Eu fac totul)
Dacă vrei să fac eu deploy complet, creează un token:
1. Mergi pe https://vercel.com/account/tokens
2. Click "Create Token"
3. Dă-i numele "Deploy Doctor Suciu"
4. Copiază token-ul și trimite-mi-l

## Metoda 2: Tu faci (2 minute)

### Pasul 1: Autentificare
```bash
npx vercel login
```
Se deschide browserul, confirmi login și gata.

### Pasul 2: Setare Environment Variables
```bash
npx vercel env add VITE_SUPABASE_URL
# Când te întreabă valoarea, introdu:
# https://adgndlxetudzhrfhbpud.supabase.co

npx vercel env add VITE_SUPABASE_ANON_KEY
# Când te întreabă valoarea, introdu:
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZ25kbHhldHVkemhyZmhicHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NTMzMzMsImV4cCI6MjA4NzAyOTMzM30.ySTpayrsSAmyTHBBTcsx67szdDcRe9o3jhQcg5Bx1To
```

### Pasul 3: Deploy
```bash
npx vercel --prod
```

### Verificare
Deschide site-ul generat și testează /admin

---

## Dacă vrei să vezi codul înainte de deploy:
Am pregătit deja tot codul:
- ✅ `vercel.json` configurat pentru SPA routing
- ✅ `vite.config.ts` optimizat pentru producție  
- ✅ `src/lib/supabase.ts` cu error handling bun
- ✅ Environment variables documentate

Tot ce trebuie e să rulezi comenzile de mai sus.
