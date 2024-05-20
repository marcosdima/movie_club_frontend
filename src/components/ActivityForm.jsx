import { useState } from "react";
import Selector from "./tools/Selector";
import activitiesService from "../services/activities";
import { removeByIds } from "../utils/functions";
import { useSelector } from "react-redux";

const ActivityForm = ({ values }) => {
    const [movieSelected, setMovie] = useState(null);
    const group = useSelector((state) => state.group);

    const setById = (target) => setMovie(values.find(({id}) => id === target));

    const createAnActity = async () => {
        if (!movieSelected) return null;
        const data = await activitiesService.create(movieSelected.id, group.id);
        console.log(data);
    }

    // Remove the movies that already were added as an activity...
    const moviesFiltered = removeByIds(values, group.history.map(({ movie }) => movie));

    return (
        <>
            <h1>Create an activity</h1>
            <Selector values={moviesFiltered} value={movieSelected} setter={setById}></Selector>
            <button onClick={() => createAnActity()}>+</button>
        </>
    )
}

export default ActivityForm;