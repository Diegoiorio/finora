import React, { useState } from "react";
import { getBooksNumber } from "../services/booksProviderService";
import { saveSearch } from "../services/supabaseWatchlistService";

export default function BooksList({userId}) {

    const [bookTitle, setBookTitle] = useState("");
    const [booksNumber, setBooksNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleAddBookList(e) {
        e.preventDefault();
        setLoading(true);

        setError("");
        setBooksNumber("");

        try {
            const booksNumber = await getBooksNumber(bookTitle.toUpperCase());

            if(!booksNumber) {
                setError("No books data loaded!");
                return null;
            }

            setBooksNumber(booksNumber);
            setLoading(false)

            saveSearch(userId, bookTitle, booksNumber);

        } catch {
            setError("Error occurred");
        }
    }

    return (<div>
        <form className="stock-form" onSubmit={handleAddBookList}>
            <input 
                value={bookTitle} 
                onChange={e => setBookTitle(e.target.value)} 
                placeholder="Book title keyword here..." 
            />

            <button type="submit">
                Check
            </button>

            {(loading && !error && !booksNumber) && (
                <p style={{color: "white"}}>
                    Loading ...
                </p>
            )}

            {error && <p style={{color: "red"}}>{error}</p>}

            {booksNumber && (
                <p style={{color: booksNumber > 100 ? "green" : "orange"}}>
                    Found {booksNumber} books
                </p>
            )}
        </form>
    </div>)
}