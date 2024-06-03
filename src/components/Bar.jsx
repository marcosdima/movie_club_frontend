import { useNavigate } from "react-router-dom";
import Button from "./tools/Button";
import { useSelector } from "react-redux";

const Bar = () => {
    const navigate = useNavigate();
    const group = useSelector((state) => state.group);
    const user = useSelector((state) => state.user);

    const setButton = (label, to, index) => {
        const pink = '#FFA27F'
        const red = '#FC4100'
        return <Button
                    key={index}
                    label={label}
                    color={pink}
                    mouseOnColor={red}
                    onClick={() => navigate(to)}
                />
    }
    const setBar = (arr) => (
        arr
            .filter(({ eraseIf }) => !eraseIf)
            .map(({ label, to }, index) => setButton(label, to, index))
    )

    const notLogged = !!!user;
    const noGroupSelected = !!!group;

    const left = [
        {
            label: 'Movies',
            to: '/movies',
            eraseIf: false,
        },
        {
            label: 'Login',
            to: '/login',
            eraseIf: !notLogged,
        },
        {
            label: 'Sign In',
            to: '/sign',
            eraseIf: !notLogged,
        },
        {
            label: 'Add Movie',
            to: '/movies/add',
            eraseIf: notLogged,
        },
        {
            label: 'Groups',
            to: '/groups',
            eraseIf: notLogged,
        },
    ]
    const right = [
        {
            label: group?.name,
            to: '/group',
            eraseIf: notLogged || noGroupSelected,
        },
        {
            label: user?.name,
            to: `/users/${user?.id}`,
            eraseIf: notLogged,
        },
        {
            label: 'Logout',
            to: '/logout',
            eraseIf: notLogged,
        },
    ]

    return (
        <div className='bar'>
            <div>{setBar(left)}</div>
            <div>{setBar(right)}</div>
        </div>
    )
}

export default Bar