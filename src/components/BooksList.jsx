import React, { useEffect, useState } from "react";
import { getBooksNumber } from "../services/booksProviderService";
import { saveSearch, fetchSearch, removeSearch } from "../services/supabaseWatchlistService";

export default function BooksList({userId}) {

    const [bookTitle, setBookTitle] = useState("");
    const [booksNumber, setBooksNumber] = useState("");
    const [error, setError] = useState("");
    const [booksNumbers, setBooksNumbers] = useState([]);
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

            await saveSearch(userId, bookTitle, booksNumber);

            setBookTitle("");
            handleFetchSearch();

        } catch {
            setError("Error occurred");
        }
    }

    async function handleDeleteSearch(id) {
        await removeSearch(id);
        handleFetchSearch();
    }

    async function handleFetchSearch() {
        const data = await fetchSearch(userId);
        setBooksNumbers(data);
    }

    // Load initial fetch data
    useEffect(() => {
        console.log("executed!");
        if(userId) {
           handleFetchSearch()
        }
        console.log(booksNumbers);
    }, [userId]);

    
    return (<div>
        <form className="stock-form" onSubmit={handleAddBookList}>
            <input 
                value={bookTitle} 
                onChange={e => setBookTitle(e.target.value)} 
                placeholder="Book title keyword here..." 
            />

            <button type="submit">
                Search
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

        <ul className="stock-list">
            { booksNumbers &&
                booksNumbers.map(bookNumber => (
                    <li key={bookNumber.id}>
                        <span>
                            <strong>{bookNumber.title}</strong>
                            <span className="book-number" style={{color: bookNumber.books_number > 100 ? "green" : "orange"}}>{bookNumber.books_number}</span>
                        </span>

                        <button className="remove-btn" onClick={() => handleDeleteSearch(bookNumber.id)}>
                            X
                        </button>
                    </li>
                ))
            }
        </ul>

    </div>)
}