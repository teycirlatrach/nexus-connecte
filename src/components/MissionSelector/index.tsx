import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

type MissionId = "contact" | "don" | "benevolat" | "info";

const MISSIONS: {
  id: MissionId;
  emoji: string;
  title: string;
  description: string;
  color: string;
  gradient: string;
}[] = [
  {
    id: "contact",
    emoji: "🤝",
    title: "Établir le contact",
    description: "Poser une question, partager une demande ou simplement dire bonjour.",
    color: "from-blue-500 to-cyan-400",
    gradient: "bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/10",
  },
  {
    id: "don",
    emoji: "✨",
    title: "Offrir un don",
    description: "Soutenir un projet 2025 par un don ponctuel ou récurrent.",
    color: "from-purple-500 to-pink-400",
    gradient: "bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/10",
  },
  {
    id: "benevolat",
    emoji: "🌟",
    title: "Rejoindre la guilde",
    description: "Mettre tes compétences au service d'actions concrètes.",
    color: "from-emerald-500 to-green-400",
    gradient: "bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/10",
  },
  {
    id: "info",
    emoji: "🔍",
    title: "Demander des infos",
    description: "Comprendre nos missions, événements et projets à venir.",
    color: "from-amber-500 to-orange-400",
    gradient: "bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/10",
  },
];

const MissionSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (id: MissionId) => {
    navigate("/form", { state: { missionId: id } });
  };

  return (
    <div className="grid gap-5 md:gap-6 md:grid-cols-2 max-w-6xl mx-auto">
      {MISSIONS.map((m, index) => (
        <motion.button
          key={m.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          onClick={() => handleSelect(m.id)}
          className="group relative overflow-hidden rounded-3xl border border-slate-800/50
                     bg-slate-900/40 backdrop-blur-sm px-6 py-7 text-left
                     transition-all duration-500 hover:scale-[1.02] hover:border-opacity-60
                     hover:shadow-2xl hover:shadow-slate-900/50"
          style={{
            background: `linear-gradient(145deg, rgba(15,23,42,0.6) 0%, rgba(2,6,23,0.4) 100%)`,
          }}
        >
          {/* Effet de fond animé */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-700 ${m.gradient}`}
            aria-hidden="true"
          />
          
          {/* Effet de bordure lumineuse */}
          <div
            className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${m.color} 
                       opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500`}
            aria-hidden="true"
          />
          
          {/* Particules flottantes */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="w-5 h-5 text-white/50" />
          </div>

          <div className="relative space-y-4">
            {/* Emoji avec animation */}
            <motion.div
              className={`text-4xl w-16 h-16 rounded-2xl flex items-center justify-center
                         bg-gradient-to-br ${m.color} shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {m.emoji}
            </motion.div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 
                           bg-clip-text text-transparent">
                {m.title}
              </h3>
              
              <p className="text-slate-300/80 text-sm leading-relaxed">
                {m.description}
              </p>
              
              <div className="flex items-center pt-2">
                <span className="text-xs font-medium text-slate-400 group-hover:text-white 
                               transition-colors duration-300">
                  Commencer cette mission
                </span>
                <ArrowRight className="ml-2 w-4 h-4 text-slate-400 group-hover:text-white 
                                     group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* Effet hover subtil */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent 
                       via-white/20 to-transparent opacity-0 group-hover:opacity-100 
                       transition-opacity duration-500"
            aria-hidden="true"
          />
        </motion.button>
      ))}
    </div>
  );
};

export default MissionSelector;