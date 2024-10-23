import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { BarLoader } from 'react-spinners'

const Onboarding = () => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  console.log(user)
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="white" />
  }
const handleRoleSelection = async (role) => {
  await user.update({
    unsafeMetadata:{role}
  }).then(() => {
    role === "candidate" ? navigate("/job-listings") : navigate("/post-job")
  })
}

  return (
    <div className='onboarding flex flex-col items-center justify-center mt-32'>
      <h2 className="gradient-title text-7xl sm:text-8xl font-extrabold tracking-tighter">I am a...</h2>
      <div className=" mt-16 grid grid-cols-2 md:px-40 w-full gap-4">
        <Button variant="blue" className="h-32 text-3xl font-semibold tracking-tighter" onClick={()=>handleRoleSelection("candidate")}>Candidate</Button>
        <Button variant="destructive" className="h-32 text-3xl font-semibold tracking-tighter" onClick={()=>handleRoleSelection("recruiter")}> Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding