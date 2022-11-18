import logo from './logoCrenvyMenu.gif';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,InputGroup,FormControl,Button,Row,Card} from 'react-bootstrap';
import {useState,useEffect} from 'react';

/*cangri*/
import * as font_regular from "@fortawesome/free-regular-svg-icons";
import * as font_solid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
const CLIENT_ID="b01669ce06464e06ad1afe9c395c7c15";
const CLIENT_SECRET="c7e50afc03dc417ca2181cf3d81664ff";
function App() {
  const[searchInput, setSearchInput] = useState("");
  const[accessToken, setAccessToken] = useState("");
  const[loading, setLoading] = useState("");
  
  /*cangri*/
  const [isActiveLike, setIsActiveLike] = useState(false);
  const [isActiveDisLike, setIsActiveDisLike] = useState(false);

  //Funcion encargada de dar like
  function like(e) {
      e.preventDefault()
      let prefix = e.currentTarget.children[0].getAttribute("data-prefix");
      setIsActiveLike(prefix != "fas");
      setIsActiveDisLike(false);
  }

  //encargada de dar dislike
  function dislike(e) {
      e.preventDefault()
      let prefix = e.currentTarget.children[0].getAttribute("data-prefix");
      setIsActiveLike(false);
      setIsActiveDisLike(prefix != "fas");
  }

  useEffect(()=>{
    setLoading(true);

    //se usa para inicializar solo una vez la api
    var authParameters={
      method:'POST',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token',authParameters)
      .then(result=>result.json())
      .then(data=>setAccessToken(data.access_token))
    console.log("cualquier cosa");

        setTimeout(() => {
      setLoading(false);
    }, 3000);
  },[])
//search
  async function search(){
    console.log("search for "+searchInput); 
    
    var artistParameters={
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken
      }
    }
    var artistID =await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=track%2Cartist',artistParameters)
    .then(response=> response.json())
    .then(data=>{return data.artists.items[0].id && data.tracks})
    
    console.log(artistID.items)
    /*var tracks = await fetch('https://api.spotify.com/v1/artist/'+ artistID.href +'/trucks'+artistID.items)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
    })
    */
  }
  

  

  return (
    <div>
    {loading ?
      (<div 
        className="Loading">
        <header className="Loading-header">
          <img src={logo} className="Loading-logo" alt="Loading" />
        </header>
      </div>):
      (
        <div className="App">
        <Container>
          <InputGroup className ="mb-3" size ="lg">
          <FormControl
            placeholder= "Search by artist or song"
            type="input"
            onKeyPress={event => {
              if(event.key ==="Enter"){
                search();
              }
            }}
            onChange={event=>setSearchInput(event.target.value)}
            />
            <Button onClick={search}>
              Crenviar
            </Button>
    
          </InputGroup>
        </Container>
        <Container>
          <Row className="mx-2 row row-cols-4">
            POSTS:     
          </Row>
        </Container>
        <div>
        
        <><><div className='container mt-5'>
            <div className="card" style={{ width: 600 }}>
                <img src="https://imgs.hipertextual.com/wp-content/uploads/2022/08/d411fd39-0622-443e-8082-8783ccf386c8.jpg"
                    className="img-fluid" alt="rickroll" />
                <div className="card-body">

                    <h5 className="card-title">RickRoll</h5>
                    <p className="card-text">Presiona el boton, para darle me gusta o no me gusta</p>
                    <a href="/api/like" className="btn btn-default" onClick={like}>
                        <FontAwesomeIcon icon={isActiveLike ? font_solid.faThumbsUp : font_regular.faThumbsUp} />
                    </a>

                    <a href="/api/like" className="btn btn-default" onClick={dislike}>
                        <FontAwesomeIcon icon={isActiveDisLike ? font_solid.faThumbsDown : font_regular.faThumbsDown} />
                    </a>
                </div>
            </div>
        </div><div className='container mt-5'>
                <div className="card" style={{ width: 400 }}>
                    <img src="https://i.scdn.co/image/ab67616d0000b27309e6f1d4f647f9209f47b70f"
                        className="img-fluid" alt="duki" />
                    <div className="card-body">

                        <h5 className="card-title">El Duko Paa</h5>
                        <p className="card-text">Presiona el boton, para darle me gusta o no me gusta</p>
                        <a href="/api/like" className="btn btn-default" onClick={like}>
                            <FontAwesomeIcon icon={isActiveLike ? font_solid.faThumbsUp : font_regular.faThumbsUp} />
                        </a>

                        <a href="/api/like" className="btn btn-default" onClick={dislike}>
                            <FontAwesomeIcon icon={isActiveDisLike ? font_solid.faThumbsDown : font_regular.faThumbsDown} />
                        </a>
                    </div>
                </div>
            </div></><div className='container mt-5'>
                <div className="card" style={{ width: 500 }}>
                    <img src="https://barrasyversos.files.wordpress.com/2018/01/nena-maldicic3b3n1.jpg?w=1280"
                        className="img-fluid" alt="nena maldicion" />
                    <div className="card-body">

                        <h5 className="card-title">Nena Maldicion</h5>
                        <p className="card-text">Presiona el boton, para darle me gusta o no me gusta</p>
                        <a href="/api/like" className="btn btn-default" onClick={like}>
                            <FontAwesomeIcon icon={isActiveLike ? font_solid.faThumbsUp : font_regular.faThumbsUp} />
                        </a>

                        <a href="/api/like" className="btn btn-default" onClick={dislike}>
                            <FontAwesomeIcon icon={isActiveDisLike ? font_solid.faThumbsDown : font_regular.faThumbsDown} />
                        </a>
                    </div>
                </div>
            </div><div className='container mt-5'>
                <div className="card" style={{ width: 500 }}>
                    <img src="https://images.genius.com/a1116fbe1cc83b84abe2adde9c40a7f0.1000x1000x1.png"
                        className="img-fluid" alt="Huella letal" />
                    <div className="card-body">

                        <h5 className="card-title">Huella letal</h5>
                        <p className="card-text">Presiona el boton, para darle me gusta o no me gusta</p>
                        <a href="/api/like" className="btn btn-default" onClick={like}>
                            <FontAwesomeIcon icon={isActiveLike ? font_solid.faThumbsUp : font_regular.faThumbsUp} />
                        </a>

                        <a href="/api/like" className="btn btn-default" onClick={dislike}>
                            <FontAwesomeIcon icon={isActiveDisLike ? font_solid.faThumbsDown : font_regular.faThumbsDown} />
                        </a>
                    </div>
                </div>
            </div></>
        
        </div>
        </div>
       
        
      )
    }
    </div>
  );
  
}

export default App;
