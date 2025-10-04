import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameIcon from '../assets/download.png';


function ThemeInput({ onSubmit }) {
  const [showIcon, setShowIcon] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!theme.trim()) {
      setError('Please enter a theme name');
      return;
    }

    setError('');
    onSubmit(theme);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(false);
      setTimeout(() => setShowForm(true), 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

    return (
    <div className="story-generator flex flex-col items-center justify-center h-screen relative overflow-hidden">
      <AnimatePresence>
        {showIcon && (
          <motion.img
            key="game-icon"
            src={GameIcon}
            alt="Game Icon"
            className="w-24 h-24 absolute"
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 120 },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              x: "40vw",
              y: "40vh",
              transition: { duration: 1 },
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            key="form"
            className="theme-input-container bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-2 text-white"
            >
              Generate Your Adventure
            </motion.h2>

            <motion.p
              className="subtitle text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Enter a theme for your interactive story
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="input-group flex flex-col">
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g. pirates, space, medieval..."
                  className={`p-3 rounded-md text-black ${
                    error ? "border border-red-400" : ""
                  }`}
                />
                {error && (
                  <motion.p
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                className="generate-btn bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Generate Story
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
}

export default ThemeInput;
