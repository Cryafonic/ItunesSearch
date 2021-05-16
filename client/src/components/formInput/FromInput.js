import { FetchParams } from "../fetchParams/FetchParams";

function FromInput() {
    const [options, setOptions] = useState({
        input: "",
        select: ""
    });

    // handle the change input fields
    function handleChange(e) {
        const value = e.target.value;
        setOptions({
            ...options,
            [e.target.name]: value
        });
    }
    
    // post the data to the backend
    function handleSubmit() {
        const get = { options }
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(get)
        };
        FetchParams(options)
    };
    return(
        <form onSubmit={handleSubmit} >
            <input type="input" name="term" onChange={handleChange} value={options.input}></input>
            <lable>select media type</lable>
            <select onChange={handleChange} >
                <option name="select" value="music" >music</option>
                <option name="select" value="movie" >movie</option>
            </select>
            <input type="submit" name="submit">search</input>
        </form>
    );
}

export default FromInput;