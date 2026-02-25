import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check, ZoomIn, ZoomOut, RotateCcw, Move, Grid3X3 } from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export default function ImageCropper({ 
  imageSrc, 
  onCrop, 
  onCancel, 
  aspectRatio = 4/3 
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  // Dimensiunile viewport-ului (ceea ce se vede pe site) - 4:3
  const VIEWPORT_WIDTH = 500;
  const VIEWPORT_HEIGHT = Math.round(VIEWPORT_WIDTH / aspectRatio); // ~375px pentru 4:3
  
  // Canvasul e mai mare să încapă imaginea
  const CANVAS_SIZE = 700;

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      setImg(image);
      setNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
      
      // Scale inițial să încapă în viewport
      const scaleX = VIEWPORT_WIDTH / image.naturalWidth;
      const scaleY = VIEWPORT_HEIGHT / image.naturalHeight;
      const minScale = Math.min(scaleX, scaleY, 1);
      setScale(minScale);
      
      // Centrează imaginea în canvas
      setPosition({
        x: (CANVAS_SIZE - image.naturalWidth * minScale) / 2,
        y: (CANVAS_SIZE - image.naturalHeight * minScale) / 2
      });
    };
    image.src = imageSrc;
  }, [imageSrc]);

  const drawCanvas = useCallback(() => {
    if (!canvasRef.current || !img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fundal gri închis
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Desenează imaginea
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    // Poziția viewport-ului (centrat)
    const viewportX = (CANVAS_SIZE - VIEWPORT_WIDTH) / 2;
    const viewportY = (CANVAS_SIZE - VIEWPORT_HEIGHT) / 2;

    // Overlay întunecat în jurul viewport-ului
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    // Sus
    ctx.fillRect(0, 0, CANVAS_SIZE, viewportY);
    // Jos
    ctx.fillRect(0, viewportY + VIEWPORT_HEIGHT, CANVAS_SIZE, CANVAS_SIZE - viewportY - VIEWPORT_HEIGHT);
    // Stânga
    ctx.fillRect(0, viewportY, viewportX, VIEWPORT_HEIGHT);
    // Dreapta
    ctx.fillRect(viewportX + VIEWPORT_WIDTH, viewportY, CANVAS_SIZE - viewportX - VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    // Bordură viewport
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.strokeRect(viewportX, viewportY, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    // Linii punctate în interior
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    
    if (showGrid) {
      // Linii treimi
      ctx.beginPath();
      ctx.moveTo(viewportX + VIEWPORT_WIDTH / 3, viewportY);
      ctx.lineTo(viewportX + VIEWPORT_WIDTH / 3, viewportY + VIEWPORT_HEIGHT);
      ctx.moveTo(viewportX + VIEWPORT_WIDTH * 2 / 3, viewportY);
      ctx.lineTo(viewportX + VIEWPORT_WIDTH * 2 / 3, viewportY + VIEWPORT_HEIGHT);
      ctx.moveTo(viewportX, viewportY + VIEWPORT_HEIGHT / 3);
      ctx.lineTo(viewportX + VIEWPORT_WIDTH, viewportY + VIEWPORT_HEIGHT / 3);
      ctx.moveTo(viewportX, viewportY + VIEWPORT_HEIGHT * 2 / 3);
      ctx.lineTo(viewportX + VIEWPORT_WIDTH, viewportY + VIEWPORT_HEIGHT * 2 / 3);
      ctx.stroke();
    }
    
    ctx.setLineDash([]);

    // Colțuri decorative
    const cornerSize = 25;
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    
    // Colț stânga-sus
    ctx.beginPath();
    ctx.moveTo(viewportX, viewportY + cornerSize);
    ctx.lineTo(viewportX, viewportY);
    ctx.lineTo(viewportX + cornerSize, viewportY);
    ctx.stroke();
    
    // Colț dreapta-sus
    ctx.beginPath();
    ctx.moveTo(viewportX + VIEWPORT_WIDTH - cornerSize, viewportY);
    ctx.lineTo(viewportX + VIEWPORT_WIDTH, viewportY);
    ctx.lineTo(viewportX + VIEWPORT_WIDTH, viewportY + cornerSize);
    ctx.stroke();
    
    // Colț stânga-jos
    ctx.beginPath();
    ctx.moveTo(viewportX, viewportY + VIEWPORT_HEIGHT - cornerSize);
    ctx.lineTo(viewportX, viewportY + VIEWPORT_HEIGHT);
    ctx.lineTo(viewportX + cornerSize, viewportY + VIEWPORT_HEIGHT);
    ctx.stroke();
    
    // Colț dreapta-jos
    ctx.beginPath();
    ctx.moveTo(viewportX + VIEWPORT_WIDTH - cornerSize, viewportY + VIEWPORT_HEIGHT);
    ctx.lineTo(viewportX + VIEWPORT_WIDTH, viewportY + VIEWPORT_HEIGHT);
    ctx.lineTo(viewportX + VIEWPORT_WIDTH, viewportY + VIEWPORT_HEIGHT - cornerSize);
    ctx.stroke();

  }, [img, scale, position, showGrid]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleZoomIn = () => setScale(s => Math.min(s * 1.1, 3));
  const handleZoomOut = () => setScale(s => Math.max(s / 1.1, 0.1));

  const handleReset = () => {
    if (!img) return;
    const scaleX = VIEWPORT_WIDTH / img.naturalWidth;
    const scaleY = VIEWPORT_HEIGHT / img.naturalHeight;
    const minScale = Math.min(scaleX, scaleY, 1);
    setScale(minScale);
    setPosition({
      x: (CANVAS_SIZE - img.naturalWidth * minScale) / 2,
      y: (CANVAS_SIZE - img.naturalHeight * minScale) / 2
    });
  };

  const handleCrop = () => {
    if (!canvasRef.current || !img) return;
    
    // Creează un canvas nou doar pentru zona decupată
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = VIEWPORT_WIDTH;
    outputCanvas.height = VIEWPORT_HEIGHT;
    const ctx = outputCanvas.getContext('2d');
    if (!ctx) return;

    // Calculează ce parte din imagine e în viewport
    const viewportX = (CANVAS_SIZE - VIEWPORT_WIDTH) / 2;
    const viewportY = (CANVAS_SIZE - VIEWPORT_HEIGHT) / 2;
    
    // Coordonate în imaginea originală
    const sourceX = (viewportX - position.x) / scale;
    const sourceY = (viewportY - position.y) / scale;
    const sourceWidth = VIEWPORT_WIDTH / scale;
    const sourceHeight = VIEWPORT_HEIGHT / scale;

    ctx.drawImage(
      img,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT
    );

    const dataUrl = outputCanvas.toDataURL('image/jpeg', 0.95);
    onCrop(dataUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-xl">Ajustează imaginea</h3>
            <p className="text-sm text-gray-500 mt-1">
              {naturalSize.width}×{naturalSize.height} px • Zona albastră = ce se vede pe site
            </p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div 
          className="relative mx-auto rounded-xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="block"
          />
          
          {!isDragging && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-blue-600/80 rounded-full p-3 shadow-lg">
                <Move className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <button onClick={handleZoomOut} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <div className="flex-1">
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.01}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <button onClick={handleZoomIn} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
              <ZoomIn className="w-5 h-5" />
            </button>
            
            <span className="text-sm font-medium text-gray-600 w-16 text-right">
              {Math.round(scale * 100)}%
            </span>
          </div>

          <div className="flex gap-2">
            <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              <RotateCcw className="w-4 h-4" />
              Resetare
            </button>
            <button 
              onClick={() => setShowGrid(!showGrid)} 
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                showGrid ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Grid
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCrop}
              disabled={!img}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium shadow-lg"
            >
              <Check className="w-5 h-5" />
              Confirmă
            </button>
            <button onClick={onCancel} className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium">
              Anulează
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
