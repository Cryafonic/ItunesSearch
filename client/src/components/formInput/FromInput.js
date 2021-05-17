import react, { useState } from "react";
import { FetchParams } from "../fetchParams/FetchParams";
import Button from 'react-bootstrap/Button'

function FromInput() {
    const [options, setOptions] = useState({
        input: "",
        select: "music"
    });

    function sendSubmit(e) {
        e.preventDefault()
        handleSubmit(options)
    }
    // handle the change input fields
    function handleChange(e) {
        const value = e.target.value;
        setOptions({
            ...options,
            [e.target.name]: value
        });
    }
    
    function handleSubmit(sendOptions) {
        const post = { sendOptions }
        console.log(post);
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        };
        FetchParams(options)
    };

    return(
        <form onSubmit={sendSubmit} >
            <input type="input" name="input" onChange={handleChange} value={options.input}></input>
            <select onChange={handleChange} name="select">
                <option value="music" >music</option>
                <option value="movie" >movie</option>
            </select>
            <Button className="button" type="submit" variant="success" >Search</Button>
        </form>
    );
}

export default FromInput;