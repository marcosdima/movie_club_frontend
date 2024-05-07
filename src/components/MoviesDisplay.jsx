import { useState } from 'react';
import moviesService from '../services/movies';
import { useEffect } from 'react';

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
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => setMovies(await moviesService.getAll());
        getMovies()
    }, []);

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