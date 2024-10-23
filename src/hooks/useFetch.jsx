import { useSession } from "@clerk/clerk-react"
import { useState } from "react"

const useFetch = (cb, options = {})=>{
    const [data, setData] = useState(undefined)
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(null)
    const {session} = useSession()
    const fn = async (...args) =>{
        setloading(true)
        seterror(null)
        try {
            setloading(true)
            const supabasebasetoken = await session.getToken({
                template: "supabase"
            })
            const response = await cb(supabasebasetoken, options, ...args);
            setData(response)
            setloading(false)
        } catch (error) {
            seterror(error)
        } finally {
            setloading(false)
        }
    }
    return {fn, data, loading, error}
}
export default useFetch;