import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home.tsx";
import FormPage from "./routes/FormPage.tsx";
import ConfirmationPage from "./routes/ConfirmationPage.tsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Lien pour passer directement au contenu (accessibilité) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                   bg-slate-900 text-slate-50 px-4 py-2 rounded-lg z-50"
      >
        Aller au contenu principal
      </a>

      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">
            Nexus Connecté <span className="text-cyan-400">2025</span>
          </h1>
          <span className="text-xs text-slate-400" aria-hidden="true">
            L&apos;IA au service du lien humain
          </span>
        </div>
      </header>

      <main
        id="main-content"
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-800 mt-8">
        <div className="max-w-5xl mx-auto px-4 py-3 text-xs text-slate-500 flex justify-between">
          <span>© 2025 Nexus Connecté</span>
          <span>Powered by Axolotl 🦎</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
