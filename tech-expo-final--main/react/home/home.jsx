
"use client"; // Needed only for Next.js App Router
import { motion } from "framer-motion";
import {
  FaEye,
  FaPlay,
  FaCode,
  FaBullseye,
  FaBook,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: <FaEye className="text-indigo-400" />,
      title: "Visual Learning",
      desc: "See algorithms in action with animations, variable tracking, and step-by-step execution.",
    },
    {
      icon: <FaPlay className="text-green-400" />,
      title: "Interactive Control",
      desc: "Play, pause, step through algorithms at your own pace and adjust speed to learn deeper.",
    },
    {
      icon: <FaCode className="text-purple-400" />,
      title: "Code Synchronization",
      desc: "Watch execution line-by-line with synchronized visuals. See exactly how state changes.",
    },
    {
      icon: <FaBullseye className="text-orange-400" />,
      title: "Interview Ready",
      desc: "Practice FAANG-style problems with optimal solutions and time/space complexity analysis.",
    },
    {
      icon: <FaBook className="text-pink-400" />,
      title: "Comprehensive Coverage",
      desc: "From arrays to advanced graphs, covering all major DSA topics with clear explanations.",
    },
    {
      icon: <FaBolt className="text-indigo-400" />,
      title: "Faster Learning",
      desc: "Cut learning time by 70% compared to traditional methods, especially for visual learners.",
    },
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      feedback:
        "This platform completely changed the way I learn algorithms! Visuals make everything so clear.",
    },
    {
      name: "Michael Lee",
      feedback:
        "Interactive controls helped me practice coding step by step. Highly recommend!",
    },
    {
      name: "Sara Williams",
      feedback: "I improved my interview prep drastically. CodeLearn is amazing!",
    },
  ];

  const stats = [
    { label: "Algorithms Covered", value: "150+" },
    { label: "Active Users", value: "25k+" },
    { label: "Problems Solved", value: "120k+" },
    { label: "Companies Reached", value: "200+" },
  ];

  const faqs = [
    {
      question: "Is CODELEARN free?",
      answer:
        "Yes! We have a free plan for beginners. Premium plans unlock advanced features.",
    },
    {
      question: "Can I practice for interviews?",
      answer:
        "Absolutely. Our platform is designed for interview readiness with step-by-step solutions.",
    },
    {
      question: "Do I need to install anything?",
      answer: "No, CODELEARN runs completely in your browser.",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-32 text-center overflow-hidden">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="px-4 py-1 bg-indigo-900 text-indigo-300 rounded-full text-sm font-medium shadow-sm"
        >
          🚀 Free Beta Access
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
        >
          Learn <span className="text-indigo-400">Programming</span> Visually
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Describe any algorithm or coding problem and watch it come alive with
          visual charts, output, and flowchart at the same time.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-8 py-4 mt-8 bg-indigo-600 text-white rounded-xl shadow-lg hover:shadow-indigo-400 transition"
        >
          Let's Try 🚀
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 mx-auto max-w-5xl"
        >
          <img
            src="banner-1.png"
            alt="Hero"
            className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-xl shadow-2xl hover:scale-105 transition"
          />
        </motion.div>
      </section>

      {/* SIDE-BY-SIDE IMAGE SECTION */}
      <section className="bg-gray-900 text-white py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Visual Insights
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img
              src="FlowChart.jpg"
              alt="Flowchart Example"
              className="w-full h-auto rounded-xl shadow-2xl hover:scale-105 transition"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img
              src="ggvkd.jpg"
              alt="Algorithm Visualization"
              className="w-full h-auto rounded-xl shadow-2xl hover:scale-105 transition"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-black text-white py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Why Choose <span className="text-indigo-400">CODELEARN</span>?
        </h2>
        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-center leading-relaxed">
          Transform your DSA learning with interactive visualizations that make
          complex code easy to understand.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 px-6 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="text-left p-6 bg-gray-900 rounded-xl shadow-md transition hover:shadow-indigo-600"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-300 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CODING CHALLENGES */}
      <section className="bg-gray-900 py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Coding Challenges
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            "Arrays",
            "Graphs",
            "Dynamic Programming",
            "Strings",
            "Recursion",
            "Sorting",
          ].map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl shadow-md text-center transition hover:shadow-indigo-500"
            >
              <FaCheckCircle className="text-indigo-400 mx-auto text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{c}</h3>
              <p className="text-gray-300 text-sm">
                Practice {c} problems with visualized solutions.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="bg-black py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Platform Achievements
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <h3 className="text-4xl font-bold text-indigo-400">{s.value}</h3>
              <p className="text-gray-300 mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-800 text-white py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              <p className="text-gray-300 mb-4">"{t.feedback}"</p>
              <h4 className="font-semibold text-indigo-400">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-black py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-gray-900 p-6 rounded-xl shadow-md"
            >
              <h3 className="font-semibold text-indigo-400 mb-2">
                {f.question}
              </h3>
              <p className="text-gray-300">{f.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER / SUBSCRIBE */}
      <section className="bg-indigo-900 text-white py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe for Updates
        </h2>
        <p className="mb-8 text-gray-200 text-lg md:text-xl">
          Get tips, new challenges, and updates directly in your inbox.
        </p>
        <input
          type="email"
          placeholder="Your email"
          className="px-6 py-3 w-1/3 max-w-sm rounded-l-xl font-bold text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-r-xl shadow-lg hover:shadow-indigo-600 transition">
          Subscribe
        </button>
      </section>

      {/* PRICING SECTION */}
      <section className="bg-black text-white py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Pricing Plans
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {["Free", "Pro", "Enterprise"].map((plan, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-indigo-600 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{plan}</h3>
              <p className="text-gray-300 mb-4">
                Some description about {plan} plan.
              </p>
              <p className="text-3xl font-bold mb-4">
                {plan === "Free"
                  ? "$0"
                  : plan === "Pro"
                  ? "$19/mo"
                  : "$49/mo"}
              </p>
              <button className="px-6 py-3 bg-indigo-600 rounded-xl shadow-lg hover:shadow-indigo-400 transition w-full">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-indigo-800 text-white py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Learning Today
        </h2>
        <p className="mb-8 text-gray-200 text-lg md:text-xl">
          Join thousands of learners and master programming visually.
        </p>
        <button className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:shadow-indigo-600 transition">
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-12 px-6 text-center">
        <p>&copy; 2025 CODELEARN. All rights reserved.</p>
      </footer>
    </main>
  );
}
