import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "@/index.css";
import LayoutAuth from "@/layouts/LayoutAuth";
import LayoutMain from "@/layouts/LayoutMain";
import LayoutTalent from "@/layouts/LayoutTalent";
import LayoutCoreTime from "@/layouts/LayoutCoreTime";

// ========== Talent Pages ==========
import TalentDashboard from "@/pages/talent/Dashboard";
import MyReviews from "@/pages/talent/MyReviews";
import ReviewDetail from "@/pages/talent/ReviewDetail";
import GoalSetting from "@/pages/talent/GoalSetting";
import SelfAssessment from "@/pages/talent/SelfAssessment";
import FeedbackRequest from "@/pages/talent/FeedbackRequest";
import PeerFeedbackForm from "@/pages/talent/PeerFeedbackForm";
import CheckIns from "@/pages/talent/CheckIns";
import IDP from "@/pages/talent/IDP";

// ========== Core Pages ==========
import CoreDashboard from "@/pages/core/Dashboard";
import ReviewsList from "@/pages/core/ReviewsList";
import TeamPerformance from "@/pages/core/TeamPerformance";
import EvaluationForm from "@/pages/core/EvaluationForm";
import Calibration from "@/pages/core/Calibration";

// ========== Time Pages ==========
import TimeDashboard from "@/pages/time/Dashboard";
import Attendance from "@/pages/time/Attendance";

import { isAuthenticated } from "@/lib/auth";

// Protected Route Component
const Protected = ({ children }: { children: React.ReactNode }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />;

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAuth />,
  },
  {
    path: "/app",
    element: (
      <Protected>
        <LayoutMain />
      </Protected>
    ),
    children: [
      // ========== DEFAULT: Redirect to Talent ==========
      {
        index: true,
        element: <Navigate to="/app/talent" replace />,
      },
      
      // ========== TALENT MODULE ==========
      {
        path: "talent",
        element: <LayoutTalent />,
        children: [
          {
            index: true,
            element: <TalentDashboard />,
          },
          {
            path: "reviews",
            element: <MyReviews />,
          },
          {
            path: "reviews/:id",
            element: <ReviewDetail />,
          },
          {
            path: "goals",
            element: <GoalSetting />,
          },
          {
            path: "self-assessment",
            element: <SelfAssessment />,
          },
          {
            path: "feedback",
            element: <FeedbackRequest />,
          },
          {
            path: "feedback/:reviewId/:employeeId",
            element: <PeerFeedbackForm />,
          },
          {
            path: "check-ins",
            element: <CheckIns />,
          },
          {
            path: "idp",
            element: <IDP />,
          },
        ],
      },
      
      // ========== CORE MODULE ==========
      {
        path: "core",
        element: <LayoutCoreTime />,
        children: [
          {
            index: true,
            element: <CoreDashboard />,
          },
          {
            path: "reviews",
            element: <ReviewsList />,
          },
          {
            path: "reviews/:id",
            element: <ReviewDetail />,
          },
          {
            path: "team",
            element: <TeamPerformance />,
          },
          {
            path: "evaluation",
            element: <EvaluationForm />,
          },
          {
            path: "calibration",
            element: <Calibration />,
          },
        ],
      },
      
      // ========== TIME MODULE ==========
      {
        path: "time",
        element: <LayoutCoreTime />,
        children: [
          {
            index: true,
            element: <TimeDashboard />,
          },
          {
            path: "attendance",
            element: <Attendance />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
