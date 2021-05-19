import FromInput from "./components/formInput/FromInput";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { FetchOnURL } from "./components/fetchMethods/FetchOnURL";
import Loading from "./components/loading/Loading";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// TODO: fix refresh issue
/* TODO: styling */

function App() {
  const [itunesData, setItunesData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [favList, setFavList] = useState([]);

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

  function addToFav(id) {
    itunesData.forEach((item) => {
      if (item.artistId === id) {
        setFavList(() => favList.concat(item));
      }
    })
  }
  
  if (!loaded){
    return(
      <Loading />
    );
  }else {
    return(
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            Favourites list
          </Modal.Header>
          <Modal.Body>
            {/* TODO: fix the diplay bug of the fav list in state. */}
            {favList.forEach((item) => {
              <p>{item.artistName}</p>
            })}
          </Modal.Body>
          <Button variant="primary" onClick={handleClose}>
            close
          </Button>
        </Modal>

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
                        <Button variant="primary" onClick={() => addToFav(item.artistId)} >Add To Favourites</Button>
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
