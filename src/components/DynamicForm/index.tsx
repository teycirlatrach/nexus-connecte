import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";

type MissionId = "contact" | "don" | "benevolat" | "info";

interface DynamicFormProps {
  missionId: MissionId;
}

type FormValues = {
  name: string;
  email: string;
  message: string;
  amount?: string;
  skills?: string;
  urgency?: "low" | "medium" | "high";
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const DynamicForm: React.FC<DynamicFormProps> = ({ missionId }) => {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
    amount: "",
    skills: "",
    urgency: "medium",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const missionConfig = {
    contact: {
      color: "blue",
      icon: "🤝",
      placeholder: "Parle-nous de ta demande...",
    },
    don: {
      color: "purple",
      icon: "✨",
      placeholder: "Explique-nous ta motivation pour soutenir nos projets...",
    },
    benevolat: {
      color: "emerald",
      icon: "🌟",
      placeholder: "Partage tes compétences et ta disponibilité...",
    },
    info: {
      color: "amber",
      icon: "🔍",
      placeholder: "Que souhaites-tu savoir ?",
    },
  };

  const config = missionConfig[missionId];

  const handleChange = (
    field: keyof FormValues
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.name.trim()) newErrors.name = "Ton nom est requis";
    if (!values.email.trim()) {
      newErrors.email = "Une adresse email est nécessaire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Email invalide";
    }
    if (!values.message.trim() || values.message.length < 10) {
      newErrors.message = "Un message d'au moins 10 caractères est requis";
    }

    if (missionId === "don" && !values.amount) {
      newErrors.amount = "Merci d'indiquer un montant";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br 
                   from-emerald-500/10 to-slate-900/50 p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 
                     flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-emerald-100">
          Mission accomplie ! 🎉
        </h3>
        <p className="text-slate-300 mb-6">
          Ton message a été transmis à notre équipe. Tu recevras une confirmation par email.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-100 
                     border border-emerald-500/30 hover:bg-emerald-500/30 
                     transition-colors"
        >
          Envoyer un autre message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-800/50 
                 bg-gradient-to-br from-slate-900/40 to-slate-950/30 
                 p-6 md:p-8 backdrop-blur-sm"
    >
      {/* En-tête avec badge */}
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl bg-${config.color}-500/20 
                       flex items-center justify-center text-xl`}>
          {config.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg">Formulaire {missionLabels[missionId]}</h3>
          <p className="text-xs text-slate-400">Tous les champs sont requis</p>
        </div>
      </div>

      {/* Champ Nom */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <span className={`w-2 h-2 rounded-full bg-${config.color}-500`} />
          Identité
          <span className="text-red-400 ml-auto text-xs">Requis</span>
        </label>
        <input
          type="text"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Comment souhaites-tu qu'on t'appelle ?"
          className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50
                     px-4 py-3 text-slate-100 placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50
                     focus:border-blue-500/50 transition-all"
          aria-invalid={!!errors.name}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-red-400 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" /> {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Champ Email avec validation visuelle */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <span className={`w-2 h-2 rounded-full bg-${config.color}-500`} />
          Contact
          <span className="text-red-400 ml-auto text-xs">Requis</span>
        </label>
        <div className="relative">
          <input
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder="ton@email.com"
            className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50
                       px-4 py-3 text-slate-100 placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50
                       focus:border-blue-500/50 transition-all pr-10"
            aria-invalid={!!errors.email}
          />
          {values.email && !errors.email && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                   w-5 h-5 text-emerald-400" />
          )}
        </div>
      </div>

      {/* Champ Message avec compteur */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm font-medium">
            <span className={`w-2 h-2 rounded-full bg-${config.color}-500`} />
            Message
          </label>
          <span className={`text-xs ${values.message.length < 10 ? 'text-red-400' : 'text-emerald-400'}`}>
            {values.message.length}/500
          </span>
        </div>
        <textarea
          value={values.message}
          onChange={handleChange("message")}
          placeholder={config.placeholder}
          rows={5}
          maxLength={500}
          className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50
                     px-4 py-3 text-slate-100 placeholder-slate-500 resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50
                     focus:border-blue-500/50 transition-all"
          aria-invalid={!!errors.message}
        />
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${values.message.length > 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${(values.message.length / 500) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Champs spécifiques selon la mission */}
      {missionId === "don" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-2"
        >
          <label className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Montant du don
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["50", "100", "250", "500", "1000", "Autre"].map((amount) => (
              <button
                type="button"
                key={amount}
                onClick={() => setValues(prev => ({ ...prev, amount }))}
                className={`py-2 rounded-lg border transition-all ${
                  values.amount === amount
                    ? 'border-purple-500 bg-purple-500/20 text-purple-100'
                    : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-purple-500/50'
                }`}
              >
                {amount === "Autre" ? "Autre" : `${amount}€`}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bouton de soumission */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full rounded-xl bg-gradient-to-r from-${config.color}-500 
                   to-${config.color}-600 text-white py-4 font-semibold
                   flex items-center justify-center gap-3 transition-all
                   hover:shadow-lg hover:shadow-${config.color}-500/25
                   disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Transmission en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Envoyer ma mission
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

const missionLabels = {
  contact: "Contact",
  don: "Don",
  benevolat: "Bénévolat",
  info: "Information",
};

export default DynamicForm;