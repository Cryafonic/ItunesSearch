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

function App() {
  const [itunesData, setItunesData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [favToggle, setFavToggle] = useState(false);
  const [favList, setFavList] = useState([]);

  // mounts on first load and unmounts when the useEffect is at the cleanup() function.
  useEffect(() => {
    let mounted = true
    if (mounted) {
        fetchApi();
    }

    return function cleanup() {
      mounted = false
    }
  },[]);

  // handles the method options send to the back-end.
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

  // handle the fetch to the back of the application.
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

  // handles the state to load the favourites page or to load a different page.
  function handleFav() {
    favToggle === true ? setFavToggle(false) : setFavToggle(true);
  }

  // handles the add to the favourites list.
  function addToFav(id) {
    let set = new Set(favList);
    itunesData.forEach((item) => {
      if (item.artistId === id) {
        let filter = set.add(item)
        setFavList(Array.from(filter));
      }
    })
  }

  // handles the remove of a favourites list item.
  function removeFromFav(id) {
    favList.forEach((item, index) => {
      if (item.artistId === id ) {
        favList.splice(index , 1);
      }
    })
  }
  
  // using condisional rendering to determen which component to render with the value of state.
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
