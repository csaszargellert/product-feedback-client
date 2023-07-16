import { createContext, useState } from "react";

export const FeedbackContext = createContext();

const FeedbackContextProvider = function ({ children }) {
  const [feedbacks, setFeedbacks] = useState(null);
  const [statuses, setStatuses] = useState(null);

  const value = {
    feedbacks,
    statuses,
    setStatuses,
    setFeedbacks,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContextProvider;
