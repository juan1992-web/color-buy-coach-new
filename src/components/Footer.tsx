import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isLegalPage = ['/about', '/privacy', '/terms'].includes(location.pathname);

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 px-6 mt-auto">
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          <Link 
            to="/about" 
            replace={isLegalPage}
            className="text-sm text-gray-500 hover:text-brand-magenta font-medium"
          >
            Sobre nosotros
          </Link>
          <Link 
            to="/privacy" 
            replace={isLegalPage}
            className="text-sm text-gray-500 hover:text-brand-magenta font-medium"
          >
            Privacidad
          </Link>
          <Link 
            to="/terms" 
            replace={isLegalPage}
            className="text-sm text-gray-500 hover:text-brand-magenta font-medium"
          >
            Términos
          </Link>
          <a href="mailto:hola@colorbuycoach.com" className="text-sm text-gray-500 hover:text-brand-magenta font-medium">
            Contacto
          </a>
        </div>
        
        <p className="text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} ColorCompra. Todos los derechos reservados.
          <br />
          Hecho con ❤️ para tu estilo.
        </p>
      </div>
    </footer>
  );
}
