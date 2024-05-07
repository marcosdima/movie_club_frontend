import { useState } from "react";
import moviesService from '../services/movies';

const MovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [director, setDirector]= useState('')
    const [genres, setGenre] = useState([]);

    const create = async () => {
        await moviesService.add({ title, description, imageUrl, director, genres });
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
        </div>
    );
};

export default MovieForm;