import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function StoryGame({ story, onNewStory }) {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [options, setOptions] = useState([]);
  const [isEnding, setIsEnding] = useState(false);
  const [isWinningEnding, setIsWinningEnding] = useState(false);

  useEffect(() => {
    if (story && story.root_node) {
      const rootNodeId = story.root_node.id;
      setCurrentNodeId(rootNodeId);
    }
  }, [story]);

  useEffect(() => {
    if (currentNodeId && story && story.all_nodes) {
      const node = story.all_nodes[currentNodeId];

      setCurrentNode(node);
      setIsEnding(node.is_ending);
      setIsWinningEnding(node.is_winning_endig);

      if (!node.is_ending && node.options && node.options.length > 0) {
        setOptions(node.options);
      } else {
        setOptions([]);
      }
    }
  }, [currentNodeId, story]);

  const chooseOption = (optionId) => {
    setCurrentNodeId(optionId);
  };

  const restartStory = () => {
    if (story && story.root_node) {
      setCurrentNodeId(story.root_node.id);
    }
  };

  return (
    <motion.div
      className="story-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className="story-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{story.title}</h2>
      </motion.header>

      <div className="story-content">
        <AnimatePresence mode="wait">
          {currentNode && (
            <motion.div
              key={currentNodeId}
              className="story-node"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="story-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {currentNode.content}
              </motion.p>

              {isEnding ? (
                <motion.div
                  className={`story-ending ${isWinningEnding ? 'winning' : ''}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.h3
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {isWinningEnding ? '🏆 Congratulations!' : '📖 The End'}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {isWinningEnding
                      ? 'You reached a winning ending!'
                      : 'Your adventure has ended.'}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  className="story-options"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3>What will you do?</h3>
                  <div className="options-list">
                    {options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => chooseOption(option.node_id)}
                        className="option-btn"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.03, x: 10 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="option-number">{index + 1}</span>
                        <span className="option-text">{option.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="story-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={restartStory}
            className="control-btn restart-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Restart Story
          </motion.button>

          {onNewStory && (
            <motion.button
              onClick={onNewStory}
              className="control-btn new-story-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              New Story
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default StoryGame;
