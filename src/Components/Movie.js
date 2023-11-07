import { Link } from "react-router-dom";
function Movie({movie, increaseLikes}){
    return (<div className="show-card">
            <img src={movie.image} alt={movie.name} className="show-art"/>
            <div className="details-container">
                <h3>{movie.name}</h3>                    
                <p>{movie.description}</p>
                <Link to={`/movies/${movie.id}`}>View Info</Link>
            </div>
        </div>
    );
}
export default Movie;
