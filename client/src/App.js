import FromInput from "./components/formInput/FromInput";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { FetchOnURL } from "./components/fetchMethods/FetchOnURL";
import Loading from "./components/loading/Loading";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


// TODO: fix refresh issue

function App() {
  const [itunesData, setItunesData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if  (!loaded){
      FetchOnURL("/search/results").then(res => {
          if (Object.keys(res).length !== 0) {
            setItunesData(res);
            setLoaded(true);
          } else {
            setLoaded(false);
          }
      });
    }
  },[itunesData]);
  
  if (!loaded){
    return(
      <Loading />
    );
  }else {
    return(
      <>
        <Modal show={show} onHide={handleClose}>
          <Button variant="primary" onClick={handleClose}>
            close
          </Button>
          {/* TODO: map over all the objects that have been added to the array and been removed. */}
        </Modal>
        {/* TODO: style input field */}
        <FromInput />
        <Button variant="primary" onClick={handleShow}>
          View Favourites
        </Button>
          {
            itunesData.map((item, key) => {
             return(
              <Card key={key}>
                <Card.Body>
                        <img
                          src={item.artworkUrl100}
                          height="100px"
                          width="100px"
                        />
                        <Card.Title>{item.artistName}</Card.Title>
                        <Card.Text className="align-left">{item.collectionName}</Card.Text>
                        {/* TODO: create add to fav function */}
                        <Button variant="primary" >Add To Favourites</Button>
                </Card.Body>
              </Card>
             );
            })
          }
      </>
    );
  };
}

export default App;
