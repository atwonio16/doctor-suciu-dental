import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { FadeText } from '@/components/animations/FadeText';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Cum să îți îngrijești dinții corect acasă',
    excerpt: 'Descoperă tehnicile corecte de periaj și folosirea aței dentare pentru o igienă orală perfectă.',
    image: '/hero_dental_chair.jpg',
    category: 'Igienă',
    author: 'Dr. Suciu Sebastian',
    date: '15 Ianuarie 2026',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Tot ce trebuie să știi despre Invisalign',
    excerpt: 'Află cum funcționează alinierele transparente și de ce sunt preferate de adulți.',
    image: '/hero_dental_chair.jpg',
    category: 'Ortodonție',
    author: 'Dr. Maria Popescu',
    date: '10 Ianuarie 2026',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Implanturi dentare: mituri și adevăruri',
    excerpt: 'Demistificăm cele mai comune concepții greșite despre implanturile dentare.',
    image: '/hero_dental_chair.jpg',
    category: 'Implantologie',
    author: 'Dr. Suciu Sebastian',
    date: '5 Ianuarie 2026',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Cum să depășești teama de dentist',
    excerpt: 'Sfaturi practice pentru pacienții anxioși despre cum să facă vizita la dentist mai plăcută.',
    image: '/hero_dental_chair.jpg',
    category: 'Sfaturi',
    author: 'Dr. Elena Dumitrescu',
    date: '28 Decembrie 2025',
    readTime: '4 min',
  },
  {
    id: 5,
    title: 'Albirea dentară: Ce opțiuni ai?',
    excerpt: 'Comparăm metodele de albire disponibile și îți spunem care este cea mai potrivită pentru tine.',
    image: '/hero_dental_chair.jpg',
    category: 'Estetică',
    author: 'Dr. Suciu Sebastian',
    date: '20 Decembrie 2025',
    readTime: '5 min',
  },
  {
    id: 6,
    title: 'Primul aniversare al dinților bebelușului',
    excerpt: 'Când și cum să începi îngrijirea dentară a celui mic pentru o dantură sănătoasă.',
    image: '/hero_dental_chair.jpg',
    category: 'Pedodonție',
    author: 'Dr. Elena Dumitrescu',
    date: '15 Decembrie 2025',
    readTime: '6 min',
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <FadeText direction="up">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi acasă
            </Link>
          </FadeText>
          
          <div className="text-center max-w-3xl mx-auto">
            <FadeText delay={0.1} direction="up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 text-sm font-semibold mb-4">
                Blog
              </span>
            </FadeText>
            
            <FadeText delay={0.2} direction="up">
              <h1 className="font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
                Articole și sfaturi
              </h1>
            </FadeText>
            
            <FadeText delay={0.3} direction="up">
              <p className="text-lg text-slate-600 leading-relaxed">
                Descoperă sfaturi utile despre îngrijirea dentară, tratamente moderne și 
                noutăți din domeniul stomatologiei.
              </p>
            </FadeText>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <FadeText key={post.id} delay={0.05 * index} direction="up">
                <article className="group h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold mb-3">
                      {post.category}
                    </span>
                    
                    {/* Title */}
                    <h2 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-sky-500 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </FadeText>
            ))}
          </div>

          {/* Load More */}
          <FadeText delay={0.4} direction="up">
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8"
              >
                Încarcă mai multe articole
              </Button>
            </div>
          </FadeText>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
