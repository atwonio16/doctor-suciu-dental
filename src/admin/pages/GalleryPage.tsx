import { useState, useRef, useCallback } from 'react';
import { Upload, Trash2, Plus, GripVertical, Loader2, AlertCircle, Pencil, X, Check } from 'lucide-react';
import { useAdminGallery } from '../hooks/useSupabaseAdmin';

const GalleryPage = () => {
  const { data: images, loading, error, create, update, remove, reorder, refresh } = useAdminGallery();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sort images by order
  const sortedImages = [...images].sort((a, b) => a.order_index - b.order_index);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setUploadError(null);

    try {
      Array.from(files).forEach((file, index) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setUploadError(`Fișierul ${file.name} nu este o imagine validă.`);
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setUploadError(`Fișierul ${file.name} depășește 5MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          create({
            title: file.name.split('.')[0],
            image_url: event.target?.result as string,
            category: 'general',
            order_index: images.length + index,
            is_active: true,
          });
        };
        reader.onerror = () => {
          setUploadError(`Eroare la citirea fișierului ${file.name}.`);
        };
        reader.readAsDataURL(file);
      });
    } catch (err) {
      setUploadError('Eroare la încărcarea imaginilor.');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi această imagine?')) {
      await remove(id);
    }
  };

  const startEditing = (image: typeof sortedImages[0]) => {
    setEditingId(image.id);
    setEditTitle(image.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const saveEditing = async (id: string) => {
    if (editTitle.trim()) {
      await update(id, { title: editTitle.trim() });
    }
    setEditingId(null);
    setEditTitle('');
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Set drag image
    const el = e.currentTarget as HTMLElement;
    el.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.opacity = '1';
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== draggedId) {
      setDragOverId(id);
    }
  }, [draggedId]);

  const handleDrop = useCallback(async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);
    
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      return;
    }

    const draggedIndex = sortedImages.findIndex(img => img.id === draggedId);
    const targetIndex = sortedImages.findIndex(img => img.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedId(null);
      return;
    }

    // Create new order
    const newImages = [...sortedImages];
    const [removed] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, removed);

    // Update local state immediately for better UX
    const newOrderIds = newImages.map(img => img.id);
    
    // Call API to persist order
    const success = await reorder(newOrderIds);
    if (!success) {
      // Refresh if failed
      refresh();
    }
    
    setDraggedId(null);
  }, [draggedId, sortedImages, reorder, refresh]);

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're leaving the grid entirely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p>Eroare la încărcarea galeriei: {error}</p>
        </div>
        <button 
          onClick={refresh}
          className="mt-4 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90"
        >
          Reîncearcă
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galerie</h1>
          <p className="text-gray-500">Gestionează imaginile din galerie. Trage imaginile pentru a le reordona.</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90 transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Se încarcă...' : 'Încarcă imagini'}
        </button>
      </div>

      {/* Error message */}
      {uploadError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{uploadError}</p>
          <button 
            onClick={() => setUploadError(null)}
            className="ml-auto text-sm underline"
          >
            Închide
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Gallery Grid */}
      {sortedImages.length === 0 ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            isDraggingOver ? 'border-[#0d9488] bg-[#0d9488]/5' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
          onDragLeave={() => setIsDraggingOver(false)}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">Nu există imagini în galerie</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[#0d9488] hover:underline font-medium"
          >
            Încarcă prima imagine
          </button>
        </div>
      ) : (
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          onDragLeave={handleDragLeave}
        >
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              draggable={!editingId}
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, image.id)}
              onDrop={(e) => handleDrop(e, image.id)}
              className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-gray-100 ${
                dragOverId === image.id ? 'border-[#0d9488] scale-105 shadow-lg' : 'border-transparent hover:border-gray-300'
              } ${draggedId === image.id ? 'opacity-50' : ''} ${editingId === image.id ? '' : 'cursor-move'}`}
            >
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity ${editingId === image.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {/* Order Number */}
                <div className="absolute top-2 left-2 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                  #{index + 1}
                </div>
                
                {/* Edit Button */}
                {editingId !== image.id && (
                  <button
                    onClick={(e) => { e.stopPropagation(); startEditing(image); }}
                    className="absolute top-2 right-[52px] p-1.5 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 transition-colors"
                    title="Editează titlul"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}

                {/* Drag Handle */}
                {editingId !== image.id && (
                  <div className="absolute top-2 right-[28px] p-1.5 bg-white/90 rounded shadow-sm">
                    <GripVertical className="w-4 h-4 text-gray-600" />
                  </div>
                )}
                
                {/* Delete Button */}
                {editingId !== image.id && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(image.id); }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded shadow-sm hover:bg-red-600 transition-colors"
                    title="Șterge imaginea"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                {/* Title / Edit Form */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  {editingId === image.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm rounded border-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Titlu imagine..."
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEditing(image.id);
                          if (e.key === 'Escape') cancelEditing();
                        }}
                      />
                      <button
                        onClick={() => saveEditing(image.id)}
                        className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                        title="Salvează"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1.5 bg-gray-500 text-white rounded hover:bg-gray-600"
                        title="Anulează"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-white text-sm font-medium truncate">{image.title}</p>
                  )}
                </div>
              </div>
              
              {/* Drag Indicator (shown when dragging over) */}
              {dragOverId === image.id && (
                <div className="absolute inset-0 border-2 border-dashed border-[#0d9488] bg-[#0d9488]/10 flex items-center justify-center">
                  <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-[#0d9488] shadow-sm">
                    Plasează aici
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Add More Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#1e3a5f] hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-[#1e3a5f]"
          >
            <Plus className="w-8 h-8" />
            <span className="text-sm font-medium">Adaugă</span>
          </button>
        </div>
      )}

      {/* Instructions */}
      {sortedImages.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 text-blue-700">
          <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold">i</span>
          </div>
          <div>
            <p className="font-medium">Cum să gestionezi imaginile:</p>
            <ul className="text-sm mt-1 list-disc list-inside space-y-1">
              <li><strong>Reordonează:</strong> Trage imaginile cu mouse-ul</li>
              <li><strong>Editează titlul:</strong> Click pe iconița creion (albastruă)</li>
              <li><strong>Șterge:</strong> Click pe iconița coș (roșie)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
