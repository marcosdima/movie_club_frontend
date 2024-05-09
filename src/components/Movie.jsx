const Movie = ({ movie }) => {
    if (!movie) return (
        <div>
            Loading...
        </div>
    );
    
    const { title, imageUrl, description, director, genres } = movie;

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

export default Movie;