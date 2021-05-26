import Spinner from 'react-bootstrap/Spinner';
import "../loading/Loading.css";

// creating a loading screen to display when nothing else is avalable.
function Loading() {
    return(
        <div>
            <h2 className="loading" >Loading...</h2>
            <Spinner className="spinner" animation="border" variant="success" />
        </div>
    );
}

export default Loading;