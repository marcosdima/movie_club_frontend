import { useDispatch } from "react-redux";
import { reset } from "../reducers/userReducer";

const Logout = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(reset());
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}

export default Logout;