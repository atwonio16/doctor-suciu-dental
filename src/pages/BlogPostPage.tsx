import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';


const posts = [
  {
    id: 1,
    title: 'Cum să îți îngrijești dinții corect acasă',
    content: `
      <p>O igienă orală corectă este fundamentală pentru sănătatea dinților și gingiilor. Iată câteva reguli esențiale:</p>
      
      <h3>1. Periajul corect</h3>
      <p>Folosește o periuță moale și periază timp de 2 minute, de două ori pe zi, cu mișcări circulare blânde.</p>
      
      <h3>2. Folosirea aței dentare</h3>
      <p>Ața dentară ajută la îndepărtarea plăcii bacteriene din zonele greu accesibile.</p>
      
      <h3>3. Vizite regulate</h3>
      <p>Programează controale stomatologice la fiecare 6 luni pentru prevenirea problemelor.</p>
    `,
    category: 'Igienă',
    author: 'Dr. Suciu Sebastian',
    date: '15 Ianuarie 2026',
    readTime: '5 min',
    color: 'bg-sky-500',
  },
  {
    id: 2,
    title: 'Totul despre Invisalign',
    content: `<p>Conținut articol despre Invisalign...</p>`,
    category: 'Ortodonție',
    author: 'Dr. Suciu Sebastian',
    date: '10 Ianuarie 2026',
    readTime: '7 min',
    color: 'bg-cyan-500',
  },
];

const BlogPostPage = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-14 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-title-1 text-gray-900 mb-4">Articolul nu a fost găsit</h1>
          <Link to="/blog" className="text-[#0d9488] font-medium">
            Înapoi la blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      <div className={`h-56 ${post.color} relative`}>
        <Link 
          to="/blog"
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-white mb-2">
            {post.category}
          </span>
          <h1 className="text-white font-bold text-[22px] leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-[14px]">
            {post.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold text-[14px] text-gray-900">{post.author}</p>
            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <span>{post.date}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-8 p-5 bg-[#1e3a5f] rounded-2xl">
          <h3 className="text-white font-bold text-[18px] mb-2">Ai întrebări?</h3>
          <p className="text-white/80 text-[14px] mb-4">
            Programează o consultație gratuită
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center gap-2 w-full h-[48px] bg-white rounded-full text-[15px] font-semibold text-[#1e3a5f]"
          >
            Programează-te
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
