import './App.css';
import Header from './Components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import MovieList from './Components/MovieList';
import Home from './Pages/Home';
import NewMovieForm from './Components/NewMovieForm';
import MovieProfile from './Pages/MovieProfile';
import Introduction from './Components/Introduction';
import Signin from './Pages/Signin';
import Signout from './Pages/Signout';

function App() {
  const [movies, setMovies] = useState([])

  //getting all movies
  useEffect(() => {
    fetch("http://localhost:4000/movies")
    .then(response => response.json())
    .then(moviesData => setMovies(moviesData))
  }, [])

  
  // Users and login section
  const [userInfo, setUserInfo]=useState({
    username:'',
    password: ''
  })
  
  const [currentUser, setCurrentUser]=useState(null)
  const [users, setUsers]= useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/users")
    .then(response => response.json())
    .then(usersData => setUsers(usersData))
  }, [])

  function handleChange(event) {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  }

  function handleLogin(event){
    event.preventDefault()
    if(users.find((user)=> user.username===userInfo.username && user.password===userInfo.password)){
      window.alert(`Hello, ${userInfo.username}! You already have an account on our website. Welcome back and enjoy watching movies! Don't forget to get some 🍿🍿🍿🍿🍿`);
    } else {
      window.alert(`Welcome to our website, ${userInfo.username}! We're thrilled to have you as a new member of our community. With your account, you can enjoy a wide range of exciting features 😂🥹😍🥰🤓😎🥸🥺🤬😱 `)
      fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(newUser => {
      setUsers([...users, newUser])
    })
    }
    setCurrentUser(userInfo)
  }

  //add new movie section
  const [formData, setFormData] = useState({
    name:'',
    year:'',
    genre:[],
    description: '',
    detailed_description:'',
    image:'',
    platform: 'Find in GOOGLE',
    platform_link:'https://www.google.com/search?q=ukrainian+movies&sca_esv=579920261&sxsrf=AM9HkKm3CzQ_-3ipp-tzPSG5g2x23fowkw%3A1699305883579&ei=m1lJZcP4Irag5NoP-PKCyAM&oq=UKRAINIAN+&gs_lp=Egxnd3Mtd2l6LXNlcnAiClVLUkFJTklBTiAqAggAMgcQIxiKBRgnMgQQIxgnMgcQIxiKBRgnMg4QLhiABBjHARivARiOBTIOEC4YgAQYxwEYrwEYjgUyDhAuGIAEGMcBGK8BGI4FMgoQABiABBgUGIcCMg0QABiABBgUGIcCGLEDMgsQABiABBixAxiDATIFEC4YgARIpEdQ8wdY-zdwAngBkAEAmAFeoAGbDqoBAjI5uAEByAEA-AEBqAIRwgIKEAAYRxjWBBiwA8ICChAAGIoFGLADGEPCAg4QABjkAhjWBBiwA9gBAcICFhAuGIoFGMcBGNEDGMgDGLADGEPYAQLCAgUQABiABMICBxAAGIoFGEPCAhAQABiABBgUGIcCGLEDGIMBwgIIEAAYgAQYsQPCAg0QABiKBRixAxiDARhDwgIWEC4YgAQYFBiHAhixAxiDARjHARjRA8ICDRAuGIoFGMcBGNEDGCfCAhMQLhiKBRixAxiDARjHARjRAxhDwgIHECMY6gIYJ8ICDRAuGMcBGNEDGOoCGCfCAhAQABiKBRjqAhi0AhhD2AEDwgIZEC4YigUYxwEY0QMYyAMY6gIYtAIYQ9gBAsICERAuGIAEGLEDGIMBGMcBGNEDwgIOEC4YigUYsQMYgwEYkQLCAggQABiKBRiRAsICDRAuGIoFGLEDGIMBGEPCAg4QLhiDARixAxiKBRiRAsICEBAuGIAEGBQYhwIYsQMY1ALiAwQYACBBiAYBkAYRugYGCAEQARgJugYGCAIQARgIugYGCAMQARgB&sclient=gws-wiz-serp',
    likes_number: 0,
    comments:[]
  })
  

  // add new movie:

  function addMovie(event){
    event.preventDefault()

    fetch("http://localhost:4000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newMovie => setMovies([...movies, newMovie]))
  }

  function updateFormData(event){
    let arrayOfGenres=formData.genre
    console.log(event.target.type)
    if(event.target.type==='checkbox'){
      if (!arrayOfGenres.includes(event.target.value)){
        setFormData({...formData, genre: [...arrayOfGenres, event.target.value]})
      } else {
        const index = arrayOfGenres.indexOf(event.target.value);
        const x = arrayOfGenres.splice(index, 1);
        setFormData({...formData, genre:arrayOfGenres})
      }
    } else{
      setFormData({...formData, [event.target.name]: event.target.value})
    }
  }


  //Filter by genres

  const [selectedGenre, setSelectedGenre]=useState('All')
  const genresList=["All","Action", "Drama", "Comedy", "Horror", "War", "Documentary", "Crime", "History", "Adventure", "Family", "Thriller", "Fantasy", "Sport"]
  const filteredMovieList = movies.filter(movie => {
    if (selectedGenre === "All") {
      return true;
    } else if (movie.genre.indexOf(selectedGenre) !== -1) {
      return true; 
    } else {
      return false; 
    }
  });


  // client-side routing part

  const routes = [
    {
      path: "/",
      element: <Home currentUser={currentUser}/>,
      errorElement: <h1>Wrong Page!</h1>,
      children: [
        {
          path: "/",
          element: <Introduction/>
        },
        {
          path: "/movies",
          element: <MovieList movies={filteredMovieList} genresList={genresList} setSelectedGenre={setSelectedGenre}/>
        },
        {
          path: "/add_movie",
          element: <NewMovieForm  addMovie={addMovie} updateFormData={updateFormData}/>
        },
        {
          path: "/movies/:id",
          element: <MovieProfile movies={movies} currentUser={currentUser}/>
        },
        {
          path: '/signin',
          element: <Signin handleChange={handleChange} handleLogin={handleLogin}/>
        },
        {
          path:'/signout',
          element: <Signout setCurrentUser={setCurrentUser}/>
        }
      ]
    }
  ]

  const router = createBrowserRouter(routes)
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
