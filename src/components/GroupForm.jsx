import { useDispatch } from "react-redux";
import { createGroup } from "../reducers/groupReducer";
import useField from "../hooks/useField";
import Toggle from "./tools/Toggle";

const GroupForm = () => {
    const { reset, ...groupName } = useField('');

    const dispatch = useDispatch();

    const create = () => {
        dispatch(createGroup(groupName.value));
    };

    return (
        <Toggle label={'Create a group'}>
            <div className="group-from">
                <input {...groupName} />
                <button onClick={() => create()}>Create</button>
            </div>
        </Toggle>
    );
};

export default GroupForm;