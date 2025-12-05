import React from "react";

interface DynamicFormProps {
  missionId: string;
  // Personne B ajoutera plus tard : onSubmit, gestion des erreurs, etc.
}

const DynamicForm: React.FC<DynamicFormProps> = ({ missionId }) => {
  return (
    <form
      className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-5"
      aria-describedby="form-helper"
      noValidate
    >
      <p id="form-helper" className="text-xs text-slate-400 mb-2">
        Les champs marqués par <span className="text-red-400">*</span> sont obligatoires.
      </p>

      {/* Nom */}
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-100"
        >
          Nom complet <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                     px-3 py-2 text-sm text-slate-50
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                     focus-visible:border-cyan-400"
          placeholder="Ex : Lina Ben Ahmed"
        />
        <p className="text-xs text-slate-500">
          Utilisé pour personnaliser ton message et notre réponse.
        </p>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-100"
        >
          Adresse email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                     px-3 py-2 text-sm text-slate-50
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                     focus-visible:border-cyan-400"
          placeholder="Ex : toi@email.com"
        />
        <p className="text-xs text-slate-500">
          Ton email ne sera jamais partagé avec des tiers.
        </p>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-100"
          >
            Message <span className="text-red-400">*</span>
          </label>
          <span className="text-[11px] text-slate-400">
            Tu peux aussi partir d’une suggestion IA à droite.
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                     px-3 py-2 text-sm text-slate-50 resize-y
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                     focus-visible:border-cyan-400"
          placeholder={
            missionId === "don"
              ? "Ex : Je souhaite soutenir vos projets 2025 avec un don..."
              : missionId === "benevolat"
              ? "Ex : Je serais ravi de participer comme bénévole sur..."
              : missionId === "contact"
              ? "Ex : Je vous écris à propos de..."
              : "Ex : J’aimerais en savoir plus sur vos actions..."
          }
        />
      </div>

      {/* Champs spécifiques par mission */}
      <fieldset className="space-y-3 border border-slate-800 rounded-xl px-3 py-3">
        <legend className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Informations spécifiques à la mission
        </legend>

        {missionId === "don" && (
          <>
            <div className="space-y-1">
              <label
                htmlFor="don-amount"
                className="block text-sm font-medium text-slate-100"
              >
                Montant du don (TND)
              </label>
              <input
                id="don-amount"
                name="don-amount"
                type="number"
                min={1}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                           px-3 py-2 text-sm text-slate-50
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                           focus-visible:border-emerald-400"
                placeholder="Ex : 50"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Récurrence
                </label>
                <select
                  name="don-recurrence"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                             px-3 py-2 text-sm text-slate-50
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                             focus-visible:border-emerald-400"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choisir une option
                  </option>
                  <option value="ponctuel">Ponctuel</option>
                  <option value="mensuel">Mensuel</option>
                  <option value="annuel">Annuel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-100">
                  Mode de paiement
                </label>
                <select
                  name="don-mode"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                             px-3 py-2 text-sm text-slate-50
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                             focus-visible:border-emerald-400"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choisir une option
                  </option>
                  <option value="cb">Carte bancaire</option>
                  <option value="virement">Virement</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>
          </>
        )}

        {missionId === "benevolat" && (
          <>
            <div className="space-y-1">
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-slate-100"
              >
                Compétences principales
              </label>
              <input
                id="skills"
                name="skills"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                           px-3 py-2 text-sm text-slate-50
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                           focus-visible:border-emerald-400"
                placeholder="Ex : développement web, design, communication..."
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-slate-100"
              >
                Disponibilité
              </label>
              <input
                id="availability"
                name="availability"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                           px-3 py-2 text-sm text-slate-50
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                           focus-visible:border-emerald-400"
                placeholder="Ex : soirs de semaine, week-end..."
              />
            </div>
          </>
        )}

        {missionId === "contact" && (
          <div className="space-y-1">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-slate-100"
            >
              Objet de ta demande
            </label>
            <input
              id="subject"
              name="subject"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                         px-3 py-2 text-sm text-slate-50
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                         focus-visible:border-emerald-400"
              placeholder="Ex : Question sur un événement, problème technique..."
            />
          </div>
        )}

        {missionId === "info" && (
          <div className="space-y-1">
            <label
              htmlFor="info-category"
              className="block text-sm font-medium text-slate-100"
            >
              Sujet principal
            </label>
            <select
              id="info-category"
              name="info-category"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70
                         px-3 py-2 text-sm text-slate-50
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                         focus-visible:border-emerald-400"
              defaultValue=""
            >
              <option value="" disabled>
                Choisir un sujet
              </option>
              <option value="projets">Projets 2025</option>
              <option value="evenements">Événements</option>
              <option value="partenariats">Partenariats</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        )}
      </fieldset>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl border border-cyan-500
                     bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100
                     hover:bg-cyan-500 hover:text-slate-950
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                     transition"
        >
          Envoyer ma mission
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
