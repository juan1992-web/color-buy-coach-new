import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <header className="px-6 py-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <span className="ml-4 font-bold text-lg text-gray-800">Política de Privacidad</span>
      </header>

      <main className="flex-1 p-6 overflow-y-auto leading-relaxed">
        <h1 className="text-2xl font-bold text-brand-dark mb-4">Aviso de Privacidad</h1>
        <p className="mb-4 italic">Última actualización: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">1. Información que recopilamos</h2>
          <p className="mb-3">
            Para realizar el análisis de colorimetría, solicitamos acceso a tu cámara o que subas una fotografía de tu rostro.
          </p>
          <p className="font-semibold text-brand-magenta">
            Importante: No almacenamos tus fotografías en nuestros servidores. El procesamiento se realiza para generar los resultados y la imagen es descartada inmediatamente después.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">2. Uso de la información</h2>
          <p>
            Utilizamos los datos visuales únicamente para determinar tu tono de piel, subtono y contraste. No compartimos esta información con terceros con fines comerciales ni de identificación personal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">3. Cookies y Publicidad</h2>
          <p>
            Este sitio puede utilizar cookies para mejorar la experiencia del usuario. Además, utilizamos Google AdSense para mostrar anuncios, los cuales pueden utilizar cookies de terceros para mostrar anuncios relevantes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-brand-dark mb-3">4. Derechos del Usuario</h2>
          <p>
            Como usuario, tienes derecho a navegar de forma privada y a contactarnos para cualquier duda sobre el tratamiento de tus datos en <span className="font-bold">hola@colorbuycoach.com</span>.
          </p>
        </section>
      </main>
    </div>
  );
}
