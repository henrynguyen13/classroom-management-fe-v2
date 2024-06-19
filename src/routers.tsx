import { createBrowserRouter } from "react-router-dom";
import {
  AuthLayout,
  MainLayout,
  TestLayout,
  BaseLayout,
  ForumLayout,
} from "@/components";
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
  TimeTablePage,
  ForumPage,
  GroupDetailPage,
  CreateSectionPage,
  SectionDetailPage,
  SectionTestPage,
  SectionResultPage,
  SectionResultDetailPage,
} from "@/features";

import Root from "./app";
import { PAGES } from "./common";

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
        path: "/classes/:id/assignment/:assignmentId/response/:responseId",
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
      {
        path: PAGES.TIME_TABLE,
        element: <TimeTablePage />,
      },

      {
        path: "/classes/:id/reviews/:reviewId",
        element: <CreateSectionPage />,
      },

      {
        path: "/classes/:id/reviews/:reviewId/sections/:sectionId",
        element: <SectionDetailPage />,
      },

      {
        path: "/classes/:id/reviews/:reviewId/sections/:sectionId/response/:responseId",
        element: <SectionResultDetailPage />,
      },
    ],
  },

  {
    element: <TestLayout />,
    children: [
      {
        path: "/classes/:id/assignment/:assignmentId/test",
        element: <TestPage />,
      },
    ],
  },

  {
    element: <BaseLayout />,
    children: [
      {
        path: "classes/:id/assignment/:assignmentId/result/:resultId",
        element: <TestResultPage />,
      },
      {
        path: "/classes/:id/reviews/:reviewId/sections/:sectionId/test",
        element: <SectionTestPage />,
      },
      {
        path: "/classes/:id/reviews/:reviewId/sections/:sectionId/result/:resultId",
        element: <SectionResultPage />,
      },
    ],
  },

  {
    element: <ForumLayout />,
    children: [
      {
        path: PAGES.FORUM,
        element: <ForumPage />,
      },
      {
        path: `${PAGES.FORUM}/:id`,
        element: <GroupDetailPage />,
      },
    ],
  },
]);
