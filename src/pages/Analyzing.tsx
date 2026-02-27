import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Analyzing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Analizando tono de piel...');

  useEffect(() => {
    const totalTime = 3000; // 3 seconds fake loading
    const interval = 100;
    const steps = totalTime / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep > steps * 0.3 && currentStep <= steps * 0.6) {
        setStage('Evaluando contraste natural...');
      } else if (currentStep > steps * 0.6) {
        setStage('Buscando las mejores recomendaciones...');
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        navigate('/result');
      }
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-neutral items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-brand-magenta rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="bg-white p-6 rounded-full shadow-lg relative z-10">
          <Loader2 className="w-12 h-12 text-brand-magenta animate-spin" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-brand-dark mb-4">
        Descubriendo tu color
      </h2>
      
      <p className="text-gray-500 font-medium mb-8 h-6">
        {stage}
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
        <div 
          className="bg-brand-magenta h-2.5 rounded-full transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
