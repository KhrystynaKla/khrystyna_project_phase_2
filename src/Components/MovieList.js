import React from 'react';
import Movie from './Movie';

function MovieList({movies}) {
    const MovieCard = movies.map(movie => {
        return <Movie key={movie.id} movie={movie} />
    })

    return(
        <div className="movie-container">
            {MovieCard}
        </div>
    );
}

export default MovieList;