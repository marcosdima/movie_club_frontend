import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../reducers/moviesReducer";
import { findBy } from "../utils/functions";
import MovieDisplay from "./MovieDisplay";
import genericService from "../services/genericService";

const MovieGetter = ({ setMovieData }) => {
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [data, setData] = useState([]);
    
    const getMovies = async () => {
        const moviesData = await genericService.getAll(`integrations/omdb/search/${input}`);
        setMovies(moviesData);
    };

    const getMovie = async (id) => {
        const exists = findBy(data, 'imdbID', id);
        if (exists) return setMovieData(exists);
        try {
            const movieData = await genericService.getAll(`integrations/omdb/${id}`);
            setData(data.concat(movieData));
            setMovieData(movieData);
        } catch(error) {
            console.log(error);
        }
    };

    const show = {
        display: movies ? '' : 'none'
    };

    return (
        <>
            <h1>Search a movie</h1>
            <div>
                <input placeholder={'Enter a title...'} value={input} onChange={({target}) => setInput(target.value)} /><button onClick={() => getMovies()}>Get</button>
            </div>
            <div style={show} className="movies">
                {
                    movies.map(({ title, imageUrl, imdbID }) => (
                        <MovieDisplay 
                            key={imdbID} 
                            title={title} 
                            imageUrl={imageUrl} 
                            onClick={() => getMovie(imdbID)}
                            />
                    ))
                }
            </div>
        </>
    )
}

const MovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [director, setDirector]= useState('')
    const [genres, setGenre] = useState([]);

    const dispatch = useDispatch();

    const create = () => {
        const movie = { title, description, imageUrl, director, genres };
        if (movie) dispatch(addMovie({ movie }));
        reset();
    }

    const addGenre = (event) => {
        event.preventDefault();
        const { target: { genre: { value } } } = event;
        if (value && value !== '') setGenre(genres.concat(value));
    }

    const reset = () => {
        setTitle('');
        setDescription('');
        setImageUrl('');
        setDirector('');
        setGenre([])
    }

    const setMoviesData = ({ title, description, imageUrl, director, genres }) => {
        setTitle(title);
        setDescription(description);
        setImageUrl(imageUrl);
        setDirector(director);
        setGenre(genres);
    } 

    const fields = [
        {
          name: 'Title',
          variable: title,
          setAtt: setTitle,
          placeholder: 'Enter a title...'
        },
        {
          name: 'Description',
          variable: description,
          setAtt: setDescription,
          placeholder: 'Enter a description...'
        },
        {
          name: 'Image Url',
          variable: imageUrl,
          setAtt: setImageUrl,
          placeholder: 'Enter a url...'
        },
        {
          name: 'Director',
          variable: director,
          setAtt: setDirector,
          placeholder: "Enter director's name..."
        }
    ]

    return (
        <div>
            <table>
                <tbody>
                    {fields.map(field =>
                        <tr key={field.name}>
                            <td>{field.name}:</td>
                            <td>
                            <input
                                value={field.variable}
                                id={field.name}
                                placeholder={field.placeholder}
                                onChange={({ target }) => field.setAtt(target.value)}
                            />
                            </td>
                        </tr>
                    )}
                    <tr>
                            <td>Genres:</td>
                            <td>
                                <form onSubmit={(event) => addGenre(event)}>
                                    <input name="genre" placeholder="Add a genre..." />
                                    <button type="submit"> + </button>
                                    {`[${genres.join(', ')}]`}
                                </form>
                            </td>
                        </tr>
                </tbody>
            </table>
            <button onClick={() => create()}>Create</button>
            <MovieGetter setMovieData={setMoviesData}></MovieGetter>
        </div>
    );
};

export default MovieForm;