import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MovieDisplay = ({ title, imageUrl, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movies/${id}`)
    } 
    return (
        <div className='movie-display' onClick={handleClick}>
            <img src={imageUrl} alt={`(Image of ${title})`}/>
            <p>{title}</p>
        </div>
    );
};

const MoviesDisplay = () => {
    const movies = useSelector(state => state.movies);


    return (
        <div className='movies'>
        {
            movies.map(({ title, imageUrl, id }) =>
                <MovieDisplay key={id} title={title} imageUrl={imageUrl} id={id} />
            )
        }
        </div>
    );
};

export default MoviesDisplay;