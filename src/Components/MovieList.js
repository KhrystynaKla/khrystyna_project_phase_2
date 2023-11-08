import React from 'react';
import Movie from './Movie';

function MovieList({movies, genresList, setSelectedGenre}) {
   

    const genreButtons = genresList.map((genre,index)=>{
        return <button onClick={(event)=>setSelectedGenre(event.target.name)}  name={genre} key={index} className='genre'>{genre}</button>
    })
    const MovieCard = movies.map(movie => {
        return <Movie key={movie.id} movie={movie} />
    })

    return(
        <>
        <div id="genre_buttons">
            {genreButtons}
        </div>
        <div className="movie-container">
            {MovieCard}
        </div>
        </>
    );
}

export default MovieList;