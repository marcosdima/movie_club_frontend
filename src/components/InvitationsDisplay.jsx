import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../reducers/groupsReducer";
import genericService from "../services/genericService";
import { useEffect, useState } from "react";

const InvitationDisplay = ({sender, groupName, id, handleInvitation}) => {
    return (
        <div>
            . Invitation from '{sender}' to '{groupName}'. Will you accept it?
            <button onClick={() => handleInvitation(id, true)}>✓</button>
            <button onClick={() => handleInvitation(id, false)}>x</button>
        </div>
    )
}

const InvitationsDisplay = () => {
    const [invitations, setInvitations] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const setInitialValues = async () => setInvitations(await genericService.getAll('invitations'));
        if (user) (setInitialValues());
    }, [user])

    const handleInvitation = async (target, isAccepted) => {
        try {
            const { group, accepted } = await genericService.update(`invitations/${target}`, { accepted: isAccepted });
            if (accepted) dispatch(addGroup(group));
            setInvitations(invitations.filter((inv) => inv.id !== target));
        } catch(error) {
            console.log(error.message)
        }
    };

    const formattedInvitations = invitations.map(
        ({ id, from, group }) => ({ 
            id, 
            sender: from.username, 
            groupName: group.name,
            handleInvitation
        })
    );

    return (
        <>
            {
                formattedInvitations.map(invitation =>
                    <div key={invitation.id}>
                        <InvitationDisplay {...invitation} />
                    </div>
                )
            }
        </>
    );
};

export default InvitationsDisplay;