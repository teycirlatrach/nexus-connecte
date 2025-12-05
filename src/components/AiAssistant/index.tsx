import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Copy, Check, Zap, Lightbulb } from "lucide-react";

type MissionId = "contact" | "don" | "benevolat" | "info";

interface AiAssistantPanelProps {
  missionId: MissionId;
}

const AiAssistantPanel: React.FC<AiAssistantPanelProps> = ({ missionId }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [copied, setCopied] = useState(false);

  const missionTips = {
    contact: {
      title: "Pour un contact efficace",
      tips: [
        "Présente-toi brièvement",
        "Sois clair sur ton objectif",
        "Propose un cadre pour la réponse",
        "Inclus tes coordonnées préférées"
      ],
      examples: [
        "Bonjour, je souhaite discuter de...",
        "Je cherche des informations sur...",
        "Pouvons-nous planifier un appel ?"
      ]
    },
    don: {
      title: "Maximise ton impact",
      tips: [
        "Précise le projet qui te tient à cœur",
        "Indique si tu préfères un don récurrent",
        "Mentionne ton souhait de recevoir des nouvelles",
        "Partage ta motivation personnelle"
      ],
      examples: [
        "Je souhaite soutenir spécifiquement...",
        "Mon don de [montant] pour le projet...",
        "Je veux contribuer régulièrement à..."
      ]
    },
    benevolat: {
      title: "Mets en valeur tes talents",
      tips: [
        "Liste tes compétences clés",
        "Indique ta disponibilité",
        "Précise tes centres d'intérêt",
        "Partage tes expériences passées"
      ],
      examples: [
        "En tant que [métier], je peux aider avec...",
        "Disponible [jours] pour [type de mission]",
        "Passionné(e) par [domaine], je propose..."
      ]
    },
    info: {
      title: "Obtenez des réponses précises",
      tips: [
        "Sois spécifique dans ta demande",
        "Précise le contexte",
        "Indique l'urgence si nécessaire",
        "Mentionne ce que tu as déjà consulté"
      ],
      examples: [
        "J'ai besoin de détails sur...",
        "Quand est prévu l'événement...",
        "Comment fonctionne le programme..."
      ]
    }
  };

  const generateSuggestion = async () => {
    setIsGenerating(true);
    // Simulation de génération IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    const tips = missionTips[missionId];
    const example = tips.examples[Math.floor(Math.random() * tips.examples.length)];
    setSuggestion(`Exemple de message : "${example}"\n\nConseil : ${tips.tips[0]}`);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-slate-800/50 
                 bg-gradient-to-b from-slate-900/40 to-slate-950/30 
                 p-6 space-y-6 backdrop-blur-sm"
    >
      {/* En-tête de l'assistant */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 
                         to-pink-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Assistant IA</h3>
            <p className="text-xs text-slate-400">Basé sur GPT-4</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full 
                       bg-purple-500/10 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-purple-400">En ligne</span>
        </div>
      </div>

      {/* Statistiques de l'IA */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-900/50 p-3 text-center">
          <div className="text-sm font-bold text-white">97%</div>
          <div className="text-xs text-slate-400">Satisfaction</div>
        </div>
        <div className="rounded-xl bg-slate-900/50 p-3 text-center">
          <div className="text-sm font-bold text-white">2.4s</div>
          <div className="text-xs text-slate-400">Réponse moyenne</div>
        </div>
      </div>

      {/* Conseils de mission */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h4 className="font-semibold text-sm">{missionTips[missionId].title}</h4>
        </div>
        <ul className="space-y-2">
          {missionTips[missionId].tips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center 
                             justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-blue-400">{index + 1}</span>
              </div>
              <span className="text-slate-300">{tip}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Génération de suggestion */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h4 className="font-semibold text-sm">Suggestion IA</h4>
          </div>
          {suggestion && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg 
                       bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copier
                </>
              )}
            </button>
          )}
        </div>

        {suggestion ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-xl bg-slate-900/50 p-4 text-sm text-slate-300 
                       whitespace-pre-line leading-relaxed"
          >
            {suggestion}
          </motion.div>
        ) : (
          <div className="rounded-xl bg-slate-900/50 p-4 text-center">
            <p className="text-sm text-slate-400 mb-3">
              Laisse l'IA te proposer un message optimisé
            </p>
          </div>
        )}

        <motion.button
          onClick={generateSuggestion}
          disabled={isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
                     text-white py-3 font-semibold flex items-center justify-center 
                     gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white 
                            rounded-full animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Générer une suggestion
            </>
          )}
        </motion.button>
      </div>

      {/* Footer de l'assistant */}
      <p className="text-xs text-slate-500 text-center pt-2 border-t border-slate-800/50">
        L'IA analyse le contexte pour des suggestions pertinentes
      </p>
    </motion.aside>
  );
};

export default AiAssistantPanel;