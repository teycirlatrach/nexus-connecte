import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import AiAssistantPanel from "../components/AiAssistantPanel";

const FormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const missionId = (location.state as { missionId?: string } | null)?.missionId ?? null;

  useEffect(() => {
    if (!missionId) {
      navigate("/");
    }
  }, [missionId, navigate]);

  if (!missionId) {
    return null;
  }

  const missionLabels: Record<string, string> = {
    contact: "Établir le contact",
    don: "Offrir un don",
    benevolat: "Rejoindre la guilde des bénévoles",
    info: "Demander des informations",
  };

  return (
    <section className="space-y-6" aria-labelledby="form-title">
      <header className="space-y-2">
        <p className="text-sm text-emerald-400 uppercase tracking-[0.15em]">
          Étape 2
        </p>
        <h2
          id="form-title"
          className="text-2xl md:text-3xl font-bold tracking-tight"
        >
          Tu es en train de :{" "}
          <span className="text-emerald-400">
            {missionLabels[missionId] ?? "Remplir ta mission"}
          </span>
        </h2>
        <p className="text-slate-300 max-w-2xl">
          Tu n’auras à remplir que les champs vraiment nécessaires. L&apos;IA peut te suggérer
          un message de base que tu pourras adapter.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <DynamicForm missionId={missionId} />
        <AiAssistantPanel missionId={missionId} />
      </div>
    </section>
  );
};

export default FormPage;
