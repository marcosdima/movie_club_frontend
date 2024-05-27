import { useEffect, useState } from "react";
import Selector from "./tools/Selector";
import { useSelector } from "react-redux";
import genericService from "../services/genericService";

const Invitation = () => {
    const [target, setTarget] = useState(null);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const group = useSelector((state) => state.group);

    const setById = (target) => setTarget(users.find(({id}) => id === target));
    const handleInvitation = async () => {
        // TODO: Add to invitationsReducer... when that exists.
        try {
            await genericService.create('invitations', { from: user.id, to: target.id, groupId: group.id});
        } catch(error) {
            console.log(error.response.data.error);
        }
        setTarget(null);
    };
    const idIsInGroup = (id) => {
        const ids = group.members.map(({id}) => id);
        return ids.includes(id)
    } 

    // Filter the users that are already members of the group...
    const usersFiltered = users.filter(({ id }) => !idIsInGroup(id));

    // If there are no user left to invite...
    if (usersFiltered.length === 0) return <></>

    // Formatted the values to be sended to Selector...
    const formattedValues = usersFiltered.map(({ username, id }) => ({ title: username, id }));
    
    // Handle if the message of invitation has to be visible...
    const show = {
        display: !target ? 'none' : ''
    };

    return (
        <>
            <h1>Invitation</h1>
            <h3>Select an user...</h3>
            <Selector value={target} values={formattedValues} setter={setById}/>
            <p style={show}>
                Do you want invite to {target?.username}?
                <button onClick={() => handleInvitation()}>✓</button>
                <button onClick={() => setTarget(null)}>x</button>
            </p>
        </>
    );
}

export default Invitation;