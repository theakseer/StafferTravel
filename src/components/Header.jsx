import { Link, useLocation, useSearchParams } from "react-router-dom"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { BriefcaseBusiness, BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react"
import { useEffect, useState } from "react"

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false)
  const [search, setSearch] = useSearchParams(false)
  const { user } = useUser()
  const { pathname } = useLocation()

  useEffect(() => {
    if (search.get("signIn")) {
      setShowSignIn(true)
    }
  }, [search])

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false)
      setSearch({})
    }
  }
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link>
        <img src="/logo.png" className="h-20" alt="" />
      </Link>
      <div className=" flex gap-4">
        <SignedOut>
          {/* <SignInButton /> */}
          <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>
        </SignedOut>
        {/* when signed in */}
        <SignedIn>
          {/* show button only if the user is recruiter */}
          {user?.unsafeMetadata?.role == "recruiter" && (
            <Link to="/post-job">
              <Button className='rounded-full flex gap-2' variant="destructive">
                <PenBox size={20} />
                Post a Job
              </Button>
            </Link>
          )}
          <UserButton appearance={{
            elements: {
              avatarBox: "h-10 w-10"
            }
          }}>
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Jobs"
                labelIcon={<BriefcaseBusiness size={15} />}
                href="/my-jobs"
              />
              <UserButton.Link
                label="Saved Jobs"
                labelIcon={<Heart size={15} />}
                href="/saved-jobs"
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
      {
        showSignIn &&
        (
          <div
            onClick={handleOverlayClick}
            className="inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 ">
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        )
      }
    </nav>
  )
}

export default Header