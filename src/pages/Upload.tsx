import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft, ImagePlus, LoaderCircle } from 'lucide-react';

export default function Upload() {
  const navigate = useNavigate();
  
  // State for user inputs
  const [photo, setPhoto] = useState<string | null>(null);
  const [accessory, setAccessory] = useState('');
  const [makeup, setMakeup] = useState('');
  const [budget, setBudget] = useState('');

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = photo && accessory && makeup && budget;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: photo,
          accessory,
          makeup,
          budget,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'El análisis falló. Por favor, intenta con otra foto.');
      }

      const resultData = await response.json();

      // Navigate to the result page with the data received from the API
      navigate('/result', { state: { resultData } });

    } catch (err: any) {
      setError(err.message || 'No se pudo conectar con el servidor. Revisa tu conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="px-6 py-4 flex items-center border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <span className="ml-4 font-bold text-lg text-gray-800">Sube tu foto</span>
      </header>

      <main className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Photo Upload Area */}
          <section>
            <label className="block text-sm font-bold text-gray-700 mb-3">Tu foto sin filtro</label>
            <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:bg-gray-200 transition-colors">
              {photo ? (
                <img src={photo} alt="Upload preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6 flex flex-col items-center">
                  <ImagePlus className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-brand-magenta font-semibold">Toca para subir</span>
                  <span className="text-xs text-gray-500 mt-1">Soporta JPG, PNG</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/jpeg, image/png"
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </section>

          {/* Questionnaire */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-bold text-lg text-brand-dark mb-4">Ayuda a afinar el resultado</h3>
            
            <section>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                ¿Qué accesorios sientes que te quedan mejor?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Dorado', 'Plateado', 'No sé'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAccessory(opt)}
                    className={`py-2 px-1 text-sm rounded-lg border font-medium transition-colors ${
                      accessory === opt 
                        ? 'border-brand-magenta bg-rose-50 text-brand-magenta' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Tu maquillaje preferido
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Natural', 'Intenso', 'Poco/Nada'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setMakeup(opt)}
                    className={`py-2 px-1 text-sm rounded-lg border font-medium transition-colors ${
                      makeup === opt 
                        ? 'border-brand-coral bg-orange-50 text-brand-coral' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Tu presupuesto hoy
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['<$10', '$10-25', '$25+'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBudget(opt)}
                    className={`py-2 px-1 text-sm rounded-lg border font-medium transition-colors ${
                      budget === opt 
                        ? 'border-brand-blue bg-blue-50 text-brand-blue' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </section>
          </div>

        </form>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button 
          fullWidth 
          size="lg" 
          disabled={!isFormValid || isLoading}
          onClick={handleSubmit}
          type="submit"
        >
          {isLoading ? (
            <><LoaderCircle className="animate-spin w-5 h-5 mr-2" /> Analizando...</>
          ) : (
            'Analizar mi color'
          )}
        </Button>
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
