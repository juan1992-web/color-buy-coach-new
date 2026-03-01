import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Sparkles, Palette, ShoppingBag } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-brand-neutral">
      {/* Header */}
      <header className="py-6 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Palette className="w-8 h-8 text-brand-magenta" width={32} height={32} />
          <span className="font-bold text-xl text-brand-dark tracking-tight">ColorCompra</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="mb-8 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-magenta to-brand-coral blur opacity-30 rounded-full" />
          <h1 className="relative text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight tracking-tight">
            Descubre qué comprar según <span className="text-brand-magenta">tu color</span>
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
          Sube una foto y recibe recomendaciones personalizadas de maquillaje para hoy.
          <br className="mt-2" />
          <span className="text-brand-dark font-bold">Menos duda. Mejores compras.</span>
        </p>

        <div className="space-y-4 w-full mt-auto">
          <Button 
            size="lg" 
            fullWidth 
            onClick={() => navigate('/guide')}
            className="group"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Probar gratis ahora
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            fullWidth
            onClick={() => {
              // Scroll to example or open modal in real app
            }}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Ver ejemplo
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-brand-magenta flex items-center justify-center mb-2">
              <span className="font-bold">1</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">Sube foto</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-brand-coral flex items-center justify-center mb-2">
              <span className="font-bold">2</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">IA Analiza</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-red-100 text-brand-red flex items-center justify-center mb-2">
              <span className="font-bold">3</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">Acierta</span>
          </div>
        </div>
      </main>
    </div>
  );
}
