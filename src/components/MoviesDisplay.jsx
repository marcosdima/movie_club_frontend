import { useState } from 'react';
import moviesService from '../services/movies';
import { useEffect } from 'react';

const MoviesDisplay = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => setMovies(await moviesService.getAll());
        getMovies()
    }, [])

    return (
        <div>
        {
            movies.map(element =>
                <p key={element.id}>{element?.title ?? 'error'}</p>
            )
        }
        </div>
    );
};

export default MoviesDisplay;