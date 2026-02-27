import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Analyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Analizando tono de piel...');

  useEffect(() => {
    // Fake progress bar for visual feedback
    const totalTime = 4000;
    const interval = 100;
    const steps = totalTime / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / steps) * 100;
      // Hold at 90% until fetch finishes
      setProgress(currentProgress > 90 ? 90 : currentProgress);

      if (currentStep > steps * 0.3 && currentStep <= steps * 0.6) {
        setStage('Evaluando contraste natural...');
      } else if (currentStep > steps * 0.6) {
        setStage('Buscando las mejores recomendaciones...');
      }
    }, interval);

    const performAnalysis = async () => {
      try {
        const payload = location.state;
        if (!payload || !payload.imageBase64) {
           navigate('/upload');
           return;
        }

        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Error de API");
        
        const data = await res.json();
        clearInterval(timer);
        setProgress(100);
        
        // Wait slightly so 100% is visible
        setTimeout(() => {
          navigate('/result', { state: { resultData: data } });
        }, 400);

      } catch (err) {
        console.error("Analysis failed:", err);
        clearInterval(timer);
        // Fallback or handle error. We navigate to result to show mock data for now.
        navigate('/result'); 
      }
    };

    performAnalysis();

    return () => clearInterval(timer);
  }, [navigate, location.state]);

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
