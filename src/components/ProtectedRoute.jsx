import { useUser } from "@clerk/clerk-react"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ Children }) => {
    const { isLoaded, isSignedIn, user } = useUser()
    const { pathname } = useLocation()
    if (isLoaded && !isSignedIn && !isSignedIn !== undefined) {
        return <Navigate to={"/?signIn=true"} />;
    }
    if (user !== undefined && !user?.unsafeMetadata?.role && pathname !== "/onboarding" ) { 
        return <Navigate to={"/onboarding"} />;
    }
    return Children;
}

export default ProtectedRoute