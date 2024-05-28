import { useDispatch, useSelector } from "react-redux";
import { updateActivity } from "../reducers/groupReducer";
import { addNewActivity } from "../reducers/groupReducer";
import genericService from "../services/genericService";

const GroupActivity = ({ movieId }) => {
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group);

    if (!group ) return <></>

    const activity = group.history.find((activity) => activity.movie === movieId);

    const markAsWatched = async () => {
        if (!activity) return;
        try {
            const activityWatched = await genericService.update(`activities/${activity.id}/watched`, { groupId: group.id });
            dispatch(updateActivity(activityWatched));
        } catch(error) {
            console.log(error.response.data.error);
        }
    }

    const addToGroup = async () => {
        try {
            const data = await genericService.create("activities", { movieId, groupId: group.id });
            dispatch(addNewActivity(data));
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                activity
                ? <button onClick={() => markAsWatched()}>Watched</button>
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
        <div>
            <h1>{title}</h1>
            <img src={imageUrl} alt={`(Image of ${title})`}/>
            <p>Director: {director}</p>
            <div>
                Genres: {genres.join(', ')}
            </div>
            <p>Description: {description}</p>
            <GroupActivity movieId={id}/>
        </div>
    );
};

export default Movie;