import { useUser } from "@clerk/clerk-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { saveJob } from "@/api/job-list"
import { useEffect, useState } from "react"
import useFetch from "@/hooks/useFetch"

export const JobCard = ({
    job,
    isMyJob = false,
    savedInitiated = true,
    onJobSaved = () => { },
}) => {
    const [saved, setSaved] = useState(savedInitiated)
    const { user } = useUser()
    const {
        fn: fnSaveJob,
        data: savedJob,
        loadingSavedJob
    } = useFetch(savedJob)

    const handleSaveJob = async () => {
        await fnSaveJob({
            user_id:user.id,
            job_id:job.id,
        })
        onJobSaved()
    }
    useEffect(() => {
        if (savedJob!==undefined) setSaved(savedJob?.length > 0)
    },[saveJob])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between">
                    {job.title}
                    {!isMyJob && <Trash2Icon fill="red" size={20} className="cursor-pointer" stroke={"black"} />}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-3">
                    <MapPinIcon /> {job.location}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`}>
                    <Button variant="secondary" className="w-full">
                        More Details
                    </Button>
                </Link>
                {
                    !isMyJob && (
                        <Button
                        variant="outline"
                        className="w-15"
                        onClick={handleSaveJob}
                        disabled={loadingSavedJob}
                        >
                            {
                                saved ? 
                                <Heart stroke="red" fill="red" className="cursor-pointer" />
                                : <Heart stroke="red" className="cursor-pointer" />
                            }
                        </Button>
                    )
                }
            </CardFooter>
        </Card>
    )
}
