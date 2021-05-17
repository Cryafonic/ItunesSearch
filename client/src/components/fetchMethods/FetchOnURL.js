async function FetchOnURL(URL) {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }catch(err) {
        return err
    }
}

export { FetchOnURL };