import genericService from "../services/genericService";
import { login } from "../reducers/userReducer";
import { addUser } from "../reducers/usersReducer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useField from "../hooks/useField";
import { useDispatch } from "react-redux";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    // If the user already logged in, then sends it to 'movies'.
    useEffect(() => {
        if (user) navigate('/movies');
    }, [user])

    const { reset: resetName, ...name } = useField('name');
    const { reset: resetLastname, ...lastname } = useField('lastname');
    const { reset: resetUsername, ...username } = useField('username');
    const { reset: resetPasword, ...password } = useField('password');

    const handleSignIn = async () => {
        const newUser = {
            name: name.value,
            lastname: lastname.value,
            username: username.value,
            password: password.value
        }
        try {
            const user = await genericService.create('users', newUser);
            dispatch(addUser(user))
            dispatch(login(username.value, password.value));
            reset();
        } catch(error) {
            console.log(error);
        }

    }

    const reset = () => {
        resetName();
        resetLastname();
        resetUsername();
        resetPasword();
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{name.name}: </td>
                        <td>
                            <input type="text" {...name}/>
                        </td>
                    </tr>
                    <tr>
                        <td>{lastname.name}: </td>
                        <td>
                            <input type="text" {...lastname}/>
                        </td>
                    </tr>
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
            <button onClick={handleSignIn}>Sign In</button>
        </div>
        
    )
};

export default SignIn;