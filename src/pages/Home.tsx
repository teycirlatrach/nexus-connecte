import MissionSelector from "../components/MissionSelector";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Users, Target, Zap } from "lucide-react";

const Home = () => (
  <section className="space-y-8 max-w-6xl mx-auto px-4">
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                     border border-blue-500/30">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-blue-400 font-medium">Nexus Connecté </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 
                        bg-clip-text text-transparent">
          Choisis ta
        </span>{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 
                        bg-clip-text text-transparent">
          mission d'impact
        </span>
      </h1>
      
      <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
        Notre interface s'adapte à ton intention. Sélectionne ta voie et laisse 
        l'intelligence artificielle te guider vers une expérience personnalisée.
      </p>
    </motion.header>

    {/* Stats en temps réel */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {[
        { icon: Users, label: "Bénévoles actifs", value: "1.2K", color: "blue" },
        { icon: Target, label: "Projets 2025", value: "47", color: "emerald" },
        { icon: Zap, label: "Interactions IA", value: "25K", color: "amber" },
        { icon: Sparkles, label: "Impact total", value: "98%", color: "purple" },
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="rounded-2xl border border-slate-800/50 bg-slate-900/30 
                     p-4 text-center backdrop-blur-sm"
        >
          <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-${stat.color}-500/20 
                         flex items-center justify-center`}>
            <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>

    {/* Sélecteur de missions */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="pt-4"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 
                          bg-clip-text text-transparent">
            Sélectionne ta mission
          </span>
        </h2>
        <p className="text-slate-400">
          Chaque choix débloque une expérience unique adaptée à tes besoins
        </p>
      </div>
      <MissionSelector />
    </motion.div>

    {/* Guide rapide */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-3xl border border-slate-800/50 bg-gradient-to-br 
                 from-slate-900/40 to-slate-950/30 p-6 mt-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center 
                       justify-center">
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </div>
        <h3 className="font-bold text-lg">Comment ça marche ?</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { step: "01", title: "Choisis", desc: "Sélectionne ta mission" },
          { step: "02", title: "Remplis", desc: "Formulaire intelligent adapté" },
          { step: "03", title: "Impacte", desc: "Recevais une réponse personnalisée" },
        ].map((item) => (
          <div key={item.step} className="space-y-2">
            <div className="text-sm font-medium text-cyan-400">{item.step}</div>
            <div className="font-semibold">{item.title}</div>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Home;