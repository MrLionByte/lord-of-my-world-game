import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingStatus from './LoadingStatus';
import StoryGame from './StoryGame';
import { storyService } from '../api/storyService';

function StoryLoader() {
  const location = useLocation();
  const id = location.state?.storyId;
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStory(id);
  }, [id]);

  const loadStory = async (storyId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await storyService.getStory(storyId);
      setStory(data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Story is not found.');
      } else {
        setError('Failed to load story');
      }
      setLoading(false);
    }
  };

  const createNewStory = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingStatus theme="story" />;
  }

  if (error) {
    return (
      <div className="story-loader">
        <motion.div
          className="error-message"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Story Not Found</h2>
          <p>{error}</p>
          <motion.button
            onClick={createNewStory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Story Generator
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (story) {
    return (
      <div className="story-loader">
        <StoryGame story={story} onNewStory={createNewStory} />
      </div>
    );
  }
}

export default StoryLoader;
