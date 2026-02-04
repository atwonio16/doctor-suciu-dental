import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

// Datele articolelor de blog
const posts = [
  {
    id: 1,
    title: 'Cum să îți îngrijești dinții corect acasă',
    excerpt: 'Descoperă tehnici simple de periaj și folosirea aței dentare pentru o igienă orală perfectă care previne cariile și bolile gingivale.',
    image: '/hero_dental_chair.jpg',
    category: 'Igienă',
    date: '15 Ian 2026',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Totul despre Invisalign: Ghid complet',
    excerpt: 'Cum funcționează alinierele transparente, de ce sunt preferate de adulți și ce rezultate poți aștepta de la tratament.',
    image: '/hero_dental_chair.jpg',
    category: 'Ortodonție',
    date: '10 Ian 2026',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Implanturi dentare: Mituri și adevăruri',
    excerpt: 'Demistificăm cele mai comune concepții greșite despre implanturile dentare și îți prezentăm realitatea procedurii.',
    image: '/hero_dental_chair.jpg',
    category: 'Implantologie',
    date: '5 Ian 2026',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Cum să depășești teama de dentist',
    excerpt: 'Sfaturi practice pentru pacienții anxioși. Strategii dovedite pentru a transforma vizita la dentist într-o experiență plăcută.',
    image: '/hero_dental_chair.jpg',
    category: 'Sfaturi',
    date: '28 Dec 2025',
    readTime: '4 min',
  },
  {
    id: 5,
    title: 'Albirea dentară: Opțiuni și recomandări',
    excerpt: 'Comparăm metodele de albire disponibile și îți spunem care este cea mai potrivită pentru tipul tău de dinți.',
    image: '/hero_dental_chair.jpg',
    category: 'Estetică',
    date: '20 Dec 2025',
    readTime: '5 min',
  },
  {
    id: 6,
    title: 'Primul control stomatologic al copilului',
    excerpt: 'Când trebuie să faci prima vizită cu copilul la dentist și cum să pregătești terenul pentru o experiență pozitivă.',
    image: '/hero_dental_chair.jpg',
    category: 'Pedodonție',
    date: '15 Dec 2025',
    readTime: '4 min',
  },
];

// Componenta pentru un card de blog
const BlogCard = ({ post, index }: { post: typeof posts[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/blog/${post.id}`}
      className="group block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Citește articolul: ${post.title}`}
    >
      <article 
        className={`
          h-full flex flex-col bg-white rounded-2xl overflow-hidden
          border border-[#e2e8f0] transition-all duration-500 ease-out
          ${isHovered ? 'shadow-xl shadow-slate-200/50 border-[#cbd5e1] -translate-y-1' : 'shadow-sm'}
        `}
      >
        {/* Container imagine */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className={`absolute inset-0 bg-slate-100 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
          
          <img 
            src={post.image} 
            alt={post.title}
            className={`
              w-full h-full object-cover transition-transform duration-700 ease-out
              ${isHovered ? 'scale-105' : 'scale-100'}
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badge categorie */}
          <div className="absolute top-4 left-4">
            <span className={`
              inline-block px-3 py-1.5 text-xs font-medium uppercase tracking-wider
              rounded-full transition-colors duration-300
              ${isHovered ? 'bg-[#0891b2] text-white' : 'bg-white/90 text-[#1e3a5f]'}
            `}>
              {post.category}
            </span>
          </div>
        </div>

        {/* Conținut card */}
        <div className="flex-1 flex flex-col p-6">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-[#64748b] mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Titlu */}
          <h2 className={`
            text-lg font-semibold text-[#0f172a] mb-3 leading-snug
            transition-colors duration-300 line-clamp-2
            ${isHovered ? 'text-[#0891b2]' : ''}
          `}>
            {post.title}
          </h2>

          {/* Descriere */}
          <p className="text-sm text-[#475569] leading-relaxed line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <span className={`
              inline-flex items-center gap-2 text-sm font-semibold
              transition-colors duration-300
              ${isHovered ? 'text-[#0891b2]' : 'text-[#1e3a5f]'}
            `}>
              Citește mai mult
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState('Toate');
  const categories = ['Toate', ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = activeFilter === 'Toate' ? posts : posts.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section - Identic ca celelalte sectiuni */}
      <section className="relative pt-28 lg:pt-32 pb-10 lg:pb-12 overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header - Exact ca pe homepage */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-[#cbd5e1]" />
                <span className="text-xs font-medium text-[#64748b] tracking-wider uppercase">
                  Blog
                </span>
                <span className="w-12 h-[1px] bg-[#cbd5e1]" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
                Articole și sfaturi pentru zâmbetul tău
              </h1>

              <p className="text-lg text-[#222222] max-w-2xl mx-auto">
                Informații utile, explicate simplu, de către echipa noastră de specialiști.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium
                  transition-all duration-300
                  ${activeFilter === category
                    ? 'bg-[#1e3a5f] text-white'
                    : 'bg-white text-[#475569] border border-[#e2e8f0] hover:border-[#1e3a5f]'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* CTA Section - Consistent cu restul site-ului */}
          <div className="mt-12 lg:mt-16">
            <div className="relative bg-[#1e3a5f] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />

              <div className="relative z-10 px-8 py-12 lg:py-16 text-center">
                <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-4 tracking-tight">
                  Ai întrebări după ce ai citit articolele?
                </h3>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                  Programează o consultație gratuită și discută cu Dr. Suciu despre situația ta.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1e3a5f] font-semibold rounded-full transition-all duration-300 hover:bg-[#0891b2] hover:text-white"
                >
                  Programează gratuit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
