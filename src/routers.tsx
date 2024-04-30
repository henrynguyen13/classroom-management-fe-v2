import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import MainLayout from "./components/layout/MainLayout";
import ClassListPage from "./features/classes/components/ClassListPage";
import ClassDetailPage from "./features/classes/components/ClassDetailPage";
import CreateAssignmentPage from "./features/assignments/components/CreateAssignmentPage";
import AssignmentDetailPage from "./features/assignments/components/AssignmentDetailPage";
import ResponseDetailPage from "./features/responses/components/ResponseDetailPage";
import DashBoard from "./features/dashboard/DashBoard";
import ProfilePage from "./features/profile/components/ProfilePage";
import UsersPage from "./features/users/components/UsersPage";
import TestLayout from "./components/layout/TestLayout";
import TestPage from "./features/tests/components/TestPage";
import BaseLayout from "./components/layout/BaseLayout";
import TestResultPage from "./features/tests/components/TestResultPage";
import Root from "./app";
import UserDetailPage from "./features/users/components/UserDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        // loader: redirectIfUser,
      },
      {
        path: "/register",
        element: <Register />,
        // loader: redirectIfUser,
      },
      //   {
      //     path: "logout",
      //     action: logoutUser,
      //   },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/classes",
        element: <ClassListPage />,
      },
      {
        path: "/classes/:id",
        element: <ClassDetailPage />,
      },
      {
        path: "/classes/:id/assignment",
        element: <CreateAssignmentPage />,
      },
      {
        path: "/classes/:id/assignment/:assignmentId",
        element: <AssignmentDetailPage />,
      },
      {
        path: "/classes/:id/assignment/:assignmentId/response",
        element: <ResponseDetailPage />,
      },
      //   {
      //     path: "/my-classes",
      //     element: <MyClassListPage />,
      //   },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetailPage />,
      },
    ],
  },

  {
    element: <TestLayout />,
    children: [
      {
        path: "/classes/:id/assignment/:assignmentId",
        element: <TestPage />,
      },
    ],
  },

  {
    element: <BaseLayout />,
    children: [
      {
        path: "classes/:id/assignment/:assignmentId/result",
        element: <TestResultPage />,
      },
    ],
  },
]);
