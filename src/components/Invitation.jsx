import { useState } from "react";
import { useSelector } from "react-redux";
import genericService from "../services/genericService";
import SelectorSimple from "./tools/SelectorSimple"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Invitation = () => {
    const [target, setTarget] = useState(null);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const group = useSelector((state) => state.group);
    const groupMembersId = group.members.map(({id}) => id);

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

    // Filter the users that are already members of the group...
    const usersFiltered = users.filter(({ id }) => !groupMembersId.includes(id));

    // If there are no user left to invite...
    if (usersFiltered.length === 0) return <></>

    // Formatted the values to be sended to Selector...
    const formattedValues = usersFiltered.map(({ username, id }) => ({ key: username, id }));

    return (
        <>
            <div className="invitation">
                Do you want invite 
                <SelectorSimple
                    placeHolder={'name'}
                    values={formattedValues}
                    setter={setById}
                    /> ?
            </div> 
            <span style={{display: target ? '' : 'none'}}>
                <DoneIcon onClick={() => handleInvitation()} />
                <CloseIcon onClick={() => setTarget(null)} />
            </span>
        </>
    );
}

export default Invitation;