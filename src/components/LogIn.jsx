import { useNavigate } from 'react-router-dom';
import useField from '../hooks/useField'
import { login } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    // If the user already logged in, then sends it to 'movies'.
    useEffect(() => {
        if (user) navigate('/movies');
    }, [user])

    const { reset: resetUsername, ...username } = useField('username');
    const { reset: resetPasword, ...password } = useField('password');

    const handleLogin = () => {
        dispatch(login(username.value, password.value));
        navigate('/movies');
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{username.name}: </td>
                        <td>
                            <input type="text" {...username}/>
                        </td>
                    </tr>
                    <tr>
                        <td>{password.name}: </td>
                        <td>
                            <input type="password" {...password}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleLogin}>Log In</button>
        </div>
        
    )
};

export default LogIn;