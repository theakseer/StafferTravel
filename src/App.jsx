import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./AppLayout"
import LandingPage from "./pages/LandingPage"
import Onboarding from "./pages/Onboarding"
import JobListing from "./pages/JobListing"
import Job from "./pages/job"
import PostJobs from "./pages/postJobs"
import SavedJobs from "./pages/savedJobs"
import ThemeProvider from "./components/themeProvider"
import './App.css'
import MyJobs from "./pages/myJobs"
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/job-listings",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <Job />,
      },
      {
        path: "/post-job",
        uuelement: 
        <ProtectedRoute>
          <PostJobs />
        </ProtectedRoute>
        ,
      },
      {
        path: "/saved-jobs",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ]
  }
])

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App