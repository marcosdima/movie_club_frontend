import Toggle from "./Toggle";
import Table from "./Table";

const Item = ({ title }) => {
    return (
        <>
            <div>{title}</div>
        </>
    )
}

const Selector = ({ values, value, setter, label="Click to display" }) => {
    const formattedValues = values
        .map(({ title, id }) => ({
            item: <Item title={title}></Item>, 
            id
        }))
        .filter(({id}) => id !== value?.id);

    const style = {
        display: 'flex',
        flexDirection: 'row'
    }

    return (
        <>
            <h5>{value?.title}</h5>
            <Toggle label={label} style={style}>
                <Table items={formattedValues} onClickItems={setter}></Table>
            </Toggle>
        </>
        
    )
};

export default Selector;