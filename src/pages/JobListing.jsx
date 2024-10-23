import getJobs from "@/api/job-list"
import { JobCard } from "@/components/JobCard"
import useFetch from "@/hooks/useFetch"
import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"

const JobListing = () => {
  const [location, setLocation] = useState("")
  const [title, setTitle] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const { fn, data: jobs, loading } =
    useFetch(getJobs, {
      location, title, searchQuery
    })

    
  const { isLoaded, } = useUser()

  useEffect(() => {
    if (isLoaded) {
      fn()
      // console.log(jobs.data[0])
    }
  }, [isLoaded, location, title, searchQuery])
  // if (!isLoaded) {
  //   return <BarLoader className="mb-4" width={"100%"} color="white" />
  // }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl text-center sm:text-7xl pb-8"> Latest Jobs</h1>
      {/* add fiters */}
      {loading && (
        <BarLoader className="mt-4" width={"100%"} color="white" />
      )}
      {
        loading === false && (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            {jobs?.data?.length ? (
              jobs.data.map((job) => {
                return <JobCard key={job.id} job={job}/>;
              })
            ) : (
              <div>No jobs found</div>
            )}
          </div>
        )
      }
    </div>
  )
}

export default JobListing