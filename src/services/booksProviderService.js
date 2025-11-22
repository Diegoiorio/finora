const API_KEY = import.meta.env.VITE_BOOKS_API_KEY;

// es: q=mage%20the%20ascension&fields=*,availability&limit=1000
const BASE_URL = "https://openlibrary.org/search.json?"


async function fetchJSON(queryParams) {
    const url = `${BASE_URL}${new URLSearchParams({ 
        ...queryParams, 
        key: API_KEY,
    })}`;

    const response = await fetch(url);

    if(!response.ok) {
        throw new Error("Book request failed!");
    }

    return response.json();
}

// es: getBooks("Mage the ascension");
export async function getBooks(searchTerm) {
    const params = {
        q: searchTerm,
        fields: "*",
        limit: 1000
    }

    const json = await fetchJSON(params);

    return json;
}

export async function getBooksNumber(searchTerm, free, formatDownload) {
    const bookList = await getBooks(searchTerm, free, formatDownload);
    return bookList.docs.length;
}