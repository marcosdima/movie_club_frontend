import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Invitation from "./Invitation";

const Group = () => {
    const navigate = useNavigate()
    const group = useSelector((state) => state.group);
    const movies = useSelector((state) => state.movies);
    const user = useSelector((state) => state.user)
    
    useEffect(() => {
        if (!group) return navigate('/groups');
    }, [group])
    
    if (!group) return <></>

    const members = () => group.members.map((member) => member.username).join(',');

    const filterMovies = (setWatched=false) => {
        const margin = {
            marginLeft: 10
        };

        const ids = group.history
            .filter(({ watched }) => setWatched ? watched.includes(user.id) : !watched.includes(user.id))
            .map(({ movie }) => movie);

        const groupMovies = movies
            .filter((movie) => ids.includes(movie.id))
            .map(({ title, id }) => <Link style={margin} key={id} to={`/movies/${id}`}>{title}</Link>);

        return groupMovies.length > 0
            ? groupMovies
            : 'Empty'
    }

    return (
        <div className="group">
            <h1>{group.name}</h1>
            <div>Members: {members()}</div>
            <div>Movies to watch: {filterMovies()}</div>
            <div>Movies watched: {filterMovies(true)}</div>
            <Invitation />
        </div>
    );
};

export default Group;