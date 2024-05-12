import GroupForm from "./GroupForm";
import { useSelector } from "react-redux";

const Group = ({ name, members, movies }) => {
    return (
        <>
            <h1>{ name }</h1>
            <p>
                Members: { members } Movies: { movies }
            </p>
        </>
    );
}

const GroupsDisplay = () => {
    const groups = useSelector(state => state.groups);
    const formattedGroups = groups.map(({ name, members, history, id }) => {
        return {
            name,
            members: members.length,
            movies: history.length,
            id,
        }
    });

    return (
        <div>
            { formattedGroups.map(group => <Group key={ group.id } { ...group }/>) }
            <GroupForm />
        </div>
    );
};

export default GroupsDisplay;