import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle2, XCircle, Camera } from 'lucide-react';

export default function Guide() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <span className="ml-4 font-bold text-lg text-gray-800">Guía de foto</span>
      </header>

      <main className="flex-1 flex flex-col p-6">
        <h1 className="text-2xl font-bold text-brand-dark mb-2">Para una mayor precisión</h1>
        <p className="text-gray-500 mb-8">Una buena foto es la clave para recomendarte los colores perfectos.</p>
        
        {/* Do's & Don'ts */}
        <div className="space-y-6 mb-10">
          <div className="flex items-start">
            <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-800">Luz natural de frente</h3>
              <p className="text-sm text-gray-500">Ponte frente a una ventana, de día es mejor.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-800">Rostro limpio o sin filtros</h3>
              <p className="text-sm text-gray-500">Intenta no usar maquillaje fuerte ni filtros de Instagram.</p>
            </div>
          </div>

          <div className="flex items-start">
            <XCircle className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-800">Evita luz amarilla y contraluz</h3>
              <p className="text-sm text-gray-500">Cuidado con las bombillas cálidas que alteran tu tono real.</p>
            </div>
          </div>
        </div>

        {/* Visual Examples Placeholder */}
        <div className="grid grid-cols-2 gap-4 mb-auto pb-8">
          <div className="rounded-xl bg-green-50 border-2 border-green-200 aspect-square flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 opacity-50 shadow-inner"></div>
            <span className="text-sm font-semibold text-green-700">Perfecto</span>
          </div>
          <div className="rounded-xl bg-red-50 border-2 border-red-200 aspect-square flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
             <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
              <XCircle className="w-4 h-4" />
            </div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full mb-2 opacity-80 shadow-inner"></div>
            <span className="text-sm font-semibold text-red-700">Luz amarilla</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400 mb-4">
            Tu foto se usa solo para generar recomendaciones y no se guarda.
          </p>
          <Button size="lg" fullWidth onClick={() => navigate('/upload')}>
            <Camera className="w-5 h-5 mr-2" />
            Entendido, subir foto
          </Button>
        </div>
      </main>
    </div>
  );
}
