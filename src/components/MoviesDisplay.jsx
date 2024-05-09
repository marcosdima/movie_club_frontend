import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MovieDisplay = ({ title, imageUrl, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movies/${id}`)
    } 

    const style = {
        flex: "1 0 5%",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <div style={style} onClick={handleClick}>
            <h1>{title}</h1>
            <img src={imageUrl} alt={`(Image of ${title})`}/>
        </div>
    );
};

const MoviesDisplay = () => {
    const movies = useSelector(state => state.movies);

    const style = {
        display: 'flex',
        flexWrap: 'wrap',
    }

    return (
        <div style={style}>
        {
            movies.map(({ title, imageUrl, id }) =>
                <MovieDisplay key={id} title={title} imageUrl={imageUrl} id={id} />
            )
        }
        </div>
    );
};

export default MoviesDisplay;