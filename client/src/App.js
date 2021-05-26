import { useEffect, useReducer, useState } from "react";
import { FetchOnURL } from "./components/fetchMethods/FetchOnURL";
import { FetchParams } from "./components/fetchMethods/FetchParams";
import FromInputClass from "./components/formInput/FormInputClass";
import Loading from "./components/loading/Loading";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


// TODO: fix refresh issue
/* TODO: styling */

function App() {
  const [itunesData, setItunesData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [favToggle, setFavToggle] = useState(false);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    let mounted = true
    if (mounted) {
        fetchApi();
    }

    return function cleanup() {
      mounted = false
    }
  },[]);

  function handlePost(sendPostOptions) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendPostOptions)
        };
        FetchParams(options);
  }

  function fetchApi() {
    FetchOnURL("/search/results").then(res => {
      if (Object.keys(res).length !== 0) {
        setItunesData([...res]);
        setLoaded(true);
      }else {
        setLoaded(false);
      }
    });
  }

  function handleFav() {
    favToggle === true ? setFavToggle(false) : setFavToggle(true);
  }

  function addToFav(id) {
    let set = new Set(favList);
    itunesData.forEach((item) => {
      if (item.artistId === id) {
        let filter = set.add(item)
        setFavList(Array.from(filter));
      }
    })
  }

  function removeFromFav(id) {
    favList.forEach((item, index) => {
      if (item.artistId === id ) {
        favList.splice(index , 1);
      }
    })
  }
  
  if (!loaded){
    return(
      <>
        <FromInputClass ituneSearch={handlePost} />
        <Loading />
      </>
    );
  }else if (favToggle) {
    return(
        <>  
          <h1>Favourites list</h1>
          <Button variant="primary" className="favPageButton" onClick={handleFav}>
            Close Favourites
          </Button>
          {favList.map((item) => {
            return(
              <Card key={item.artistId} >
                <Card.Body>
                        <img
                          src={item.artworkUrl100}
                          height="100px"
                          width="100px"
                          alt={item.artistName}
                        />
                        <Card.Title>{item.artistName}</Card.Title>
                        <Card.Text className="align-left">{item.collectionName}</Card.Text>
                        <Button variant="danger" onClick={() => removeFromFav(item.artistId)} >Remove</Button>
                </Card.Body>
              </Card>
            );
          })}
        </>
    );
  }else {
    return(
      <>
        <FromInputClass ituneSearch={handlePost} />
        <Button variant="primary" className="favButton" onClick={handleFav}>
          View Favourites
        </Button>
          {itunesData.map((item) => {
             return(
              <Card key={item.artistId} >
                <Card.Body>
                        <img
                          src={item.artworkUrl100}
                          height="100px"
                          width="100px"
                          alt={item.artistName}
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
