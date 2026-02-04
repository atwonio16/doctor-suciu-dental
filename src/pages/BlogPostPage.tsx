import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ArrowRight, Heart, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';

const posts = [
  {
    id: 1,
    title: 'Cum să îți îngrijești dinții corect acasă',
    excerpt: 'Descoperă tehnici simple de periaj și folosirea aței dentare pentru o igienă orală perfectă.',
    content: `
      <p class="text-lg leading-relaxed mb-6">O igienă orală corectă este fundamentală pentru sănătatea dinților și gingiilor. Mulți dintre noi periem dinții zilnic, dar oare facem acest lucru corect? Iată câteva reguli esențiale recomandate de specialiștii noștri:</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">1. Periajul corect</h2>
      <p class="leading-relaxed mb-4">Folosește o periuță de dinți moale și pastă fluorurată. Periază timp de 2 minute, de două ori pe zi, cu mișcări circulare blânde. Nu uita să periezi și suprafețele interioare ale dinților și limba, unde se adună bacterii.</p>
      
      <div class="bg-sky-50 border-l-4 border-[#0891b2] p-6 my-8 rounded-r-lg">
        <p class="text-[#0f172a] font-medium">💡 Sfat de la specialist:</p>
        <p class="text-[#475569] mt-1">Înlocuiește periuța de dinți la fiecare 3 luni sau mai devreme dacă periile sunt uzate.</p>
      </div>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">2. Folosirea aței dentare</h2>
      <p class="leading-relaxed mb-4">Ața dentară ajută la îndepărtarea plăcii bacteriene și a resturilor alimentare din zonele greu accesibile. Folosește-o zilnic, preferabil înainte de periajul de seară.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">3. Apa de gură</h2>
      <p class="leading-relaxed mb-4">O apă de gură antibacteriană poate completa rutina de igienă, dar nu înlocuiește periajul și ața dentară. Alege o formulă fără alcool pentru a evita uscarea gurii.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">4. Vizite regulate la dentist</h2>
      <p class="leading-relaxed mb-6">Programează controale stomatologice la fiecare 6 luni pentru prevenirea problemelor. Prevenția este întotdeauna mai puțin costisitoare decât tratamentul!</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'Igienă',
    author: 'Dr. Suciu Sebastian',
    authorRole: 'Medic Stomatolog',
    date: '15 Ianuarie 2026',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Tot ce trebuie să știi despre Invisalign',
    excerpt: 'Cum funcționează alinierele transparente și de ce sunt preferate de adulți.',
    content: `
      <p class="text-lg leading-relaxed mb-6">Invisalign este un sistem modern de îndreptare a dinților care folosește alignere transparente în locul aparatelor dentare tradiționale. A devenit extrem de popular în rândul adulților care doresc să își îndrepte dinții discret.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Cum funcționează?</h2>
      <p class="leading-relaxed mb-4">Alignerele sunt fabricate personalizat pentru fiecare pacient folosind tehnologie 3D avansată. Fiecare set de alignere se poartă 1-2 săptămâni, deplasând treptat dinții în poziția dorită.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Avantaje principale</h2>
      <ul class="space-y-3 mb-6">
        <li class="flex items-start gap-3">
          <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
          <span>Aproape invizibile - nimeni nu va ști că porți aparat</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
          <span>Se pot scoate la masă și periaj</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
          <span>Mai confortabile decât bracket-urile metalice</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
          <span>Rezultate predictibile cu simulare 3D înainte de tratament</span>
        </li>
      </ul>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Durata tratamentului</h2>
      <p class="leading-relaxed mb-6">În funcție de complexitatea cazului, tratamentul poate dura între 6 și 18 luni. În cadrul consultației gratuite, îți vom putea spune exact cât va dura în cazul tău.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'Ortodonție',
    author: 'Dr. Suciu Sebastian',
    authorRole: 'Medic Stomatolog',
    date: '10 Ianuarie 2026',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Implanturi dentare: Mituri și adevăruri',
    excerpt: 'Demistificăm cele mai comune concepții greșite despre implanturile dentare.',
    content: `
      <p class="text-lg leading-relaxed mb-6">Implanturile dentare sunt cea mai modernă soluție pentru înlocuirea dinților lipsă. Cu toate acestea, există multe mituri care îi împiedică pe oameni să beneficieze de această tehnologie revoluționară.</p>
      
      <div class="bg-red-50 border-l-4 border-red-400 p-6 my-8 rounded-r-lg">
        <p class="text-red-900 font-semibold">❌ Mit: Procedura este dureroasă</p>
        <p class="text-red-800 mt-2">✓ Adevăr: Cu anestezie modernă, procedura este confortabilă. Majoritatea pacienților compară senzația cu extracția unui dinte.</p>
      </div>
      
      <div class="bg-red-50 border-l-4 border-red-400 p-6 my-8 rounded-r-lg">
        <p class="text-red-900 font-semibold">❌ Mit: Implanturile nu țin mult</p>
        <p class="text-red-800 mt-2">✓ Adevăr: Cu îngrijire corespunzătoare, implanturile pot dura toată viața. La clinica noastră oferim garanție de 10 ani.</p>
      </div>
      
      <div class="bg-red-50 border-l-4 border-red-400 p-6 my-8 rounded-r-lg">
        <p class="text-red-900 font-semibold">❌ Mit: Sunt foarte scumpe</p>
        <p class="text-red-800 mt-2">✓ Adevăr: Deși investiția inițială este mai mare, pe termen lung implanturile sunt mai economice decât alternativele care necesită înlocuire periodică.</p>
      </div>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Cine poate primi implanturi?</h2>
      <p class="leading-relaxed mb-6">Majoritatea adulților sănătoși sunt candidați pentru implanturi. Fumatul și anumite afecțiuni medicale pot afecta succesul tratamentului, dar în cadrul consultației vom evalua cazul tău individual.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'Implantologie',
    author: 'Dr. Suciu Sebastian',
    authorRole: 'Medic Stomatolog',
    date: '5 Ianuarie 2026',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Cum să depășești teama de dentist',
    excerpt: 'Sfaturi practice pentru pacienții anxioși.',
    content: `
      <p class="text-lg leading-relaxed mb-6">Frica de dentist (odontofobie) afectează aproximativ 1 din 3 oameni. Vestea bună este că există strategii eficiente pentru a depăși această teamă și a avea o experiență pozitivă la clinică.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">1. Găsește un dentist potrivit</h2>
      <p class="leading-relaxed mb-4">Caută un medic stomatolog care înțelege anxietatea pacienților și lucrează cu calm și răbdare. La clinica noastră, ne specializăm în tratamentul pacienților anxioși.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">2. Comunică deschis</h2>
      <p class="leading-relaxed mb-4">Spune dentistului despre temerile tale înainte de a începe tratamentul. Un bun profesionist va adapta abordarea pentru a te simți confortabil.</p>
      
      <div class="bg-sky-50 border-l-4 border-[#0891b2] p-6 my-8 rounded-r-lg">
        <p class="text-[#0f172a] font-medium">💡 Tehnică de relaxare:</p>
        <p class="text-[#475569] mt-1">Încearcă respirația 4-7-8: inhalează pe nas 4 secunde, ține aerul 7 secunde, expiră pe gură 8 secunde. Repetă de 3-4 ori.</p>
      </div>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">3. Începe cu o vizită simplă</h2>
      <p class="leading-relaxed mb-4">Prima întâlnire poate fi doar o conversație și o consultație, fără niciun tratament. Acest lucru te ajută să te obișnuiești cu mediul și cu echipa.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">4. Folosește tehnici de distragere</h2>
      <p class="leading-relaxed mb-6">Adu căștile și ascultă muzica preferată în timpul tratamentului. Mulți pacienți găsesc că acest lucru reduce semnificativ anxietatea.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'Sfaturi',
    author: 'Dr. Suciu Sebastian',
    authorRole: 'Medic Stomatolog',
    date: '28 Decembrie 2025',
    readTime: '4 min',
  },
  {
    id: 5,
    title: 'Albirea dentară: Opțiuni și recomandări',
    excerpt: 'Comparăm metodele de albire disponibile și îți spunem care este cea mai potrivită.',
    content: `
      <p class="text-lg leading-relaxed mb-6">Un zâmbet alb și strălucitor este dorit de mulți dintre noi. Există multiple opțiuni pentru albirea dentară, de la tratamente profesionale la metode de acasă. Iată ce trebuie să știi:</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Albire profesională la clinică</h2>
      <p class="leading-relaxed mb-4">Cel mai eficient și sigur mod de a albi dinții. Folosim substanțe profesionale activate cu lumină LED, obținând rezultate imediate - cu până la 8 nuanțe mai albi într-o singură ședință.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Kituri de albire acasă</h2>
      <p class="leading-relaxed mb-4">Prescrise de dentist, aceste kituri conțin gutiere personalizate și gel de albire. Rezultatele apar în 1-2 săptămâni și sunt mai puțin intense decât albirea profesională.</p>
      
      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
        <p class="text-amber-900 font-medium">⚠️ Atenție:</p>
        <p class="text-amber-800 mt-1">Produsele de albire din comerț pot conține substanțe abrazive care deteriorează smalțul. Consultă întotdeauna dentistul înainte de a folosi astfel de produse.</p>
      </div>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Cine nu ar trebui să își albească dinții?</h2>
      <p class="leading-relaxed mb-6">Copiii sub 16 ani, femeile însărcinate sau care alăptează, persoanele cu sensibilitate dentară severă sau cei cu restaurări vizibile pe dinții frontali (coroane, fațete) ar trebui să evite albirea.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'Estetică',
    author: 'Dr. Suciu Sebastian',
    authorRole: 'Medic Stomatolog',
    date: '20 Decembrie 2025',
    readTime: '5 min',
  },
  {
    id: 6,
    title: 'Primul control stomatologic al copilului',
    excerpt: 'Când trebuie să faci prima vizită cu copilul la dentist.',
    content: `
      <p class="text-lg leading-relaxed mb-6">Mulți părinți se întreabă când este momentul potrivit pentru prima vizită a copilului la dentist. Răspunsul simplu: mai devreme decât crezi!</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Când să faci prima programare?</h2>
      <p class="leading-relaxed mb-4">Asociația Americană de Stomatologie Pediatrică recomandă ca primul control să aibă loc în momentul în care copilului îi apare primul dinte sau până la împlinirea vârstei de 1 an.</p>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Ce se întâmplă la primul control?</h2>
      <p class="leading-relaxed mb-4">Prima vizită este în principal informativă. Medicul va examina cavitatea bucală a copilului, va evalua dezvoltarea dentară și va oferi sfaturi despre igiena orală specifică vârstei.</p>
      
      <div class="bg-sky-50 border-l-4 border-[#0891b2] p-6 my-8 rounded-r-lg">
        <p class="text-[#0f172a] font-medium">💡 Sfat pentru părinți:</p>
        <p class="text-[#475569] mt-1">Nu folosi vizita la dentist ca metodă de pedeapsă sau amenințare. Creează o asociere pozitivă cu medicul dentist încă de la început.</p>
      </div>
      
      <h2 class="text-2xl font-semibold text-[#0f172a] mt-10 mb-4">Cum să pregătești copilul?</h2>
      <p class="leading-relaxed mb-6">Vorbește pozitiv despre vizită, citește cărți despre personaje care merg la dentist și joacă-te de-a dentistul acasă. Fii calm - copiii simt anxietatea părinților.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'Pedodonție',
    author: 'Dr. Suciu Sebastian',
    authorRole: 'Medic Stomatolog',
    date: '15 Decembrie 2025',
    readTime: '4 min',
  },
];

const BlogPostPage = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const post = posts.find(p => p.id === Number(id));

  // Articole recomandate (exclud articolul curent)
  const relatedPosts = posts
    .filter(p => p.id !== Number(id) && p.category === post?.category)
    .slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-24 lg:pt-28">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h1 className="text-2xl font-semibold text-[#0f172a] mb-4">Articolul nu a fost găsit</h1>
            <p className="text-[#64748b] mb-6">Ne pare rău, dar articolul pe care îl cauți nu există sau a fost șters.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a5f] text-white font-semibold rounded-full hover:bg-[#0891b2] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi la blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header Section */}
      <section className="relative pt-24 lg:pt-28 pb-8 overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-sky-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0891b2] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Înapoi la articole
              </Link>
            </nav>

            {/* Category */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-6 tracking-tight leading-tight max-w-4xl">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748b]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-semibold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a]">{post.author}</p>
                  <p className="text-xs">{post.authorRole}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-[#e2e8f0]" />
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} citire
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image - Full width */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 bg-white pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Content Section - Grid Layout */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content - 8 columns */}
            <article className="lg:col-span-8">
              {/* Action buttons */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#e2e8f0]">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e2e8f0] text-sm text-[#475569] hover:border-[#0891b2] hover:text-[#0891b2] transition-colors">
                  <Heart className="w-4 h-4" />
                  Îmi place
                </button>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${isBookmarked ? 'bg-[#0891b2]/10 border border-[#0891b2] text-[#0891b2]' : 'bg-white border border-[#e2e8f0] text-[#475569] hover:border-[#0891b2]'}`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Salvat' : 'Salvează'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e2e8f0] text-sm text-[#475569] hover:border-[#0891b2] hover:text-[#0891b2] transition-colors">
                  <Share2 className="w-4 h-4" />
                  Distribuie
                </button>
              </div>

              {/* Article content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-[#0f172a] prose-headings:font-semibold prose-p:text-[#475569] prose-p:leading-relaxed prose-li:text-[#475569] prose-strong:text-[#0f172a]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA Box */}
              <div className="mt-12 bg-[#1e3a5f] rounded-2xl p-8 lg:p-10">
                <div className="max-w-2xl">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                    Ai întrebări despre acest subiect?
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Programează o consultație gratuită și discută direct cu Dr. Suciu despre situația ta.
                  </p>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1e3a5f] font-semibold rounded-full hover:bg-[#0891b2] hover:text-white transition-all duration-300"
                  >
                    Programează gratuit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar - 4 columns */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Author card */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-lg">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0f172a]">{post.author}</p>
                    <p className="text-sm text-[#64748b]">{post.authorRole}</p>
                  </div>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Medic stomatolog cu peste 15 ani de experiență, specializat în tratamente moderne și abordare blândă a pacienților.
                </p>
              </div>

              {/* Related articles */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0]">
                  <h4 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[#0891b2]" />
                    Articole similare
                  </h4>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Link 
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.id}`}
                        className="group block"
                      >
                        <span className="text-xs font-medium text-[#0891b2] uppercase tracking-wider">
                          {relatedPost.category}
                        </span>
                        <h5 className="font-medium text-[#0f172a] mt-1 group-hover:text-[#0891b2] transition-colors line-clamp-2 text-sm">
                          {relatedPost.title}
                        </h5>
                        <div className="flex items-center gap-2 mt-2 text-xs text-[#64748b]">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-[#0891b2] to-[#1e3a5f] rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-2">Rămâi informat</h4>
                <p className="text-sm text-white/80 mb-4">
                  Primește sfaturi dentare și noutăți direct în inbox.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0891b2] font-medium rounded-full text-sm hover:bg-white/90 transition-colors"
                >
                  Abonează-te
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
