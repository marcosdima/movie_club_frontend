import { useDispatch } from "react-redux";
import { createGroup } from "../reducers/groupReducer";
import useField from "../hooks/useField";

const GroupForm = () => {
    const { reset, ...groupName } = useField('');

    const dispatch = useDispatch();

    const create = () => {
        dispatch(createGroup(groupName.value));
    };

    return (
        <div>
            <h2>Create a new group</h2>
            <div>Name: <input {...groupName} /></div>
            <button onClick={() => create()}>Create</button>
        </div>
    );
};

export default GroupForm;