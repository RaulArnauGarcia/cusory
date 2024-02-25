import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AuthRoutes from "./routes/AuthRoutes";
import Tasks from "./components/tasks/EntryTasks";
import TasksDetails from "./components/tasks/EntryDetails";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import TaskSolution from "./components/tasks/TaskSolutions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <Home />
            <Tasks />
          </>
        ),
      },
      {
        path: "auth/*",
        element: <AuthRoutes />,
      },
      {
        path: "user/*",
        element: <UserRoutes />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "tasks/:taskId",
        element: (
          <>
            <TasksDetails />
          </>
        ),
      },
      {
        path: "tasks/:taskId/solutions",
        element: <TaskSolution />,
      },
    ],
  },
]);

export default router;
