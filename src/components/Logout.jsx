import { useDispatch } from "react-redux";
import { resetUser } from "../reducers/userReducer";
import { resetGroup } from "../reducers/groupReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(resetUser());
        dispatch(resetGroup());
        navigate('/login');
    }

    useEffect(() => {
        logout();
    }, [])
    
    return <></>;
}

export default Logout;