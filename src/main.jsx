import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./globalStyles";
import FeedbackContextProvider from "./context/feedbackContext";
import SortContextProvider from "./context/sortContext";
import ProvideRoutes from "./ProvideRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FeedbackContextProvider>
      <SortContextProvider>
        <ProvideRoutes />
        <GlobalStyle />
      </SortContextProvider>
    </FeedbackContextProvider>
  </React.StrictMode>
);
