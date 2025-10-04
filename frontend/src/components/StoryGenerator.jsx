import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeInput from './ThemeInput';
import LoadingStatus from './LoadingStatus';
import { storyService } from '../api/storyService';

function StoryGenerator() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('');
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let pollInterval;

    if (jobId && jobStatus === 'processing') {
      pollInterval = setInterval(() => {
        pollJobStatus(jobId);
      }, 5000);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [jobId, jobStatus]);

  const generateStory = async (theme) => {
    setLoading(true);
    setError(null);
    setTheme(theme);

    try {
      const data = await storyService.createStory(theme);
      const { job_id, status } = data;
      setJobId(job_id);
      setJobStatus(status);

      pollJobStatus(job_id);
    } catch (e) {
      setLoading(false);
      setError(`Failed to generate story: ${e.message}`);
    }
  };

  const pollJobStatus = async (id) => {
    try {
      const data = await storyService.getJobStatus(id);
      const { status, story_id, error: jobError } = data;
      setJobStatus(status);

      if (status === 'completed' && story_id) {
        fetchStory(story_id);
      } else if (status === 'failed' || jobError) {
        setError(jobError || 'Failed to generate story');
        setLoading(false);
      }
    } catch (e) {
      if (e.response?.status !== 404) {
        setError(`Failed to check story status: ${e.message}`);
        setLoading(false);
      }
    }
  };

  const fetchStory = async (id) => {
    try {
      setLoading(false);
      setJobStatus('completed');
      navigate('/story',{ state: { storyId: id } });
    } catch (e) {
      setError(`Failed to load story: ${e.message}`);
      setLoading(false);
    }
  };

  const reset = () => {
    setJobId(null);
    setJobStatus(null);
    setError(null);
    setTheme('');
    setLoading(false);
  };

  return (
    <div className="story-generator">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <p>{error}</p>
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}

        {!jobId && !error && !loading && (
          <ThemeInput key="theme-input" onSubmit={generateStory} />
        )}

        {loading && <LoadingStatus key="loading" theme={theme} />}
      </AnimatePresence>
    </div>
  );
}

export default StoryGenerator;
