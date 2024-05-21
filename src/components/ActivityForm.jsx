import { useState } from "react";
import Selector from "./tools/Selector";
import activitiesService from "../services/activities";
import { removeByIds } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { addNewActivty } from "../reducers/groupReducer";

const ActivityForm = () => {
    const [movieSelected, setMovie] = useState(null);
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group);
    const movies = useSelector((state) => state.movies);

    const setById = (target) => setMovie(movies.find(({id}) => id === target));

    const createAnActity = async () => {
        if (!movieSelected) return null;
        const data = await activitiesService.create(movieSelected.id, group.id);
        dispatch(addNewActivty(data));
        setMovie(null);
    }

    // Remove the movies that already were added as an activity...
    const moviesFiltered = removeByIds(movies, group.history.map(({ movie }) => movie));

    return (
        <>
            <h1>Create an activity</h1>
            <Selector values={moviesFiltered} value={movieSelected} setter={setById}></Selector>
            <button onClick={() => createAnActity()}>+</button>
        </>
    )
}

export default ActivityForm;