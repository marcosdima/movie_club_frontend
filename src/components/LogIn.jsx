import useField from '../hooks/useField'
import { login } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const LogIn = () => {
    const dispatch = useDispatch();
    const { reset: resetUsername, ...username } = useField('username');
    const { reset: resetPasword, ...password } = useField('password');

    const handleLogin = () => {
        dispatch(login(username.value, password.value));
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