import { RouteObject } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import ActivityDashboard from "../../Feature/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../Feature/activities/details/ActivityDetails";
import ActivityForm from "../../Feature/activities/form/ActivityForm";
import HomePage from "../../Feature/home/HomePage";
import App from "../layout/App"

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {path: 'activities', element: <ActivityDashboard />},
      {path: 'activities/:id', element: <ActivityDetails />},
      // the key is to force a re-render when we go from edit to create
      {path: 'createActivity', element: <ActivityForm key='create'/>},
      {path: 'manage/:id', element: <ActivityForm key='manage'/>}
    ]
  }
]

export const router = createBrowserRouter(routes);