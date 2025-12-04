import MissionSelector from "../components/MissionSelector";

const Home = () => (
  <section aria-labelledby="home-title" className="space-y-6">
    <header className="space-y-2">
      <p className="text-sm text-cyan-400 uppercase tracking-[0.15em]">
        Portail d&apos;intention
      </p>
      <h2 id="home-title" className="text-3xl md:text-4xl font-bold tracking-tight">
        Le Nexus Connecté : <span className="text-cyan-400">L&apos;Écho Personnalisé</span>
      </h2>
      <p className="text-slate-300 max-w-2xl">
        Étape 1 : <strong>choisis ce que tu veux faire</strong>. L’interface s’adapte à ton intention.
      </p>
    </header>

    <MissionSelector />

    <p className="text-xs text-slate-500">
      Interface pensée pour être accessible : navigation clavier, contraste renforcé, texte lisible.
    </p>
  </section>
);

export default Home;
