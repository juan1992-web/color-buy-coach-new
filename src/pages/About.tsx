import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Award, Zap, Heart } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Keeps existing design */}
      <header className="px-6 py-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <span className="ml-4 font-bold text-lg text-gray-800">Sobre ColorCompra</span>
      </header>

      <main className="flex-1 p-6 text-gray-700 leading-relaxed max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-brand-dark mb-4">Empoderando tu Belleza a través de la Ciencia del Color</h1>
          <p className="text-lg text-gray-600 italic">
            "En ColorCompra, creemos que el color no es solo estética, es una herramienta de confianza personal."
          </p>
        </section>

        {/* Content Section 1: Our Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-2">
            <Heart className="text-brand-magenta w-6 h-6" /> Nuestra Misión
          </h2>
          <p className="mb-4">
            ColorCompra nació de una necesidad simple pero profunda: democratizar el acceso a la asesoría de imagen profesional. Históricamente, el análisis de colorimetría personal ha sido un servicio exclusivo y costoso. Nuestra misión es poner el poder de la ciencia del color en manos de cada persona, de forma gratuita y accesible a través de la inteligencia artificial.
          </p>
          <p>
            No solo te decimos qué colores te quedan bien; te ayudamos a entender <strong>por qué</strong> funcionan para ti, permitiéndote tomar decisiones más conscientes en tu rutina diaria de belleza y moda.
          </p>
        </section>

        {/* Content Section 2: Why Personal Color? */}
        <section className="mb-10 bg-rose-50 p-6 rounded-2xl border border-rose-100">
          <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-2">
            <Award className="text-brand-coral w-6 h-6" /> ¿Qué es la Colorimetría Personal?
          </h2>
          <p className="mb-4">
            La colorimetría es el estudio de cómo los diferentes tonos, saturaciones y valores de color interactúan con nuestra pigmentación natural (piel, ojos y cabello). Un color "armónico" es aquel que ilumina tu rostro, suaviza las líneas de expresión y resalta tu mirada.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-magenta mb-2">Tono y Subtono</h3>
              <p className="text-sm">Identificamos si tu piel tiene una base cálida, fría o neutra, el primer paso crucial para elegir la base de maquillaje perfecta.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-magenta mb-2">Contraste Facial</h3>
              <p className="text-sm">Analizamos la diferencia de intensidad entre tus rasgos para recomendarte labiales y sombras que no te "apaguen".</p>
            </div>
          </div>
        </section>

        {/* Content Section 3: AI Technology */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-2">
            <Zap className="text-brand-magenta w-6 h-6" /> Tecnología con Propósito
          </h2>
          <p className="mb-4">
            Nuestra IA no es solo un filtro; es un motor de análisis avanzado entrenado con miles de perfiles colorimétricos. Al subir tu foto, nuestro algoritmo procesa:
          </p>
          <ul className="space-y-3 ml-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0 mt-1" />
              <span><strong>Muestreo de Piel:</strong> Analizamos múltiples puntos de tu rostro para obtener una lectura precisa del tono bajo diferentes condiciones de luz.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0 mt-1" />
              <span><strong>Mapeo de Productos:</strong> Cruzamos tus datos con una base de datos de productos reales para asegurar que nuestras recomendaciones sean prácticas y comprables.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0 mt-1" />
              <span><strong>Actualización Constante:</strong> Aprendemos de las tendencias y nuevos lanzamientos para mantener tu paleta siempre al día.</span>
            </li>
          </ul>
        </section>

        {/* Content Section 4: Value and Sustainability */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Más que Belleza: Ahorro y Sostenibilidad</h2>
          <p className="mb-4">
            ¿Sabías que el 60% de los productos de maquillaje comprados terminan en el fondo de un cajón porque "no nos convencen"? Al usar ColorCompra, no solo ahorras dinero evitando compras impulsivas de tonos que no te favorecen, sino que también contribuyes a reducir el desperdicio en la industria cosmética. 
          </p>
          <p className="font-bold text-brand-magenta">Comprar menos, pero comprar mejor. Ese es nuestro lema.</p>
        </section>

        {/* Contact Section */}
        <section className="mt-12 pt-8 border-t border-gray-100 text-center">
          <h2 className="text-xl font-bold text-brand-dark mb-4">¿Hablamos?</h2>
          <p className="mb-6 text-gray-600">
            Estamos en constante evolución y nos encantaría escuchar tu experiencia, sugerencias o dudas sobre tu análisis.
          </p>
          <a 
            href="mailto:hola@colorbuycoach.com" 
            className="inline-block bg-brand-dark text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg"
          >
            hola@colorbuycoach.com
          </a>
        </section>
      </main>
    </div>
  );
}
