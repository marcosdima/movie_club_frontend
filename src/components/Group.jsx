import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        const ids = group.history.map((activity) => activity.movie);
        const groupMovies = movies
            .filter((movie) => ids.includes(movie.id))
            .map(({ title }) => title);
        const result = groupMovies.join(', ');
        return result || 'Empty'
    }

    return (
        <>
            <div>Name: {group.name}</div>
            <div>Members: {members()}</div>
            <div>Movies to watch: {titles()}</div>
        </>
    );
};

export default Group;