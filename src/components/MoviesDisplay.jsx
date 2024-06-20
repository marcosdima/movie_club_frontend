import { useSelector } from 'react-redux';
import MovieDisplay from './MovieDisplay';
import { useNavigate } from "react-router-dom";

const MoviesDisplay = () => {
    const movies = useSelector(state => state.movies);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/movies/${id}`)
    } 

    return (
        <div className='movies'>
        {
            movies.map(({ title, imageUrl, id }) =>
                <MovieDisplay key={id} title={title} imageUrl={imageUrl} onClick={() => handleClick(id)} />
            )
        }
        </div>
    );
};

export default MoviesDisplay;