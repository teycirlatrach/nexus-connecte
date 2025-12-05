const ConfirmationPage = () => {
  // En vrai, Personne B remplira ces données depuis un contexte
  const fakeName = "Cher ami du Nexus";
  const fakeMission = "Offrir un don";
  const fakeEmail = "toi@email.com";
  const year = 2025;

  return (
    <section className="space-y-6 max-w-2xl">
      <header className="space-y-2">
        <p className="text-sm text-emerald-400 uppercase tracking-[0.15em]">
          Étape 4
        </p>
        <h2 className="text-3xl font-bold tracking-tight">
          Merci, <span className="text-emerald-400">{fakeName}</span> ✨
        </h2>
        <p className="text-slate-300">
          Ta mission « <strong>{fakeMission}</strong> » a bien été enregistrée.
        </p>
      </header>

      <div
        className="relative overflow-hidden rounded-2xl border border-emerald-500/60
                   bg-gradient-to-br from-emerald-500/10 via-slate-950 to-cyan-500/10
                   p-4 md:p-5"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full
                     bg-emerald-500/15 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative space-y-3 text-sm text-slate-100">
          <p>
            En <strong>{year}</strong>, chaque interaction comme la tienne entraîne notre
            modèle d&apos;IA bienveillante et nous aide à mieux connecter bénévoles,
            donateurs et projets sociaux.
          </p>
          <p>
            Ton geste nourrit notre <strong>Nexus Connecté</strong> et permet de construire
            des réponses plus justes, plus rapides et plus humaines.
          </p>
        </div>
      </div>

      <section aria-labelledby="next-steps-title" className="space-y-2">
        <h3
          id="next-steps-title"
          className="text-sm font-semibold text-slate-100"
        >
          Et maintenant ?
        </h3>
        <ul className="space-y-1 text-sm text-slate-300 list-disc list-inside">
          <li>
            Tu vas recevoir un email de confirmation à{" "}
            <span className="font-medium text-slate-100">{fakeEmail}</span>.
          </li>
          <li>
            Notre équipe te répondra en adaptant le ton à l’émotion de ton message.
          </li>
          <li>
            Tu peux revenir à tout moment sur le Nexus pour une nouvelle interaction.
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-slate-700
                     px-4 py-2 text-sm font-medium text-slate-100
                     hover:bg-slate-800 focus:outline-none focus-visible:ring-2
                     focus-visible:ring-cyan-400"
        >
          Retourner au Nexus
        </a>
      </div>
    </section>
  );
};

export default ConfirmationPage;
