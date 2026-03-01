import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Guide from './pages/Guide';
import Upload from './pages/Upload';
import Analyzing from './pages/Analyzing';
import Result from './pages/Result';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/analyzing" element={<Analyzing />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;