'use client';

import { useState, useEffect } from 'react';

export const useFeedback = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  // const res = await fetchFeedback();

  useEffect(() => {
    const fetch = async () => {
      const res = { httpStatusCode: 201, feedback: '피드백이 들어옵니다.' };
      if (res.httpStatusCode === 201) {
        setShowFeedback(true);
        setFeedback(res.feedback);
      }
    };
    fetch();
  }, []);

  return { showFeedback, setShowFeedback, feedback };
};
