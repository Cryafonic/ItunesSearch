import FromInput from "./components/formInput/FromInput";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { FetchOnURL } from "./components/fetchMethods/FetchOnURL";
import Loading from "./components/loading/Loading";

// TODO: fix refresh issue.

function App() {
  const [itunesData, setItunesData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      if  (!loaded){
        FetchOnURL("/search/results").then(res => {
            setItunesData(res.results);
            setLoaded(true)
        });
    }
  },[]);
  
  if (!loaded){
    return(
      <Loading />
    );
  }else {
    return(
      <>
        <FromInput />
        <p>{itunesData[0].artistName}</p>
      </>
    );
  };
}

export default App;
