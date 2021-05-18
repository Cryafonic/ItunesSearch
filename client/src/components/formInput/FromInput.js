import react, { useState } from "react";
import { FetchParams } from "../fetchMethods/FetchParams";
import Button from 'react-bootstrap/Button'

function FromInput() {
    const [options, setOptions] = useState({
        input: "",
        select: "music"
    });

    function sendSubmit(e) {
        // e.preventDefault()
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
            <input type="input" name="input" onChange={handleChange} value={options.input} required></input>
            <select onChange={handleChange} name="select">
                <option value="music" >music</option>
                <option value="movie" >movie</option>
                <option value="podcast" >podcast</option>
                <option value="musicVideo" >Music Video</option>
                <option value="audiobook" >audio book</option>
                <option value="shortFilm" >short Film</option>
                <option value="tv Show" >tv Show</option>
                <option value="software" >software</option>
                <option value="ebook" >ebook</option>
            </select>
            <Button className="button" type="submit" variant="success" >Search</Button>
        </form>
    );
}

export default FromInput;