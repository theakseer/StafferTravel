import supabaseClient from "../../utils/supabase";

export default async function getJobs(token, { location, title, searchQuery }) {
    const supabase = await supabaseClient(token);
    let query = supabase.from("jobs").select("*");
    if (location) {
        query = query.ilike("location", `%${location}%`);
    }

    if (title) {
        query = query.ilike("title", `%${title}%`);
    }

    if (searchQuery) {
        query = query.ilike("description", `%${searchQuery}%`);
    }


    const { data, error } = await query;
    if (error) {
        console.error("Error fetching jobs: ", error.message);
        return { error: error.message, data: null };
    }

    return { data, error: null };
}

export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);
    if (alreadySaved) {
        let {data, error: deleteError} = 
                           await supabase.from("saved_jobs")
                                    .delete().eq("job_id", saveData.job_id);
        if (deleteError){
            console.error("Error deleting saved jobs", deleteError)
            return null
        }
        return data;
    }
    else {
        const {data, error: insertError} = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .eq("job_id", saveData.job_id)
        .select()
        if (insertError){
            console.error("Error deleting saved jobs", deleteError)
            return null
        }
        return data;
    }
}