import { useSelector } from "react-redux"
import InvitationsDisplay from "./InvitationsDisplay";

const UserDisplay = ({ user }) => {
    const userLogged = useSelector((state) => state.user);
    const groups = useSelector((state) => state.groups);

    if (!user) return <div>User not found</div>

    const { username, lastname, name } = user;
    const groupsName = groups.map(({ name }) => name);

    return (
        <>
            <h1>{lastname}, {name} Page</h1>
            <h3>Username: {username}</h3>
            <h3>Groups: {groupsName.join(', ')}</h3>
            <InvitationsDisplay />
        </>
    )
}

export default UserDisplay;