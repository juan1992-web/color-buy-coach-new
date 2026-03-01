import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <span className="ml-4 font-bold text-lg text-gray-800">Sobre nosotros</span>
      </header>

      <main className="flex-1 p-6 text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-bold text-brand-dark mb-4">Misión de ColorCompra</h1>
        <p className="mb-4">
          ColorCompra nació con la idea de simplificar el mundo del maquillaje y la moda a través de la inteligencia artificial. Creemos que cada persona tiene una paleta de colores única que resalta su belleza natural.
        </p>
        <p className="mb-4 font-semibold">
          Nuestra tecnología analiza tu tono de piel, subtono y contraste para ofrecerte recomendaciones personalizadas de productos disponibles en el mercado.
        </p>
        
        <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">¿Por qué confiar en nosotros?</h2>
        <p className="mb-4">
          Nuestra IA ha sido entrenada con miles de perfiles de colorimetría profesional para asegurar que los resultados sean precisos y útiles para tu día a día.
        </p>

        <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">Contacto</h2>
        <p className="mb-4">
          Si tienes alguna pregunta, sugerencia o feedback, no dudes en escribirnos a:
        </p>
        <a href="mailto:hola@colorbuycoach.com" className="text-brand-magenta font-bold underline">
          hola@colorbuycoach.com
        </a>
      </main>
    </div>
  );
}
