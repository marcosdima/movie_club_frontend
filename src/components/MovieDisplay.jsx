const MovieDisplay = ({ title, imageUrl, onClick }) => {
    return (
        <div className='movie-display' onClick={onClick}>
            <img src={imageUrl} alt={`(Image of ${title})`}/>
            <p>{title}</p>
        </div>
    );
};

export default MovieDisplay;