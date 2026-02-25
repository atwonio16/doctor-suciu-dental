import { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useAdminFAQ } from '../hooks/useSupabaseAdmin';
import type { FAQ } from '../../lib/supabase';

const defaultFAQs = [
  { question: 'Cât durează un tratament de implant dentar?', answer: 'Durata unui tratament de implant dentar variază în funcție de complexitatea cazului. În general, procesul complet durează între 3 și 6 luni, incluzând perioada de vindecare (osseointegrare) care este esențială pentru succesul pe termen lung.', category: 'tratamente', is_active: true },
  { question: 'Este dureroasă procedura de implant dentar?', answer: 'Nu, procedura de implant dentar se realizează sub anestezie locală, astfel încât pacientul nu simte durere în timpul intervenției. După procedură, pot apărea ușoare disconforturi, care pot fi gestionate cu medicamente recomandate de medic.', category: 'tratamente', is_active: true },
  { question: 'Cât costă o coroană dentară?', answer: 'Costul unei coroane dentare depinde de materialul ales (ceramică, zirconiu, metalo-ceramică) și de complexitatea cazului. Vă invităm la o primă vizită pentru o evaluare personalizată și o ofertă exactă.', category: 'preturi', is_active: true },
  { question: 'Oferiți rate pentru tratamentele dentare?', answer: 'Da, înțelegem că tratamentele dentare reprezintă o investiție importantă. Oferim posibilitatea de plată în rate fără dobândă prin partenerii noștri, pentru a face tratamentul accesibil tuturor pacienților.', category: 'preturi', is_active: true },
  { question: 'Cât de des trebuie să merg la control?', answer: 'Recomandăm controale stomatologice de rutină la fiecare 6 luni pentru menținerea sănătății dentare. Pacienții cu tratamente complexe sau afecțiuni speciale pot necesita vizite mai frecvente, conform recomandărilor medicului.', category: 'general', is_active: true },
];

const FAQPage = () => {
  const { data: faqs, create, update, remove, loading } = useAdminFAQ();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    is_active: true,
  });

  const filteredFAQs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...formData, order_index: faqs.length + 1 };
    if (editingId) {
      await update(editingId, data);
    } else {
      await create(data);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ question: '', answer: '', category: 'general', is_active: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item: FAQ) => {
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category,
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi această întrebare?')) {
      await remove(id);
    }
  };

  const handleSeedData = async () => {
    if (!confirm('Aceasta va adăuga 5 întrebări frecvente în baza de date. Continui?')) return;
    setIsSeeding(true);
    for (let i = 0; i < defaultFAQs.length; i++) {
      await create({ ...defaultFAQs[i], order_index: i + 1 });
    }
    setIsSeeding(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Întrebări Frecvente</h1>
          <p className="text-gray-500">Gestionează secțiunea FAQ</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Anulează' : 'Adaugă întrebare'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-lg">{editingId ? 'Editează întrebare' : 'Întrebare nouă'}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Întrebare *</label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              placeholder="Ce avantaje oferă clinica?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Răspuns *</label>
            <textarea
              required
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none"
              rows={4}
              placeholder="Oferim tratamente complete cu tehnologie modernă..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="general">General</option>
                <option value="tratamente">Tratamente</option>
                <option value="programare">Programare</option>
                <option value="preturi">Prețuri</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-700">Activ (vizibil pe site)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg">
              {editingId ? 'Salvează modificările' : 'Adaugă întrebare'}
            </button>
            <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Anulează
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Caută întrebări..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
        />
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredFAQs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Nicio întrebare găsită</p>
            {faqs.length === 0 && (
              <button
                onClick={handleSeedData}
                disabled={isSeeding}
                className="mt-4 px-4 py-2 bg-[#0d9488] text-white rounded-lg hover:bg-[#0d9488]/90 disabled:opacity-50"
              >
                {isSeeding ? 'Se încarcă...' : 'Încarcă date demo (5 întrebări)'}
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredFAQs.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.question}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                        {item.category}
                      </span>
                      {!item.is_active && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                          Inactiv
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.answer}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(item)} className="p-2 text-gray-600 hover:text-[#1e3a5f] rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-600 hover:text-red-600 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
