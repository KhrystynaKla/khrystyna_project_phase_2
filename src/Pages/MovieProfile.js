import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function MovieProfile({currentUser}) {
  console.log(currentUser)
  const [movie, setMovie]=useState({})
  const params = useParams();
  const movieId=params.id;
  const commentFormRef = useRef(null);

  const [commentFormData, setCommentFormData]=useState({
    username: '',
    comment:''
  })


  useEffect(() =>{
    fetch(`http://localhost:4000/movies/${movieId}`)
    .then(r => r.json())
    .then(data => setMovie(data))
    .catch(error => console.error(error))
  }, [movieId]);
  if(!movie.name){
    return <h1>Loading...</h1>;
  };

  function increaseLikes(movie){
    fetch(`http://localhost:4000/movies/${movie.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes_number: movie.likes_number + 1})
    })
    .then(response => response.json())
    .then(updatedMovie => {
      setMovie({...movie, likes_number: movie.likes_number+1}
    )
  })
  }

  // function addComment(event){
  //   event.preventDefault()
  //   fetch(`http://localhost:4000/movies/${movie.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({comments: [...movie.comments, commentFormData]})
  //   })
  // }

  // function updateCommentData(event){
  //   SetCommentFormData({username:currentUser.username,
  //   comment: event.target.value
  //   })
  // }
  function addComment(event) {
    event.preventDefault()
    if (currentUser){
      const updatedMovie = {
        ...movie,
        comments: [...movie.comments, commentFormData],
      };
  
      fetch(`http://localhost:4000/movies/${movie.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });
    }
    commentFormRef.current.reset();
    
  }

  function updateCommentData(event) {
    if(currentUser){
      setCommentFormData({
        username: currentUser.username,
        comment: event.target.value,
      });
    }
    
  }






  return (
      <main className="movie-details">
        <div className="image-container">
          <img src={movie.image} alt={movie.name} />
        </div>
        <div className="content">
          <h1>{movie.name}</h1>
          <p><b>Year released:</b> {movie.year}</p>
          <b>Genres:</b> {movie.genre.map(genre => <span className='genre_box' key={genre}> {genre} ,</span>)}
          <p><b>Description:</b> {movie.detailed_description}</p>
          <b><a href={movie.platform_link}>{movie.platform}</a></b>
          <p><b>Number Of Likes:</b> {movie.likes_number}</p>
        

          {currentUser ? (
            <div>
              <button className="like-button" onClick={() => increaseLikes(movie)}>Like</button>
              <div className="comment-form">
                <h2>Add a Comment</h2>
                <form ref={commentFormRef} onSubmit={addComment}>
                  <input onChange={updateCommentData}placeholder="Your comment" rows="4" cols="50"></input>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          ) : (
            <div id='reminder_to_sign_in'>
              <p>You must be logged in to add a comment or like a movie.</p>
              <p>Please <b><Link to='/signin'>Sign In</Link></b> to access these features.</p>
            </div>
          )}
        </div>
        <div>
          {}
        </div>
      </main>
  );
};

export default MovieProfile;

