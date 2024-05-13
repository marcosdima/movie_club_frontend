import { useNavigate } from "react-router-dom";
import { setGroup } from "../reducers/groupReducer";
import { initialGroups } from "../reducers/groupsReducer";
import GroupForm from "./GroupForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Group = ({ name, members, movies, id, handleClick }) => {
    return (
        <div onClick={() => handleClick(id)}>
            <h1>{ name }</h1>
            <p>
                Members: { members } Movies: { movies }
            </p>
        </div>
    );
}

const GroupsDisplay = () => {
    const navigate = useNavigate();
    const groups = useSelector(state => state.groups);
    const dispatch = useDispatch();
    const handleClick = (id) => {
        dispatch(setGroup(groups.find((group) => group.id === id)));
        navigate('/group');
    }

    useEffect(() => {
        dispatch(initialGroups());
    }, [])

    const formattedGroups = groups.map(({ name, members, history, id }) => {
        return {
            name,
            members: members.length,
            movies: history.length,
            id,
            handleClick,
        }
    });

    return (
        <div>
            { formattedGroups.map(group => <Group key={ group.id } { ...group }/>) }
            <GroupForm />
        </div>
    );
};

export default GroupsDisplay;