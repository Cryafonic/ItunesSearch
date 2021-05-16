async function FetchParams(options) {
    const response = await fetch('/search/', options);
    const data = await response.json();
    return data
}

export { FetchParams };