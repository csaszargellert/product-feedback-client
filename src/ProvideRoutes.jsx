import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  json,
} from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import App, { loader as appLoader } from "./App";
import AddFeedback from "./pages/AddFeedback";
import EditFeedback, {
  loader as editFeedbackLoader,
} from "./pages/EditFeedback";
import ErrorPage from "./pages/ErrorPage";
import RoadmapPage from "./pages/RoadmapPage";
import FeedbackPage, {
  loader as feedbackLoader,
  action as commentAction,
} from "./pages/FeedbackPage";
import {
  manipulateFeedbackAction,
  deleteFeedback,
  upvoteFeedback,
} from "./utils/actions";
import Login, { action as loginAction } from "./pages/Login";
import AuthProvider from "./utils/auth";
import Holder from "./pages/Holder";
import { axiosBase } from "./utils/axios";

function ProvideRoutes() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      element: <Holder />,
      loader: () => {
        return {
          userIsAuthenticated: AuthProvider.isAuthenticated,
          userJwt: AuthProvider.jwt,
          userId: AuthProvider.id,
          user: AuthProvider.user,
        };
      },
      errorElement: <ErrorPage />,
      children: [
        {
          path: "upvotes/:feedbackId",
          action: upvoteFeedback,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "logout",
          action: async function () {
            console.log("LOGOUT");
            try {
              await AuthProvider.signout();
              return redirect("/");
            } catch (error) {
              if (error.response.status === 401) {
                return redirect("/");
              }
            }
          },
        },
        {
          path: "roadmap",
          element: <RoadmapPage />,
        },
        {
          id: "upvotes-loader",
          path: "/",
          loader: async () => {
            try {
              const response = await axiosBase("/upvote/all");
              return response.data.data;
            } catch (error) {
              throw json(
                {
                  error: error.response.data.error,
                },
                {
                  status: error.response.status,
                }
              );
            }
          },
          children: [
            {
              index: true,
              path: "/",
              element: <App />,
              loader: appLoader,
              errorElement: <ErrorPage />,
            },
            {
              path: "feedback/:feedbackId",
              element: <FeedbackPage />,
              loader: feedbackLoader,
              action: commentAction,
            },
          ],
        },
        {
          path: "feedback/",
          children: [
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
                  action: deleteFeedback,
                  errorElement: <ErrorPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default ProvideRoutes;
