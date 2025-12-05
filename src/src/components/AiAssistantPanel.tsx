import React from "react";

interface AiAssistantPanelProps {
  missionId: string;
}

const AiAssistantPanel: React.FC<AiAssistantPanelProps> = ({ missionId }) => {
  const missionHelperText: Record<string, string> = {
    don: "Propose un ton chaleureux et motivant pour encourager l’impact du don.",
    benevolat: "Met en avant ton envie d’aider et tes forces.",
    contact: "Explique clairement ton sujet dès la première phrase.",
    info: "Précise sur quoi tu veux des éclaircissements.",
  };

  return (
    <aside
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5 space-y-3"
      aria-label="Assistant IA"
    >
      <h2 className="text-lg font-semibold">Assistant IA 🤖</h2>
      <p className="text-sm text-slate-300">
        Si tu bloques pour rédiger ton message, cet assistant peut te proposer une base
        que tu pourras ensuite modifier.
      </p>

      <div className="text-xs text-slate-400 bg-slate-950/60 rounded-xl p-3">
        <p className="font-semibold mb-1">Conseil pour ta mission :</p>
        <p>
          {missionHelperText[missionId] ??
            "Prends le temps d’exprimer ce que tu ressens et ce que tu attends en retour."}
        </p>
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-center rounded-xl border border-emerald-500
                   bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-100
                   hover:bg-emerald-500 hover:text-slate-950
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                   transition"
      >
        Générer une suggestion de message
      </button>

      <p className="text-[11px] text-slate-500">
        (Personne B connectera ce bouton à une vraie IA qui adaptera le ton à ton intention.)
      </p>
    </aside>
  );
};

export default AiAssistantPanel;
