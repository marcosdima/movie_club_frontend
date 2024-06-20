import { useNavigate } from "react-router-dom";
import { setGroup } from "../reducers/groupReducer";
import GroupForm from "./GroupForm";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useState } from "react";

const Group = ({ name, members, movies, id, handleClick }) => {
    const [mouseOn, setMouseOn] = useState(false);
    const showIfMouseOn = {
        display: mouseOn ? '' : 'none'
    };
    return (
        <div 
            className="group-display" 
            onMouseEnter={() => setMouseOn(true)} 
            onMouseLeave={() => setMouseOn(false)}
            >
            <div className="group-display-up">
                <h1 onClick={() => handleClick(id)} >{ name }</h1>
                <div style={showIfMouseOn} className='delete-group' onClick={() => console.log('deletete!')}><CloseIcon /></div>
            </div>
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