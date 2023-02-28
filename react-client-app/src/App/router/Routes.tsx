import { RouteObject } from "react-router"
import { createBrowserRouter, Navigate } from "react-router-dom"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
;import 'react-calendar/dist/Calendar.css';
import App from "../layout/App"
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {path: 'activities', element: <ActivityDashboard />},
      {path: 'activities/:id', element: <ActivityDetails />},
      // the key is to force a re-render when we go from edit to create
      {path: 'createActivity', element: <ActivityForm key='create'/>},
      {path: 'manage/:id', element: <ActivityForm key='manage'/>},
      {path: 'errors', element: <TestErrors />},
      {path: 'not-found', element: <NotFound />},
      // when the user types in a path that doesn't exist, redirect to not-found
      {path: '*', element: <Navigate replace to="/not-found" />},
      {path: '/server-error', element: <ServerError />}
    ]
  }
]

export const router = createBrowserRouter(routes);