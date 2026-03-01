import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <header className="px-6 py-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <span className="ml-4 font-bold text-lg text-gray-800">Términos de Servicio</span>
      </header>

      <main className="flex-1 p-6 overflow-y-auto leading-relaxed">
        <h1 className="text-2xl font-bold text-brand-dark mb-4">Términos y Condiciones</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">1. Uso del Servicio</h2>
          <p>
            Al utilizar ColorCompra, aceptas que los resultados generados por la inteligencia artificial son recomendaciones sugeridas y no deben interpretarse como asesoría profesional de salud o belleza definitiva.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">2. Propiedad Intelectual</h2>
          <p>
            Todo el contenido, diseño y algoritmos de ColorCompra son propiedad exclusiva de nuestro equipo. Queda prohibida la reproducción total o parcial del servicio sin autorización.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">3. Limitación de Responsabilidad</h2>
          <p>
            No nos hacemos responsables por compras realizadas en plataformas de terceros (como Amazon) basadas en nuestras recomendaciones. El usuario es responsable de verificar la idoneidad del producto antes de su adquisición.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">4. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento para adaptarnos a nuevas funcionalidades o requisitos legales.
          </p>
        </section>
      </main>
    </div>
  );
}
