import { useDispatch, useSelector } from "react-redux";
import { updateActivity } from "../reducers/groupReducer";
import { addActivity } from "../reducers/groupReducer";
import genericService from "../services/genericService";

const GroupActivity = ({ movieId }) => {
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group);
    const user = useSelector((state) => state.user);

    if (!group ) return <></>

    const activity = group.history.find((activity) => activity.movie === movieId);
    const alreadyWatched = activity?.watched.includes(user.id);

    const changeWatchedStatus = async (status) => {
        if (!activity) return;
        try {
            const activityWatched = await genericService.update(`activities/${activity.id}/${status ? 'unwatched' : 'watched'}`, { groupId: group.id });
            dispatch(updateActivity(activityWatched));
        } catch(error) {
            console.log(error.response.data.error);
        }
    }

    const addToGroup = async () => {
        try {
            const data = await genericService.create("activities", { movieId, groupId: group.id });
            dispatch(addActivity(data));
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                activity
                ? <button onClick={() => changeWatchedStatus(alreadyWatched) }>{alreadyWatched ? 'Unwatched' : 'Watched'}</button>
                : <button onClick={() => addToGroup()}>Add to group</button>
            }
        </>
    )
}

const Movie = ({ movie }) => {
    if (!movie) return (
        <div>
            Loading...
        </div>
    );
    
    const { title, imageUrl, description, director, genres, id } = movie;

    return (
        <div className="movie">
            <h1>{title}</h1>
            <p className="description">Description: {description}</p>
            <img className="poster" src={imageUrl} alt={`(Image of ${title})`}/>
            <p>Director: {director}</p>
            <p>
                Genres: {genres.join(', ')}
            </p>
            <GroupActivity movieId={id}/>
        </div>
    );
};

export default Movie;