import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Cum să îți îngrijești dinții corect',
    excerpt: 'Tehnici simple de periaj și folosirea aței dentare pentru o igienă perfectă.',
    image: '/hero_dental_chair.jpg',
    category: 'IGIENĂ',
    date: '15 Ian 2026',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Totul despre Invisalign',
    excerpt: 'Cum funcționează alinierele transparente și de ce sunt preferate de adulți.',
    image: '/hero_dental_chair.jpg',
    category: 'ORTODONȚIE',
    date: '10 Ian 2026',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Implanturi dentare: mituri și adevăruri',
    excerpt: 'Demistificăm concepțiile greșite despre implanturile dentare.',
    image: '/hero_dental_chair.jpg',
    category: 'IMPLANTOLOGIE',
    date: '5 Ian 2026',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Cum depășești teama de dentist',
    excerpt: 'Sfaturi practice pentru pacienții anxioși.',
    image: '/hero_dental_chair.jpg',
    category: 'SFATURI',
    date: '28 Dec 2025',
    readTime: '4 min',
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </Link>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="category-pill mb-4">BLOG</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Sfaturi și <span className="gradient-text">articole</span>
            </h1>
            <p className="text-slate-600">Informații utile despre îngrijirea dentară</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group block bg-slate-50 rounded-2xl overflow-hidden card-hover">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-wider">{post.category}</span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 mb-3 group-hover:text-sky-500 transition-colors">{post.title}</h2>
                  <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
