import { useState, useRef, useCallback, useEffect } from 'react';
import { Move, RotateCcw, Maximize } from 'lucide-react';

interface ImageCropSelectorProps {
  imageUrl: string;
  initialPosition?: string;
  onChange: (position: string) => void;
}

export function ImageCropSelector({ imageUrl, initialPosition = 'center 50%', onChange }: ImageCropSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Parse initial position (format: "center X%")
  const parsePosition = (pos: string) => {
    const match = pos.match(/center\s+(\d+)%/);
    return match ? parseInt(match[1]) : 50;
  };
  
  const [verticalPosition, setVerticalPosition] = useState(() => parsePosition(initialPosition));
  
  // Update when initialPosition changes externally
  useEffect(() => {
    setVerticalPosition(parsePosition(initialPosition));
  }, [initialPosition]);
  
  const updatePositionFromEvent = useCallback((clientY: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let percentage = ((clientY - rect.top) / rect.height) * 100;
    percentage = Math.max(5, Math.min(95, percentage));
    
    const rounded = Math.round(percentage);
    setVerticalPosition(rounded);
    onChange(`center ${rounded}%`);
  }, [onChange]);
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePositionFromEvent(e.clientY);
  }, [updatePositionFromEvent]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePositionFromEvent(e.clientY);
  }, [isDragging, updatePositionFromEvent]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updatePositionFromEvent(e.touches[0].clientY);
  }, [updatePositionFromEvent]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    updatePositionFromEvent(e.touches[0].clientY);
  }, [isDragging, updatePositionFromEvent]);
  
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const resetPosition = () => {
    setVerticalPosition(35);
    onChange('center 35%');
  };
  
  const presets = [
    { label: 'Foarte sus', value: 15, color: 'bg-blue-500' },
    { label: 'Sus', value: 25, color: 'bg-cyan-500' },
    { label: 'Standard', value: 35, color: 'bg-green-500' },
    { label: 'Centru', value: 50, color: 'bg-yellow-500' },
    { label: 'Jos', value: 65, color: 'bg-orange-500' },
    { label: 'Foarte jos', value: 80, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-4">
      {/* Main Image Container with Interactive Crop */}
      <div className="relative">
        <div 
          ref={containerRef}
          className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Full Image with crop applied */}
          <img 
            src={imageUrl} 
            alt="Selectează zona de crop"
            className="w-full h-full object-cover pointer-events-none"
            style={{ objectPosition: `center ${verticalPosition}%` }}
            draggable={false}
          />
          
          {/* Overlay with grid lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid lines - horizontal */}
            <div className="absolute top-[20%] left-0 right-0 h-px bg-white/40" />
            <div className="absolute top-[40%] left-0 right-0 h-px bg-white/40" />
            <div className="absolute top-[60%] left-0 right-0 h-px bg-white/40" />
            <div className="absolute top-[80%] left-0 right-0 h-px bg-white/40" />
            
            {/* Center crosshair */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border-2 border-white/60 rounded-full" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />
            
            {/* Draggable position indicator - the main interactive element */}
            <div 
              className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
              style={{ top: `${verticalPosition}%`, transform: 'translateY(-50%)' }}
            >
              {/* Line across */}
              <div className="absolute left-0 right-0 h-1 bg-[#0d9488] shadow-lg" />
              
              {/* Handle */}
              <div className="relative z-10 bg-[#0d9488] text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 border-2 border-white">
                <Move className="w-4 h-4" />
                {verticalPosition}%
              </div>
            </div>
          </div>
          
          {/* Drag instruction */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="inline-block bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              Trage în sus/jos pentru a ajusta
            </span>
          </div>
        </div>
      </div>
      
      {/* Preset Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setVerticalPosition(preset.value);
              onChange(`center ${preset.value}%`);
            }}
            className={`px-3 py-2 text-xs rounded-lg font-medium transition-all border ${
              Math.abs(verticalPosition - preset.value) <= 5
                ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${preset.color}`} />
            {preset.label}
          </button>
        ))}
      </div>
      
      {/* Preview Section */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3 text-gray-700">
          <Maximize className="w-4 h-4" />
          <span className="text-sm font-medium">Previzualizare pe site</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Desktop preview - landscape */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Card Desktop (orizontal)</p>
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
              <img 
                src={imageUrl} 
                alt="Preview Desktop"
                className="w-full h-full object-cover"
                style={{ objectPosition: `center ${verticalPosition}%` }}
              />
            </div>
          </div>
          
          {/* Mobile preview - portrait card */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Card Mobile (vertical)</p>
            <div className="w-20 mx-auto aspect-[3/4] rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
              <img 
                src={imageUrl} 
                alt="Preview Mobile"
                className="w-full h-full object-cover"
                style={{ objectPosition: `center ${verticalPosition}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Reset and Current Value */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={resetPosition}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset la Standard
        </button>
        
        <div className="bg-[#1e3a5f]/10 rounded-lg px-4 py-2">
          <span className="text-sm text-gray-600">Poziție: </span>
          <span className="text-sm font-bold text-[#1e3a5f] font-mono">
            center {verticalPosition}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageCropSelector;
