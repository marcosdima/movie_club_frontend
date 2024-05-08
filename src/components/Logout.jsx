import { useDispatch } from "react-redux";
import { reset } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(reset());
        navigate('/login');
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}

export default Logout;