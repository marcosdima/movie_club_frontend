import { useState } from "react";
import { Link } from "react-router-dom";
import Selector from "./tools/Selector";
import genericService from "../services/genericService";
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
        const data = await genericService.create("activities", { movieId: movieSelected.id, groupId: group.id });
        dispatch(addNewActivty(data));
        setMovie(null);
    }

    // Remove the movies that already were added as an activity...
    const moviesFiltered = removeByIds(movies, group.history.map(({ movie }) => movie));

    if (moviesFiltered.length === 0) return (
        <div>
            Ups! There are no movies left to add... <Link to='/movies/add'>Go add some!</Link>
        </div>
    )

    return (
        <>
            <h1>Create an activity</h1>
            <Selector values={moviesFiltered} value={movieSelected} setter={setById}></Selector>
            <button onClick={() => createAnActity()}>+</button>
        </>
    )
}

export default ActivityForm;