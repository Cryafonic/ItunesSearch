function FromInput() {

    function hanleChange() {

    }

    function handleSubmit(){

    }

    return(
        <form>
            <input type="input" name="term"></input>
            <lable>select media type</lable>
            <select>
                <option>music</option>
                <option>movie</option>
            </select>
            <input type="submit" name="submit">search</input>
        </form>
    );
}

export default FromInput;