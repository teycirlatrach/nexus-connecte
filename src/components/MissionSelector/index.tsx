import { useNavigate } from "react-router-dom";

type MissionId = "contact" | "don" | "benevolat" | "info";

const MISSIONS: { id: MissionId; emoji: string; title: string; description: string }[] = [
  { id: "contact", emoji: "📞", title: "Établir le contact",
    description: "Poser une question, partager une demande ou simplement dire bonjour." },
  { id: "don", emoji: "💰", title: "Offrir un don",
    description: "Soutenir un projet 2025 par un don ponctuel ou récurrent." },
  { id: "benevolat", emoji: "🛡️", title: "Rejoindre la guilde des bénévoles",
    description: "Mettre tes compétences au service d’actions concrètes." },
  { id: "info", emoji: "❓", title: "Demander des informations",
    description: "Mieux comprendre nos missions, événements et projets à venir." },
];

const MissionSelector = () => {
  const navigate = useNavigate();
  const handleSelect = (id: MissionId) => navigate("/form", { state: { missionId: id } });

  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-2" role="list">
      {MISSIONS.map((m) => (
        <button
          key={m.id}
          role="listitem"
          onClick={() => handleSelect(m.id)}
          className="group relative overflow-hidden rounded-2xl border border-slate-800
                     bg-slate-900/60 px-4 py-5 text-left shadow-sm
                     transition transform hover:-translate-y-1
                     hover:border-cyan-400/80 hover:shadow-cyan-500/20
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                       bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10
                       transition"
            aria-hidden="true"
          />
          <div className="relative space-y-2">
            <div className="text-3xl" aria-hidden="true">
              {m.emoji}
            </div>
            <h3 className="text-lg font-semibold">{m.title}</h3>
            <p className="text-sm text-slate-300">{m.description}</p>
            <span className="inline-flex items-center text-xs text-cyan-300 mt-2">
              Choisir cette mission <span aria-hidden className="ml-1">→</span>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MissionSelector;
