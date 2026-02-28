import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft, Share2, Info, ExternalLink, RefreshCw } from 'lucide-react';

// Fake Data for MVP fallback
const MOCK_RESULT = {
  tone: 'Cálido',
  confidence: 'Media',
  subtone: 'Cálido/Neutral',
  contrast: 'Medio',
};

const MOCK_RECOMMENDATIONS = {
  lips: [
    { id: 1, name: 'Nude cálido suave', reason: 'Seguro para uso diario', price: '$8', tag: 'Seguro', type: 'Seguro', color: '#D4A373' },
    { id: 2, name: 'Rosa coral medio', reason: 'Da vida al rostro', price: '$12', tag: 'Favorito', type: 'Favorito', color: '#F28482' },
    { id: 3, name: 'Terracota suave', reason: 'Ideal para la noche', price: '$15', tag: 'Punto', type: 'Punto', color: '#E56B6F' },
  ],
  blush: [
    { id: 4, name: 'Melocotón mate', reason: 'Efecto natural', price: '$9', tag: 'Seguro', type: 'Seguro', color: '#FFB5A7' },
    { id: 5, name: 'Coral vibrante', reason: 'Luz instantánea', price: '$14', tag: 'Favorito', type: 'Favorito', color: '#FF9F1C' },
  ],
};

// Product card component
function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 mb-3">
      {/* Color Preview Swatch */}
      <div 
        className="w-12 h-12 rounded-full shrink-0 shadow-inner border border-gray-200"
        style={{ backgroundColor: product.color_hex || '#cccccc' }}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-gray-900 truncate pr-2">{product.nombre}</h4>
          <span className="font-bold text-brand-dark">${product.precio_usd}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2 leading-tight">{product.razon}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs px-2 py-1 rounded-md font-bold ${
            product.etiqueta === 'Seguro' ? 'bg-blue-50 text-brand-blue' : 
            product.etiqueta === 'Favorito' ? 'bg-orange-50 text-brand-coral' : 
            'bg-rose-50 text-brand-magenta'
          }`}>
            {product.etiqueta}
          </span>
          <button className="text-xs font-bold text-gray-400 hover:text-brand-magenta flex items-center">
            Ver más <ExternalLink className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  // Load from API state or fallback to Mocks
  const resultData = location.state?.resultData;
  
  // Default structure if data is missing
  const diagnosis = {
    tono_sugerido: resultData?.tono_sugerido || 'Neutro',
    confianza: resultData?.confianza || 'Baja',
    subtono: resultData?.subtono || 'Desconocido',
    contraste: resultData?.contraste || 'Medio'
  };

  const recomendacion = resultData?.recomendacion_de_hoy || {
    prioridad_compra: 'Analizando las mejores opciones para ti...',
    labiales: [],
    rubores: []
  };

  const handleShare = () => {
    const text = `¡Mi coach de color me recomendó estos productos! 😄\nPrueba gratis en: colorcompra.com`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <span className="ml-2 font-bold text-lg text-gray-800">Tus Resultados</span>
        </div>
        <button 
          onClick={handleShare}
          className="text-brand-magenta flex items-center font-bold text-sm bg-rose-50 px-3 py-1.5 rounded-full"
        >
          <Share2 className="w-4 h-4 mr-1" />
          Compartir
        </button>
      </header>

      <main className="flex-1 p-6">
        {/* Diagnosis Summary */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-coral opacity-10 rounded-full blur-2xl"></div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Tu tono sugerido</h2>
          <div className="flex items-end gap-3 mb-3 relative z-10">
            <span className="text-3xl font-extrabold text-brand-dark">{diagnosis.tono_sugerido}</span>
            <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md mb-1 flex items-center">
              Confianza: {diagnosis.confianza} <Info className="w-3 h-3 ml-1" />
            </span>
          </div>
          
          <p className="text-sm text-gray-600 relative z-10">
            Subtono: <span className="font-semibold">{diagnosis.subtono}</span> • Contraste: <span className="font-semibold">{diagnosis.contraste}</span>
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 relative z-10">
            <span>¿Resultado raro?</span>
            <button onClick={() => navigate('/upload')} className="text-brand-magenta font-bold flex items-center">
              <RefreshCw className="w-3 h-3 mr-1" />
              Tomar otra foto
            </button>
          </div>
        </section>

        {/* Recommendations Section */}
        <div className="mb-8">
          <h3 className="font-extrabold text-xl text-brand-dark mb-1">Recomendación de hoy</h3>
          <p className="text-sm text-brand-magenta font-bold mb-4 bg-rose-50 p-3 rounded-xl border border-rose-100">
            "{recomendacion.prioridad_compra}"
          </p>
          
          <div className="space-y-6">
            {/* Lips */}
            <section>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-red mr-2"></span>
                Labiales (Top 3)
              </h4>
              <div className="space-y-3">
                {recomendacion.labiales?.map((lip: any, idx: number) => (
                  <ProductCard key={idx} product={lip} />
                ))}
              </div>
            </section>

            {/* Blush */}
            <section>
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-brand-coral mr-2"></span>
                Rubores (Top 2)
              </h4>
              <div className="space-y-3">
                {recomendacion.rubores?.map((blush: any, idx: number) => (
                  <ProductCard key={idx} product={blush} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button 
          fullWidth 
          size="lg" 
          onClick={handleShare}
          className="shadow-glow"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Preguntarle a una amiga
        </Button>
      </div>
    </div>
  );
}