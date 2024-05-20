import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ActivityForm from "./ActivityForm";

const Group = () => {
    const navigate = useNavigate()
    const group = useSelector((state) => state.group);
    const movies = useSelector((state) => state.movies)
    
    useEffect(() => {
        if (!group) return navigate('/groups');
    }, [group])
    
    if (!group) return <></>

    const members = () => group.members.map((member) => member.username).join(',');
    const titles = () => {
        const margin = {
            marginLeft: 10
        };
        const ids = group.history.map((activity) => activity.movie);
        const groupMovies = movies
            .filter((movie) => ids.includes(movie.id))
            .map(({ title, id }) => <Link style={margin} key={id} to={`/movies/${id}`}>{title}</Link>);
        return groupMovies.length > 0
            ? groupMovies
            : 'Empty'
    }

    return (
        <>
            <div>Name: {group.name}</div>
            <div>Members: {members()}</div>
            <div>Movies to watch: {titles()}</div>
            <ActivityForm values={movies} groupId={group.id}></ActivityForm>
        </>
    );
};

export default Group;