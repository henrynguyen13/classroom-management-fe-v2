import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout, TestLayout, BaseLayout } from "@/components";
import {
  Register,
  Login,
  ClassListPage,
  ClassDetailPage,
  CreateAssignmentPage,
  AssignmentDetailPage,
  ResponseDetailPage,
  DashBoard,
  ProfilePage,
  UsersPage,
  TestPage,
  TestResultPage,
  UserDetailPage,
  MyClassListPage,
  QuestionBankListPage,
  QuestionBankDetailPage,
} from "@/features";

import Root from "./app";

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
      {
        path: "/my-classes",
        element: <MyClassListPage />,
      },
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
      {
        path: "/question-bank",
        element: <QuestionBankListPage />,
      },
      {
        path: "/question-bank/:id",
        element: <QuestionBankDetailPage />,
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
