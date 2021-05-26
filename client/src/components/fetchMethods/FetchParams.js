// fetch that takes methods on the search route
async function FetchParams(options) {
    try{
        const response = await fetch('/search/', options);
        const data = await response.json();
        return data
    }catch(err) {
        return err
    }
}

export { FetchParams };