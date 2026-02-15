import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const posts = [
  {
    id: 1,
    title: 'Cum să îți îngrijești dinții corect acasă',
    excerpt: 'Tehnici simple de periaj pentru o igienă orală perfectă',
    category: 'Igienă',
    readTime: '5 min',
    color: 'bg-sky-500',
  },
  {
    id: 2,
    title: 'Totul despre Invisalign',
    excerpt: 'Ghid complet despre alinierele transparente',
    category: 'Ortodonție',
    readTime: '7 min',
    color: 'bg-cyan-500',
  },
  {
    id: 3,
    title: 'Implanturi dentare: Mituri și adevăruri',
    excerpt: 'Demistificăm concepțiile greșite despre implanturi',
    category: 'Implantologie',
    readTime: '6 min',
    color: 'bg-indigo-500',
  },
  {
    id: 4,
    title: 'Cum să depășești teama de dentist',
    excerpt: 'Sfaturi practice pentru pacienții anxioși',
    category: 'Sfaturi',
    readTime: '4 min',
    color: 'bg-rose-500',
  },
];

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState('Toate');
  const categories = ['Toate', ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = activeFilter === 'Toate' ? posts : posts.filter(p => p.category === activeFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* Header */}
      <div className="px-4 py-6 bg-gray-50">
        <h1 className="text-display text-gray-900 mb-2">
          Articole și sfaturi
        </h1>
        <p className="text-body-small text-gray-500">
          Informații utile de la specialiștii noștri
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                activeFilter === category
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="px-4 py-6 space-y-4">
        {filteredPosts.map((post) => (
          <Link 
            key={post.id}
            to={`/blog/${post.id}`}
            className="block bg-white rounded-2xl border border-gray-100 overflow-hidden press-effect"
          >
            {/* Image Placeholder */}
            <div className={`h-40 ${post.color} relative`}>
              <div className="absolute top-3 left-3">
                <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-gray-800">
                  {post.category}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-[17px] text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[14px] text-gray-500 mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-1 text-[12px] text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} de citit
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 py-8 bg-gray-50">
        <div className="bg-[#1e3a5f] rounded-2xl p-6">
          <h3 className="text-white font-bold text-[18px] mb-2">
            Ai întrebări?
          </h3>
          <p className="text-white/80 text-[14px] mb-4">
            Programează o consultație gratuită
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center gap-2 w-full h-[48px] bg-white rounded-full text-[15px] font-semibold text-[#1e3a5f] press-effect"
          >
            Sună acum
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
