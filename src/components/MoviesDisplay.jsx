import { useSelector } from 'react-redux';

const Movie = ({ title, imageUrl, description, director, genres }) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={imageUrl} alt={`(Image of ${title})`}/>
            <p>Director: {director}</p>
            <div>
                Genres: {genres.join(', ')}
            </div>
            <p>Description: {description}</p>
        </div>
    );
};

const MoviesDisplay = () => {
    const movies = useSelector(state => state.movies);

    return (
        <div>
        {
            movies.map(movie =>
                <Movie key={movie.id} {...movie} />
            )
        }
        </div>
    );
};

export default MoviesDisplay;