import { useNavigate } from "react-router-dom";

type MissionCard = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

const MISSIONS: MissionCard[] = [
  {
    id: "contact",
    emoji: "📞",
    title: "Établir le contact",
    description: "Poser une question, partager une demande ou simplement dire bonjour.",
  },
  {
    id: "don",
    emoji: "💰",
    title: "Offrir un don",
    description: "Soutenir un projet 2025 par un don ponctuel ou récurrent.",
  },
  {
    id: "benevolat",
    emoji: "🛡️",
    title: "Rejoindre la guilde des bénévoles",
    description: "Mettre tes compétences au service d’actions concrètes.",
  },
  {
    id: "info",
    emoji: "❓",
    title: "Demander des informations",
    description: "Mieux comprendre nos missions, événements et projets à venir.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleSelectMission = (id: string) => {
    // Personne B branchera un contexte plus tard
    navigate("/form", { state: { missionId: id } });
  };

  return (
    <section aria-labelledby="home-title" className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-cyan-400 uppercase tracking-[0.15em]">
          Portail d&apos;intention
        </p>
        <h2
          id="home-title"
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Le Nexus Connecté : <span className="text-cyan-400">L&apos;Écho Personnalisé</span>
        </h2>
        <p className="text-slate-300 max-w-2xl">
          Étape 1 : <strong>choisis ce que tu veux faire</strong>. 
          L’interface s’adaptera à ton intention grâce à un formulaire vivant et une IA bienveillante.
        </p>
      </header>

      <div
        className="grid gap-4 md:gap-6 md:grid-cols-2"
        role="list"
        aria-label="Missions disponibles"
      >
        {MISSIONS.map((mission) => (
          <button
            key={mission.id}
            role="listitem"
            onClick={() => handleSelectMission(mission.id)}
            className="group relative overflow-hidden rounded-2xl border border-slate-800
                       bg-slate-900/60 px-4 py-5 text-left shadow-sm
                       transition transform hover:-translate-y-1
                       hover:border-cyan-400/80 hover:shadow-cyan-500/20
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`${mission.emoji} ${mission.title}`}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                         bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10
                         transition"
              aria-hidden="true"
            />
            <div className="relative space-y-2">
              <div className="text-3xl" aria-hidden="true">
                {mission.emoji}
              </div>
              <h3 className="text-lg font-semibold">{mission.title}</h3>
              <p className="text-sm text-slate-300">{mission.description}</p>
              <span className="inline-flex items-center text-xs text-cyan-300 mt-2">
                Choisir cette mission
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Interface pensée pour être accessible : navigation clavier, contraste renforcé,
        texte lisible et retour visuel immédiat à chaque action.
      </p>
    </section>
  );
};

export default Home;
