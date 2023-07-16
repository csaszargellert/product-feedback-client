import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./globalStyles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import FeedbackContextProvider from "./context/feedbackContext";
import UserContextProvider from "./context/userContext";
import App, { loader as appLoader } from "./App";
import AddFeedback from "./pages/AddFeedback";
import EditFeedback, {
  loader as editFeedbackLoader,
} from "./pages/EditFeedback";
import ErrorPage from "./pages/ErrorPage";
import RoadmapPage from "./pages/RoadmapPage";
import FeedbackPage, { loader as feedbackLoader } from "./pages/FeedbackPage";
import { manipulateFeedbackAction, deleteFeedback } from "./utils/actions";
import Login, { action as loginAction } from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/roadmap",
    element: <RoadmapPage />,
  },
  {
    path: "/feedback/",
    children: [
      {
        path: ":feedbackId",
        element: <FeedbackPage />,
        loader: feedbackLoader,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "add",
            element: <AddFeedback />,
            action: manipulateFeedbackAction,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit/:feedbackId",
            element: <EditFeedback />,
            action: manipulateFeedbackAction,
            loader: editFeedbackLoader,
          },
          {
            path: "delete/:feedbackId",
            element: null,
            action: deleteFeedback,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <FeedbackContextProvider>
        <RouterProvider router={router} />
        <GlobalStyle />
      </FeedbackContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
