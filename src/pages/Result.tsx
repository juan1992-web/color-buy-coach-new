import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '../components/Button';

// WhatsApp Icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// CORRECT AMAZON AFFILIATE TAG
const AMAZON_ASSOCIATE_TAG = 'colorbuycoach-20';

// Helper to build the Amazon link for the Spanish marketplace
const createAmazonLink = (searchTerm: string) => {
  const searchParams = new URLSearchParams({
    k: searchTerm,
    tag: AMAZON_ASSOCIATE_TAG,
  });
  // Points to Amazon Spain
  return `https://www.amazon.es/s?${searchParams.toString()}`;
};

// Product card component
function ProductCard({ product }: { product: any }) {
  const amazonLink = createAmazonLink(product.amazon_search_query || product.nombre);

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
          <a 
            href={amazonLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-gray-400 hover:text-brand-magenta flex items-center"
          >
            Ver más <ExternalLink className="w-3 h-3 ml-1" />
          </a>
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
    rubores: [],
    sombras: []
  };

  const handleShare = () => {
    const appUrl = window.location.origin;
    const text = `¡Descubrí mi paleta de colores ideal con esta app! 😄 Échale un vistazo y prueba gratis:\n${appUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-48">
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
          className="text-[#25D366] flex items-center font-bold text-sm bg-green-50 px-3 py-1.5 rounded-full border border-green-100"
        >
          <WhatsAppIcon className="w-4 h-4 mr-1.5" />
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
            <button onClick={() => navigate('/upload', { replace: true })} className="text-brand-magenta font-bold flex items-center">
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

            {/* Shadows */}
            {recomendacion.sombras && recomendacion.sombras.length > 0 && (
              <section>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-magenta mr-2"></span>
                  Sombras de ojos (Top 2)
                </h4>
                <div className="space-y-3">
                  {recomendacion.sombras.map((shadow: any, idx: number) => (
                    <ProductCard key={idx} product={shadow} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button 
          fullWidth 
          size="lg" 
          onClick={handleShare}
          className="bg-[#25D366] hover:bg-[#20bd5c] border-none shadow-[0_4px_14px_0_rgba(37,211,102,0.39)]"
        >
          <WhatsAppIcon className="w-5 h-5 mr-2" />
          Preguntarle a una amiga
        </Button>
      </div>
    </div>
  );
}
