import { useDispatch } from "react-redux";
import { resetUser } from "../reducers/userReducer";
import { resetGroups } from "../reducers/groupsReducer";
import { resetGroup } from "../reducers/groupReducer";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(resetUser());
        dispatch(resetGroups());
        dispatch(resetGroup());
        navigate('/login');
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}

export default Logout;