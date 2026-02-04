import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Cum să îți îngrijești dinții corect acasă',
    content: `
      <p>O igienă orală corectă este fundamentală pentru sănătatea dinților și gingiilor. Iată câteva reguli esențiale:</p>
      
      <h3>1. Periajul corect</h3>
      <p>Folosește o periuță de dinți moale și paste fluorurată. Periază timp de 2 minute, de două ori pe zi, cu mișcări circulare blânde.</p>
      
      <h3>2. Folosirea aței dentare</h3>
      <p>Ața dentară ajută la îndepărtarea plăcii bacteriene și a resturilor alimentare din zonele greu accesibile. Folosește-o zilnic.</p>
      
      <h3>3. Apa de gură</h3>
      <p>O apă de gură antibacteriană poate completa rutina de igienă, dar nu înlocuiește periajul și ața dentară.</p>
      
      <h3>4. Vizite regulate la dentist</h3>
      <p>Programați controale stomatologice la fiecare 6 luni pentru prevenirea problemelor.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'IGIENĂ',
    author: 'Dr. Suciu Sebastian',
    date: '15 Ianuarie 2026',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Tot ce trebuie să știi despre Invisalign',
    content: `
      <p>Invisalign este un sistem modern de îndreptare a dinților care folosește alignere transparente în locul aparatelor dentare tradiționale.</p>
      
      <h3>Cum funcționează?</h3>
      <p>Alignerele sunt fabricate personalizat pentru fiecare pacient și se schimbă la fiecare 1-2 săptămâni, deplasând treptat dinții în poziția dorită.</p>
      
      <h3>Avantaje</h3>
      <ul>
        <li>Aproape invizibile</li>
        <li>Se pot scoate la masă și periaj</li>
        <li>Mai confortabile decât bracket-urile</li>
        <li>Rezultate predictibile</li>
      </ul>
      
      <h3>Durata tratamentului</h3>
      <p>În funcție de complexitatea cazului, tratamentul poate dura între 6 și 18 luni.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'ORTODONȚIE',
    author: 'Dr. Suciu Sebastian',
    date: '10 Ianuarie 2026',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Implanturi dentare: mituri și adevăruri',
    content: `
      <p>Implanturile dentare sunt cea mai modernă soluție pentru înlocuirea dinților lipsă. Iată adevărul despre cele mai comune mituri:</p>
      
      <h3>Mit: Procedura este dureroasă</h3>
      <p><strong>Adevăr:</strong> Cu anestezie modernă, procedura este confortabilă. Majoritatea pacienților compară senzația cu extracția unui dinte.</p>
      
      <h3>Mit: Implanturile nu țin mult</h3>
      <p><strong>Adevăr:</strong> Cu îngrijire corespunzătoare, implanturile pot dura toată viața. Oferim garanție de 10 ani.</p>
      
      <h3>Mit: Sunt foarte scumpe</h3>
      <p><strong>Adevăr:</strong> Deși investiția inițială este mai mare, pe termen lung implanturile sunt mai economice decât alternativele care necesită înlocuire periodică.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'IMPLANTOLOGIE',
    author: 'Dr. Suciu Sebastian',
    date: '5 Ianuarie 2026',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Cum să depășești teama de dentist',
    content: `
      <p>Frica de dentist (odontofobie) afectează mulți oameni. Iată cum poți depăși această teamă:</p>
      
      <h3>1. Găsește un dentist potrivit</h3>
      <p>Caută un medic stomatolog care înțelege anxietatea pacienților și lucrează cu calm și răbdare.</p>
      
      <h3>2. Comunică deschis</h3>
      <p>Spune dentistului despre temerile tale. Un bun profesionist va adapta tratamentul pentru a te simți confortabil.</p>
      
      <h3>3. Începe cu o vizită simplă</h3>
      <p>Prima întâlnire poate fi doar o conversație și o consultație, fără tratament.</p>
      
      <h3>4. Folosește tehnici de relaxare</h3>
      <p>Respirația profundă și muzica te pot ajuta să te relaxezi în timpul vizitei.</p>
    `,
    image: '/hero_dental_chair.jpg',
    category: 'SFATURI',
    author: 'Dr. Suciu Sebastian',
    date: '28 Decembrie 2025',
    readTime: '4 min',
  },
];

const BlogPostPage = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-24 lg:pt-28">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Articolul nu a fost găsit</h1>
            <Link to="/blog" className="btn-primary">Înapoi la blog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      <article className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Înapoi la articole
          </Link>

          <span className="category-pill mb-4">{post.category}</span>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-slate-500 mb-8">
            <span className="flex items-center gap-2"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>

          <img src={post.image} alt={post.title} className="w-full rounded-2xl mb-8" />

          <div 
            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-semibold prose-h3:text-xl prose-p:text-slate-600 prose-li:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-slate-600 mb-4">Ai întrebări despre acest subiect?</p>
            <Link to="/contact" className="btn-primary">PROGRAMEAZĂ O CONSULTAȚIE</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
