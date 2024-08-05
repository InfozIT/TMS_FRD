import PublicLayout from "../componentLayer/pages/layout/PublicLayout";
import RequireAuth from "../componentLayer/pages/layout/RequireAuth";
import { createBrowserRouter, redirect, Link } from "react-router-dom";
import { authRoutes } from "./auth/auth.router";
import { httpInterceptors } from "./httpInts/httpInts.router";
import { homeRouter } from "./home/home.router";
import { reportRouter } from "./report/report.router";
import { settingRouter } from "./setting/setting.router";
import { meetingRouter } from "./meeting/meeting.router";
import { userRouter } from "./user/user.router";
import { entityRouter } from "./entity/entity.router";
import { teamRouter } from "./team/team.router";
import { taskRouter } from "./task/task.router";
import RouteBlocker from "../rbac/RouteBlocker";
import ErrorBoundary from "../componentLayer/pages/errorPages/ErrorBoundary";
import "../App.css";
import { resourceRouter } from "./resources/resource.route";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth />,
    ErrorBoundary: ErrorBoundary,
    children: [
      ...homeRouter,
      ...resourceRouter,
      {
        path: "users",
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "user" && permission.canRead
            }
          />
        ),
        children: [...userRouter],
        handle: {
          crumb: () => <Link  
          
          to={{
            pathname: "/users",
            search:`?search=&page=1&pageSize=10`,
          }}
          >Users</Link>,
        },
      },
      {
        path: "entities",
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "entity" && permission.canRead
            }
          />
        ),
        children: [...entityRouter],
        handle: {
          crumb: () => <Link 
          to={{
            pathname: "/entities",
            search:`?search=&page=1&pageSize=10`,
          }}
          >Entities</Link>,
        },
      },
      {
        path: "teams",
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "team" && permission.canRead
            }
          />
        ),
        children: [...teamRouter],
        handle: {
          crumb: () => <Link  

          to={{
            pathname: "/teams",
            search:`?search=&page=1&pageSize=10`,
          }}
          
          >Teams</Link>,
        },
      },
      {
        path: "boardmeetings",
        children: [...meetingRouter],
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "meeting" && permission.canRead
            }
          />
        ),
        handle: {
          crumb: () => <Link  

          to={{
            pathname: "/boardmeetings",
            search:`?search=&page=1&pageSize=10`,
          }}
          
          >Meetings</Link>,
        },
        
      },
      
     
      {
        path: "tasks",
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "task" && permission.canRead
            }
          />
        ),
        children: [...taskRouter],
      },
      {
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "report" && permission.canRead
            }
          />
        ),
        path: "reports",
        children: [...reportRouter],
      },
      {
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "setting" && permission.canRead
            }
          />
        ),
        path: "settings",
        children: [...settingRouter],
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [...authRoutes, ...httpInterceptors],
  },
]);

// ...dashboardRouter,
// ...userRouter,
// ...entityRouter,
// ...meetingRouter,
// ...taskRouter,
// ...teamRouter,
// ...reportRouter,
// ...settingRouter,
