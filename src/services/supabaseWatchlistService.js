import { supabaseClientService } from "../services/supabaseClientService";

const watchlistTable = "watchlist";

export async function saveSearch(userId, bookTitle, booksNumber) {
    const { data, error } = await supabaseClientService.from(watchlistTable).insert({
        user_id: userId, 
        title: bookTitle, 
        books_number: booksNumber
    })
    .select(); // optional, but useful in error case

    if (error) {
        console.error("Supabase insert error:", error);
        return null;
    }

    return data;

}

export async function remoceSearch(id) {
    return await supabaseClientService.from(watchlistTable).delete().eq("id", id);
}

export async function fetchSearch(userId) {
    const {data} = await supabaseClientService.from(watchlistTable)
    .select("*")
    .eq("user_id", userId)

    return data || null;
}


