import { useNavigate } from "react-router-dom";
import { setGroup } from "../reducers/groupReducer";
import GroupForm from "./GroupForm";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Group = ({ name, members, movies, id, handleClick }) => {
    return (
        <div className="group" onClick={() => handleClick(id)}>
            <h1>{ name }</h1>
            <p className="info">
                <PersonIcon />{ members } <LocalMoviesIcon /> { movies }
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
        <>
            <div className="group-container">
                { formattedGroups.map(group => <Group key={ group.id } { ...group }/>) }
            </div>
            <GroupForm />
        </>
    );
};

export default GroupsDisplay;